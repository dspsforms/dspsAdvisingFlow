
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require("../config/config");

const User = require("../models/user-model");

const Student = require("../models/student-model");
const StudentTmp = require("../models/student-tmp-model");

const RandomKey = require("../models/random-key.model");

const RandomKeyPurpose = require("../constants/random-key-purpose");

const { v4: uuidv4 } = require('uuid');



/*
preventing nosql injections:

strategies:
https://stackoverflow.com/questions/13436467/javascript-nosql-injection-prevention-in-mongodb#

in general, mongoose will most likely work. but we are also adding
mongo-sanitize.

mongo-sanitize will strip out strings that start with $
see : https://github.com/vkarpov15/mongo-sanitize
*/

const sanitize = require('mongo-sanitize');

exports.addStaff = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const sanitizedEmail = sanitize(req.body.email);
    const sanitizedName = sanitize(req.body.name);
    const role = req.body.role;

    // for faster fetch
    const isStudent = role && role.isStudent;
    const isInstructor = role && role.isInstructor;
    const isAdmin = role && role.isAdmin;
    const isStaff = role && role.isStaff;
    const isFaculty = role && role.isFaculty;

    const currentTime = new Date();
     // no query will be run on the password field, so no need to sanitize password before hashing
    const user = new User({
      email: sanitizedEmail,
      name: sanitizedName,
      password: hash,
      role: role,
      isStudent: isStudent,
      isAdmin: isAdmin,
      isStaff: isStaff,
      isFaculty: isFaculty,
      isInstructor: isInstructor,
      isStudent: isStudent,
      created: currentTime,
      lastMod: currentTime,
      metaHistoryArr: [ 
        { ip: req.ip, date: currentTime, type: 'newUser' }
      ]
    });
    console.log("user to be added=", user);

    /*
    res.status(200).json({
      message: "User to be added",
      result: user
    });
    */


    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User " + result.name + " added"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(201).json({
          err: err,
          message: "User creation failed. "
        });
      });

  });
}

exports.addStudentStep1 = (req, res, next) => {


  // TODO check if student record (email, collegeId) already exists.
  // if so, need to decide what to do. perhaps ask user to verify email?

  try {

  
    bcrypt.hash(req.body.password, 10).then(hash => {

    
      const sanitizedEmail = sanitize(req.body.email);
      const sanitizedName = sanitize(req.body.name);
      const sanitizedCollegeId = sanitize(req.body.collegeId);
      const sanitizedCellPhone = req.body.cellPhone ? sanitize(req.body.cellPhone) : null;

      /*
      public email: string,
      public password: string,
      public name?: string,
      public collegeId?: string,
      public cellPhone?: string,
      */
      const currentTime = new Date();
      let expiresAt = null;
      // RANDOM_KEY_TIME_LIMIT is in minutes
      if (config.RANDOM_KEY_TIME_LIMIT && config.RANDOM_KEY_TIME_LIMIT > 0) {
        expiresAt = new Date(currentTime.getTime() + config.RANDOM_KEY_TIME_LIMIT * 60000);

        // kludge. the next middleware which will send email to user needs this value. 
        req["RANDOM_KEY_TIME_LIMIT"] = config.RANDOM_KEY_TIME_LIMIT;
      }

      let randomStr = uuidv4(); // a random uuid v4, see https://www.npmjs.com/package/uuid
      randomStr += currentTime.getTime(); // append currentTime in msec to make it less likely to match anything else

      // to be used in the next step of the pipeline, in email-verify-email.js
      req['emailData'] = { randomStr: randomStr, recipientEmail: sanitizedEmail };
      req['sendEmail'] = true; // change this to false if there is an error below

      const randomKey = new RandomKey({
        key: randomStr,
        email: sanitizedEmail,
        // tmpId: studentResult._id,
        creatorIP: req.ip,
        created: currentTime,
        expiresAt: expiresAt,
        status: 'pending',
        purpose: RandomKeyPurpose.NEW_USER_SIGN_UP
      });

      randomKey.save().then(randomKeyResult => {
        console.log("randomKeyResult=", randomKeyResult);

        const studentTmp = new StudentTmp({
          key: randomKeyResult.key,
          email: sanitizedEmail,
          name: sanitizedName,
          password: hash,
          collegeId: sanitizedCollegeId,
          cellPhone: sanitizedCellPhone,
          creatorIP: req.ip, // this is part of express, see https://expressjs.com/en/api.html#req.ip
          created: currentTime,
          lastMod: currentTime,
          status: 'pending'
        });

        studentTmp.save().then(
          studentTmpResult => {

            console.log("studentTmpResult", studentTmpResult);
          
            let message = "Thank you for signing up.";
            if (config.RANDOM_KEY_TIME_LIMIT) {
              message += "Please verify your email within " + config.RANDOM_KEY_TIME_LIMIT + " minutes";
            }
            res.status(201).json({
              message: message,
              expirationTime: config.RANDOM_KEY_TIME_LIMIT
            });
            
            next(); // send email.

          }); // studentTmp.save

      }); // randomKey.save

    }); // bcrypt

  } catch (err) {
    console.log(err);

    res.status(201).json({
      err: err,
      message: "There was an error. "
    });
  }

  //   .catch(err => {
  //         console.log("Student record created. However, email verification step failed. ");
  //         console.log(err);
  //         req['sendEmail'] = false; // do not send email
  //         res.status(201).json({
  //           err: err,
  //           message: "Student record created. However, email verification step failed. "
  //         });
  //       }); // inner catch for randomKey.save
        
  //     }).catch(err => {
  //       console.log(err);
  //       req['sendEmail'] = false; // do not send email

  //       res.status(200).json({
  //         err: err,
  //         message: "Student creation failed. "
  //       });
  //     }); // outer catch, for student.save

  // }); // bcrypt hash

} // addStudentStep1

