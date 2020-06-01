
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require("../config/config");

const User = require("../models/user-model");

const Student = require("../models/student-model");

const RandomKey = require("../models/random-key.model");

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
      lastMod: currentTime
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

    let randomStr = uuidv4(); // a random uuid v4, see https://www.npmjs.com/package/uuid
    randomStr += currentTime.getTime(); // append currentTime in msec to make it less likely to match anything else

    const student = new Student({
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

    // TODO check if student record (email, collegeId) already exists.
    // if so, need to decide what to do. perhaps ask user to verify email?

    student.save().then(
      studentResult => {
        const randomKey = new RandomKey({
          key: randomStr,
          tmpId: studentResult._id,
          creatorIP: req.ip,
          created: currentTime,
          status: 'pending'
        });
        randomKey.save().then(randomKeyResult => {

          console.log("randomKeyResult=", randomKeyResult);
          console.log("TODO: send an email here");

          res.status(201).json({
            message: "Student " + studentResult.name + " added. Pending email verification"
          });
        }).catch(err => {
          console.log("Student record created. However, email verification step failed. ");
          console.log(err);
          res.status(201).json({
            err: err,
            message: "Student record created. However, email verification step failed. "
          });
        }); // inner catch for randomKey.save
        
      }).catch(err => {
        console.log(err);
        res.status(200).json({
          err: err,
          message: "Student creation failed. "
        });
      }); // outer catch, for student.save

  }); // bcrypt hash

}

exports.verifyEmail = (req, res, next) => {

  const sanitizedKey = sanitize(req.body.key);
    
  try {
      
    RandomKey.findOne({ key: sanitizedKey }).then(randomKey => {
      Student.findByIdAndUpdate(
        
        // the id of the student to find
        mongoose.Types.ObjectId(randomKey.tmpId),
          
        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        // req.body,
        {
          status: 'active',
          emailVerificatonDate : new Date(),
          password: null  // delete the password from the student collection
        },
      
        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        // ask for the pre-update version so we have the value of password
        { new: false }, 
      
        // the callback function
        (err, result) => {
      
          // result is an instance of student

          // Handle any possible database errors
          if (err) {
            throw (err);
          } else {
              
            const user = createStudentUser(result); // an instance of User
            user.save().then(newUser => {
              console.log(newUser);
              //  user collection has a new user. student collection has also been updated. send success message
              res.status(201).json({
                  message: "Student " + result.name + " verified."
              });

            }).catch(err => {
              throw (err);
            });
        
          }; // else -- no error
        } // callback of findByIdAndUpdate

      ); // findByIdAndUpdate
            
    }) // RandomKey.findOne.then()

  
  } // try
  catch(err) {
    console.log(err);
    console.log("student verification failed for key=", req.body.key);

    res.status(500).json({
      err: err,
      message: "Student verification failed"
    });
          
  }; // catch
      
    
} // verifyRandomStrKey



// exports.verifyRandomStrKey = (req, res, next) => {

//   const sanitizedKey = sanitize(req.body.key);
  
//   try {
    
//     RandomKey.findOne({ key: sanitizedKey }).then(randomKey => {
//       Student.findOne({ _id: randomKey.tmpId }).then(student => {

//         const user = createStudentUser(student); // an instance of User
//         user.save() .then(res => {
//           console.log(res);

//           // patch student
//           student.findByIdAndUpdate(
//             // the id of the student to find
//             mongoose.Types.ObjectId(student._id),
        
//             // the change to be made. Mongoose will smartly combine your existing
//             // document with this change, which allows for partial updates too
//             // req.body,
//             {
//               state: state,
//               password: null  // delete the password from the student collection
//             },
        
//             // an option that asks mongoose to return the updated version
//             // of the document instead of the pre-updated one.
//             { new: true },
        
//             // the callback function
//             (err, result) => {
//               console.log(result);
        
//               // Handle any possible database errors
//               if (err) {
//                 throw (err);
//               } else {
                
//               }
              
//             }
        
//           ); // findByIdAndUpdate
//         }).catch(err => {
//           console.log(err);
//           throw (err);
//         });
//         // res.status(201).json({
//         //   message: "Student " + student.name + " verified.",
//         //   status: 0 // success
//         // });
//       }).catch(err => {
//         console.log(err);
//         throw (err);
//       }); // innner then/catch

//     }) // outer then
//       .catch(err => {
//         console.log(err);
        
//       }); // outer catch
    
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//       message: "Student verification failed. "
//     });
//   } // catch
  
// } // verifyRandomStrKey

createStudentUser = (student) => {

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
    lastMod: student.lastMod
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

exports.list = (req, res, next) => {
  console.log("in list");

  User.find().then(userList => {
    console.log(userList);
    if (!userList) {
      return res.status(401).json({
        message: "No users could be returned"
      });
    }
    const cleanUserList = userList.map(user => {
      // deleting the property should work, no? need to debug.
      // for now, we are recreating the rest of the fields (except _v0)
      // delete user.password;
      // return user;
      return {
        _id: user._id, email: user.email,
        name: user.name,
        role: user.role,
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
      message: "User List",
      users: cleanUserList

    });

  }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "List failed " + err
    });
  });

}