exports.verifyEmail = (req, res, next) => {

  const sanitizedKey = sanitize(req.body.key);
    
  try {
      
    RandomKey.findOne({ key: sanitizedKey }).then(randomKey => {

      // and randomStr to req for next middleware
      req['randomStr'] = randomKey.key;

      // check if randomKey status is pending, purpose is newUser
      // and has not expired
      const check = checkRandomKey(randomKey, RandomKeyPurpose.NEW_USER_SIGN_UP);

      if (check && check.err) {

        // mark this link as expired
        req['randomStrStatus'] = 'expired';

        res.status(201).json({
          err: check.err
        });

        next(); // call randomKeyUpdateStatus

        return;
      }

      const currentTime = new Date();

      StudentTmp.findOne({ key: randomKey.key, email: randomKey.email }).then(studentTmp => {
        
        // create Student
        const student = new Student({
          email: studentTmp.email,
          name: studentTmp.name,
          password: studentTmp.password,
          collegeId: studentTmp.collegeId,
          cellPhone: studentTmp.cellPhone,
          creatorIP: studentTmp.creatorIP,
          created: studentTmp.created,
          lastMod: currentTime,
          status: 'active',
          emailVerificatonDate: currentTime,
          emailVerificatonIP: req.ip, // this is part of express, see https://expressjs.com/en/api.html#req.ip
          // cellPhoneVerificationDate: { type: Date },
        });

        student.save().then(newStudent => {

          // new create a user from student
          const user = createStudentUser(student, req); // an instance of User

          user.save().then(newUser => {
            console.log("newUser", newUser);

            //  user collection has a new user. student collection has also been updated. send success message
            res.status(201).json({
              message: "Student " + newUser.name + " verified."
            });

            next(); // call randomKeyUpdateStatus

          }); // user.save()

        }); // student.save()
      }); // StudentTmp.findOne()
      
             
            
    }); // RandomKey.findOne.then()

  
  } // try
  catch(err) {
    console.log(err);
    console.log("student verification failed for key=", req.body.key);

    res.status(200).json({
      err: err,
      message: "Student verification failed"
    });
          
  }; // catch
      
    
} // verifyEmail

// retrieveUserFromRandomKey
exports.retrieveUserFromRandomKey = (req, res, next) => {

  const sanitizedKey = sanitize(req.body.key);
    
  try {
      
    RandomKey.findOne({ key: sanitizedKey }).then(randomKey => {

      //  check randomKey.status is not pending, purpose is forgotPassword,
      // and key has expired. if so, do not process this
  
      // and randomStr to req for next middleware
      req['randomStr'] = sanitizedKey;

      const check = checkRandomKey(randomKey, RandomKeyPurpose.FORGOT_PASSWORD);

      if (check && check.err) {

        // mark this link as expired
        req['randomStrStatus'] = 'expired';

        res.status(201).json({
          err: check.err
        });

        
        next(); // mark link expired

        return;
      }

      User.findOne({ email: randomKey.email }).then(user => {
        console.log("randomKey=", randomKey, "user=", user);
      
        req['randomStrStatus'] = 'used';
        res.status(201).json({
          user: user,
          emailFromRandomKey: randomKey.email
        });

        next();
      })
    }).catch(err => {
        throw (err);
    });
  
  } // try
  catch(err) {
    console.log(err);
    console.log("retrieveUserFromRandomKey failed for key=", req.body.key);

    res.status(500).json({
      err: err,
      message: "Password Reset based on key failed"
    });
          
  }; // catch
      
    
} // retrieveUserFromRandomKey

// send an email to user with a randomStr link
exports.resetPasswordStep1 = (req, res, next) => {

  /*
  save randomStr, email, ip, created, status
  */
  
  const sanitizedEmail = sanitize(req.body.email);

  // email must have a corresponding valid user
  User.findOne({ email: sanitizedEmail }).then(user => {
    if (!user) {
      // no user found
      res.status(201).json({
        message: "No user account found for " + sanitizedEmail,
        err: "No user account found for " + sanitizedEmail
      });
      return;
    }
    // else

  
    const currentTime = new Date();

    let expiresAt = null;
    // RANDOM_KEY_TIME_LIMIT is in minutes
    if (config.RANDOM_KEY_TIME_LIMIT && config.RANDOM_KEY_TIME_LIMIT > 0) {
      expiresAt = new Date(currentTime.getTime() + config.RANDOM_KEY_TIME_LIMIT * 60000); 

      // kludge. the next middleware which will send email to user needs this value. 
      req["RANDOM_KEY_TIME_LIMIT"] = config.RANDOM_KEY_TIME_LIMIT;
    }
  
    let randomStr = uuidv4(); // a random uuid v4, see https://www.npmjs.com/package/uuid
    randomStr += currentTime.getTime(); // append currentTime in msec to make it less likely to match anything else

    // to be used in the next step of the pipeline, in email-reset-password-email.js
    req['emailData'] = { randomStr: randomStr, recipientEmail: sanitizedEmail };
    req['sendEmail'] = true; // change this to false if there is an error below

    
    const randomKey = new RandomKey({
      key: randomStr,
      email: sanitizedEmail,
      creatorIP: req.ip,
      created: currentTime,
      expiresAt: expiresAt,
      status: 'pending',
      purpose: RandomKeyPurpose.FORGOT_PASSWORD
    });

    randomKey.save().then(randomKeyResult => {

      console.log("randomKeyResult=", randomKeyResult);

      res.status(201).json({
        message: "An email has been sent to " + sanitizedEmail + ". Please check your email."
      });
      next(); // send email.
    }).catch(err => {
      console.log("Random key saving to db failed. ");
      console.log(err);
      req['sendEmail'] = false; // do not send email
      res.status(201).json({
        err: err,
        message: "Random key saving to db failed. "
      });
    }); // catch  randomKey.save
    
  }); // User.findOne 

}

createStudentUser = (student, req) => {

  const user = new User({
    email: student.email,
    name: student.name,
    password: student.password, 
    role: {
      isStudent: true,
      isAdmin: false,
      isStaff: false,
      isFaculty: false,
      isInstructor: false
    },
    isStudent: true,
    isAdmin: false,
    isStaff: false,
    isFaculty: false,
    isInstructor: false,
    created: student.created, 
    lastMod: student.lastMod,
    metaHistoryArr: [ 
      { ip: req.ip, date: student.lastMod, type: 'newUser' }
    ]
  }); 
  return user; // don't save user yet. we need to do it in the main loop

}

// patchStudent = (student, state, promises) => {

//   // TODO study this; https://github.com/kriskowal/q
//   // let itemDefer = Q.defer();

//   student.findByIdAndUpdate(
//     // the id of the item to find
//     mongoose.Types.ObjectId(id),

//     // the change to be made. Mongoose will smartly combine your existing
//     // document with this change, which allows for partial updates too
//     // req.body,
//     {
//       state: state,
//       password: null  // delete the password from the student collection
//     },

//     // an option that asks mongoose to return the updated version
//     // of the document instead of the pre-updated one.
//     { new: true },

//     // the callback function
//     (err, result) => {
//       console.log(result);

//       // Handle any possible database errors
//       // formId: string, message: string, err?: string
//       if (err) {
//         throw (err);
//         // itemDefer.reject(err);
//         // return err;
//       } else {
//         // no op
//         // itemDefer.resolve(result);
//       }
//       // promises.push(itemDefer);
      
//     }

//   ); // findByIdAndUpdate

// }  // patchStudent

exports.login = (req, res, next) => {
  console.log("in login");
  let fetchedUser;
  const sanitizedEmail = sanitize(req.body.email);
  console.log("orig: ", req.body.email, "sanitized: ", sanitizedEmail);
  User.findOne({ email: sanitizedEmail })
    .then(user => {
      if (!user) {
        console.log("no matching user for email " + sanitizedEmail);
        return res.status(401).json({
          message: "Auth failed. Please check the email address you submitted"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      // if the previous then failed, we have already sent client an error message
      if (!fetchedUser) {
        return null;
      }
      if (!result) {
        console.log("password match failed for email " + sanitizedEmail);
        return res.status(401).json({
          message: "Auth failed. Please check your password."
        });
      }

      console.log("new login from " + sanitizedEmail);
      // fetchedUser's email was sanitized before it was entered into db
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          role: fetchedUser.role,
          isAdmin: fetchedUser.isAdmin,
          isStaff: fetchedUser.isStaff,
          isFaculty: fetchedUser.isFaculty,
          isInstructor: fetchedUser.isInstructor,
          isStudent: fetchedUser.isStudent
        },
        config.JSON_WEB_TOKEN_SERVER_KEY,
        { expiresIn: "1d" }
        // { expiresIn: "1h" }
        // { expiresIn: "1m" }
      );
      // we are sending back the isAdmin/isStaff etc info, but if client uses these,
      // they will be re verified at the server. i.e., the info is for efficient client side
      // UI, but will be double checked.
      res.status(200).json({
        token: token,
        expiresIn: 3600 * 24,
        userId: fetchedUser._id,
        role: fetchedUser.role,
        isAdmin: fetchedUser.isAdmin,
        isStaff: fetchedUser.isStaff,
        isFaculty: fetchedUser.isFaculty,
        isInstructor: fetchedUser.isInstructor,
        isStudent: fetchedUser.isStudent
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed " + err
      });
    });
}


exports.checkAndUpdatePassword = (req, res, next) => {
  console.log("in checkAndUpdatePassword");
  let fetchedUser;

  /*
  from extract-userId.js
  req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
  */
  const sanitizedUserId = sanitize(req.userData.userId);
  console.log("orig: ", req.userData.userId, "sanitized: ", sanitizedUserId);
  User.findOne({ _id: sanitizedUserId })
    .then(user => {
      if (!user) {
        console.log("no matching user for _id " + sanitizedUserId);
        return res.status(401).json({
          message: "Auth failed. Please login again and try. ",
          err: 'no user found. user may not be logged on, or login may have expired'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.oldPassword, user.password);
    }, err => {
        console.log(err);
    })
    .then(result => {

      // if the previous then failed, we have already sent client an error message
      if (!fetchedUser) {
        return null;
      }
      if (!result) {
        console.log("password match failed for user._id = ", sanitizedUserId);
        return res.status(200).json({
          message: "Auth failed.",
          err: 'The existing password you supplied did not match the one in the system.'
        });
      }

      console.log("changing password for " + sanitizedUserId);
      
      bcrypt.hash(req.body.newPassword, 10).then(hash => {
        //   User.update(
        //     { _id: sanitizedUserId },
        //     {
        //       $set: {
        //         password: hash,
        //         lastMod: new Date()
        //       }
        //     }
        //   ).then(status => {

        //   })
        // }
        
        User.findByIdAndUpdate(
        
          // the id of the user to find
          mongoose.Types.ObjectId(sanitizedUserId),
          
          // the change to be made. Mongoose will smartly combine your existing
          // document with this change, which allows for partial updates too
          // req.body,
          {
            password: hash,
            lastMod: new Date()
          },
      
          // an option that asks mongoose to return the updated version
          // of the document instead of the pre-updated one.
          { new: true },
      
          // the callback function
          (err, result) => {
      
            // result is an instance of User

            // Handle any possible database errors
            if (err) {
              throw (err);
            } else {
              console.log(result);
              res.status(201).json({
                message: "Password updated for " + result.name
              });
            }; // else -- no error
          } // callback of findByIdAndUpdate

        ); // findByIdAndUpdate
      
      
      }) // bcrypt then
        .catch(err => {
          console.log(err);
          return res.status(401).json({
            message: "Auth failed " + err
          });
        });
      
    }); // User.findOne.then()
  
}  // checkAndUpdatePassword

exports.updatePasswordBasedOnEmail = (req, res, next) => {
  console.log("in updatePasswordBasedOnEmail");

  const sanitizedEmail = sanitize(req.body.email);
  const key = req.body.key;
  // TODO verify that key/email pair exists, and in correct state: 'pulled' and NOT 'used'

  RandomKey.findOne({ key: key, email: sanitizedEmail }).then(keyObj => {
    // TODO check keyObj.status also
    if (!keyObj) {
      // no key/email pair in randomkeys collection
      res.status(200).json({
        message: "Invalid key or email",
        err: "Invalid key or email"
      });
      return;
    }
    // else

    bcrypt.hash(req.body.password, 10).then(hash => {

      // find the user, and rest the password.
      // TODO: also update ip address of every password change
      const filter = { email: sanitizedEmail };
      const update = {
        "$set" : {
          password: hash,
          lastMod: new Date()
        },
        "$push" : {
          metaHistoryArr: { ip: req.ip, date: new Date(), type: 'password' }
        }
        
      };
      
      User.findOneAndUpdate(filter, update).then(user => {
        console.log(user);
        res.status(201).json({
          message: "Password reset for " + user.name
        });
      })
  
    }) // bcrypt then
  }) // keyObj
    .catch(err => {
          console.log(err);
          return res.status(500).json({
            message: "Auth operation failed " + err,
            err: err
          });
    }); // catch 
  
}  // updatePasswordBasedOnEmail

exports.listDspsUsers = (req, res, next) => {
  console.log("in list");

  const filter = { isDsps: true };
  User.find(filter).then(dspsUsrList => {
    console.log(dspsUsrList);
    if (!dspsUsrList) {
      return res.status(401).json({
        message: "No users could be returned"
      });
    }
    const cleanUserList = dspsUsrList.map(user => {
      // deleting the property should work, no? need to debug.
      // for now, we are recreating the rest of the fields (except _v0)
      // delete user.password;
      // return user;
      return {
        _id: user._id, email: user.email,
        name: user.name,
        role: user.role,
        isDsps: user.isDsps,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        isFaculty: user.isFaculty,
        isInstructor: user.isInstructor,
        isStudent: user.isStudent,
        created: user.created || null,
        lastMod: user.lastMod || null
      };
    });
    console.log("cleanUserList", cleanUserList);
    return res.status(200).json({
      message: "DSPS User List",
      dspsUsers: cleanUserList

    });

  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "List failed " + err
    });
  });

}

exports.listDspsUsersSmall = (req, res, next) => {
  console.log("in list");

  const filter = { isDsps: true };
  User.find(filter).then(dspsUsrList => {
    console.log(dspsUsrList);
    if (!dspsUsrList) {
      return res.status(401).json({
        message: "No users could be returned"
      });
    }
    const cleanUserList = dspsUsrList.map(user => {
      // remove sensitive info such as email, password, etc
      return {
        _id: user._id, 
        name: user.name,
        role: user.role,
        isDsps: user.isDsps,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        isFaculty: user.isFaculty,
        isInstructor: user.isInstructor,
        isStudent: user.isStudent
      };
    });
    console.log("cleanUserList", cleanUserList);
    return res.status(200).json({
      message: "DSPS User List Small",
      dspsUsers: cleanUserList

    });

  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "List failed " + err
    });
  });

}

// check randomKey.status is not pending, purpose is what the param says it is,
// and key has not expired. 
checkRandomKey = (randomKey, purpose) => {

  if (!randomKey) return {err: 'This link is invalid'};

  if (randomKey.expiresAt && randomKey.expiresAt.getTime() <
    (new Date()).getTime()) {
    // expired
    return {err: 'This link has expired'};
  }

  if (purpose && purpose !== randomKey.purpose) {
    return {err: 'The stated purpose of the link is inconsistent with its use'};
  }

  if (randomKey.status !== 'pending') {
    let foo = '';
    if (randomKey.status === 'used') foo = ' has been ';
    else foo = ' has ';  // expired

    return {err: 'This link ' + foo +  randomKey.status};
  }

  return null; // { message: 'success' };

}
