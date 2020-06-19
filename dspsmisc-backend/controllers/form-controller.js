const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
const GreensheetForm = require('../models/greensheet-form-model');

const Signature = require('../models/signature-model');


// for complaint forms, user must be an admin.
const isAdminAuthorized = require('../middleware/check-auth-admin-boolean');




exports.postForm = (req, res, next) => {

  createForm(req).then(form => {

    form.save().then( createdForm => {
      // success

        if (debug.POST_FORM) {
          console.log("after save, createdForm=", createdForm);
        }

        res.status(201).json({
          message: 'Form ' + form.formName + ' added successfully',
          formId: createdForm._id
        });

        // for greensheets, students don't get email
        if (form.formName !== 'greensheet') {
          // to send email notification to student
          req['emailData'] = { studentEmail: createdForm.studentEmail };
          req['sendEmail'] = true; // change this to false if you dont' want to send email
        
          next(); // send email notification that a new form has been submitted
          
        }

      })
      .catch(err => {  // form.save().then
      console.log(err);
        res.status(500).json({
          message: 'Form save failed',
          err: err
        });
      });

  }).catch(err => { // createForm.then
    console.log(err);
      res.status(500).json({
        message: 'Form model creation failed',
        err: err
      });
  });;

}


// update the state field of a form
exports.patchForm = (req, res, next) => {

  // https://coursework.vschool.io/mongoose-crud/

  console.log(req.params.id);
  // https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path


  const formName = sanitize(req.params.formName);

  /*
  _id?: string;
  state?: string;
  */
  const id = sanitize(req.body._id);
  const state = sanitize(req.body.state);

  const form = getFormModel(formName);



  form.findByIdAndUpdate(
    // the id of the item to find
    mongoose.Types.ObjectId(id),

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    // req.body,
    { state: state },

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (err, result) => {
      console.log(result);

      // Handle any possible database errors
      // formId: string, message: string, err?: string
      if (err) return res.status(500).send({
        data: { _id: id },
        message: "form update error",
        err: err
      });
      return res.status(200).json({
        data: { _id: id, state: state },
        message: "form updated"
      });
    }

  );

}

// update the entire form
exports.patchFullForm = (req, res, next) => {

  // https://coursework.vschool.io/mongoose-crud/

  console.log(req.params.id);
  // https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path


  const formName = sanitize(req.params.formName);
  console.log("patchFullForm. req.body=");
  console.log(req.body);

  /*
  _id?: string;
  state?: string;
  */
  const id = sanitize(req.body._id);

  console.log("updating, _id=" + id);

  const form = getFormModel(formName);



  form.findByIdAndUpdate(
    // the id of the item to find
    mongoose.Types.ObjectId(id),

    // the change to be made. Mongoose will smartly combine your existing
    // document with this change, which allows for partial updates too
    // req.body,
    // { state: state },
    req.body,

    // an option that asks mongoose to return the updated version
    // of the document instead of the pre-updated one.
    { new: true },

    // the callback function
    (err, result) => {
      console.log(result);

      // Handle any possible database errors
      // formId: string, message: string, err?: string
      if (err) return res.status(500).send({
        data: { _id: id },
        message: "form data update error",
        err: err
      });
      return res.status(200).json({
        data: { _id: id },
        message: "form data updated"
      });
    }

  );

}



// "/api/form/list"  -- must have staff permission
exports.list = (req, res, next) => {
  console.log("in /api/form/list");
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray().then(collections => {
    console.log("collections: ", collections);
    /*
    collections:  [ { name: 'intakeforms',
    type: 'collection',
    options: {},
    info: { readOnly: false, uuid: [Object] },
    idIndex:
    { v: 2,
      key: [Object],
      name: '_id_',
      ns: 'simpledsps.intakeforms' } } ]
      */

    const filtered = collections.filter(col => {
      // only return form collections. remove users, logs, and anything else that is not a form-collection
      if (col.name === 'users' || col.name === 'logs' || col.name === 'useragreements') {
        return false;
      }
      else if (col.name === 'complaints') {
        return isAdminAuthorized(req, res);
      }
      else {
        return true;
      }
    }).map(collection => { return collection.name; });

    console.log("filtered=", filtered);
    res.status(200).json({
      message: "Collections List fetched successfully",
      collections: filtered
    });

  })
  .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Error. Collections list failed",
        err: err
      });
  });


}

// get "/api/form/:formName"  -- must have staff level perm
// for complaints, must have admin level perm
exports.getFormsForACategory = (req, res, next) => {

  const formName = sanitize(req.params.formName);
  console.log("fetching forms for ", formName);

  // for complaints forms, user must have admin permission
  if (formName === 'complaint' && !isAdminAuthorized(req, res)) {
    console.log("user does not have admin permission to access complaints")
    res.status(404).json({
      message: "Permission Denied",
      err: "You do not have permission to see this"
    });

    return;
  }

  const state = sanitize(req.query.state);
  const pageSize = +sanitize(req.query.pagesize);
  const currentPage = +sanitize(req.query.page);
  console.log("state=", state, ", pageSize=", pageSize, ", currentPage=", currentPage);

  const form = getFormModel(formName);

  let query, query2;
  if (!state || state == 'current') {
    query = form.find({
      $or:
        [{ state: { $exists: false } },
          { state: 'current' }
        ]
    }); // also include non existing

    query2 = form.find({
      $or:
        [{ state: { $exists: false } },
          { state: 'current' }
        ]
    }); // also include non existing
  } else {
    query = form.find({ state: state });
    query2 = form.find({ state: state });
  }
  let fetchedItems;

  if (pageSize && currentPage) {
    // page numbers start at 1
    query.skip(pageSize * (currentPage-1));
  }
  if (pageSize) {
    query.limit(pageSize);
  }

  // sort, most recent first. i.e., descending order for the field "created"
  query.sort({ created: -1 });

    // TODO fetch only some select fields from db

  // chain multiple queries. first the documents with given (offset, limit), then the count
  query.then(
    documents => {
      fetchedItems = documents;
      return query2.count(); // was form.count
    }
  ).then(
    count => {
      console.log("fetchedItems from db", fetchedItems);
      console.log("maxItems from db", count);
      res.status(200).json({
        message: "Forms fetched successfully!",
        listOfForms: fetchedItems,
        maxItems: count
      });

    }
  )
  .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Form fetch for a category failed",
        err: err
      });
  });
}

// get "/api/form/:formName/:_id"  -- with this pattern, need staff level perm
exports.getAForm = (req, res, next) => {

  const formName = sanitize(req.params.formName);

  // for complaints forms, user must have admin permission
  // if (formName === 'complaint' && !isAdminAuthorized(req, res)) {
  //   console.log("user does not have admin permission to access complaints")
  //   res.status(404).json({
  //     message: "Permission Denied",
  //     err: "You do not have permission to see this"
  //   });

  //   return;
  // }


  const form = getFormModel(formName);

  console.log("fetched data for _id=", req.params._id);

  form.findById(sanitize(req.params._id)).then(
    document => {
      if (!document) {
        // none found
        res.status(200).json({
          err: "Form not found"
        });
        return;
      } // ! document

      console.log("form from db", document);

      // if the form is signed, fetch the signatures
      if (document.studentSigStatus && document.studentSigStatus === 'signed') {
        Signature.find({ formId: document._id }).then(signatures => {

          // not sure why, but if we add signatures as a key to document, they aren't 
          // showing up on the client
          // document['signatures'] = signatures;
          res.status(200).json({
            message: "Form fetched successfully",
            formData: document,
            signatures: signatures
          });
        
          
        }) // signature.find then
      }  // if signed
      else {
        // not yet signed
        res.status(200).json({
          message: "Form fetched successfully",
          formData: document
        });
      }
      
    })  // form.findById then
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Fetching form data failed",
      err: err
    });
  });

}

// legacy

// // get "/api/form/agreement/:formName"  -- no permission required to get this
// exports.getFormAgreement = (req, res, next) => {

//   const formName = sanitize(req.params.formName);


//   const form = FormAgreement;

//   console.log("fetching agreement for =", formName);

//   form.findOne({ formName: formName }).sort({ field: 'asc', _id: -1 }).limit(1).then(
//       document => {
//         console.log("forms from db", document);
//         res.status(200).json({
//           message: "Form fetched successfully",
//           formData: document
//         });
//       }
//   )
//   .catch((err) => {
//     console.log(err);
//     res.status(404).json({
//       message: "Fetching form agreement failed",
//       err: err
//     });
//   });

// }

// delete "/api/form/:formName/:id"  -- with this pattern, need staff level perm
exports.deleteAForm = (req, res, next) => {
  console.log(req.params.id);
  // https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path


  const formName = sanitize(req.params.formName);

  // for complaints forms, user must have admin permission
  if (formName === 'complaint' && !isAdminAuthorized(req, res)) {
    console.log("user does not have admin permission to delete complaints")
    res.status(404).json({
      message: "Permission Denied",
      err: "You do not have permission to delete this"
    });

    return;
  }

  const id = sanitize(req.params._id);

  const form = getFormModel(formName);

  form.deleteOne({
      _id: mongoose.Types.ObjectId(id)
    }).then(
      result => {
        console.log(result);
        res.status(200).json({
          message: "form deleted"
        });
    })
    .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Form delete failed",
      err: err
    });
  });

}

// return the mongoose model correspoding to formName
getFormModel = formName => {
  let form;
  if (formName == 'bluesheet') {
    form = BluesheetForm;
  } else if (formName === 'aap1') {
    form = Aap1Form;
  } else if (formName === 'aap2') {
    form = Aap2Form;
  } else if (formName === 'greensheet') {
    form = GreensheetForm;
  }
  // else if (formName === 'applicationForServices') {
  //   form = ApplicationForServices;
  // } else if (formName === 'emergencyEvacInfo') {
  //   form = EmergencyEvacInfo;
  // } else if (formName === 'feedback') {
  //   form = Feedback;
  // } else if (formName === 'complaint') {
  //   form = Complaint;
  // } else if (formName === 'historyOfDisability') {
  //   form = HistoryOfDisabilty;
  // }

  return form;
}

createForm = (req) => {

  const formName = sanitize(req.params.formName);

  const formModel = mongoose.model(formName);

  const currentTime = new Date();

  // create returns a Promise
  const modelInstancePromise = formModel.create({
    formName: formName,
    user: sanitize(req.body.user),
    formWithLatestHistory: sanitize(req.body.formWithLatestHistory),
    formHistoryArr: sanitize(req.body.formHistoryArr),
    versionDetails: sanitize(req.body.versionDetails),
    currentVersion: sanitize(req.body.currentVersion),
    edited: false,
    created: currentTime,
    lastMod: currentTime,
    state: sanitize(req.body.state || 'current')
  });

  return modelInstancePromise;
}

createFormOld = (req) => {

  // the parameter isAgreement is optional

  // const captchaFree = removeCaptcha(req.body);

  let form;
  const currentTime = new Date();

  const formName = sanitize(req.params.formName);

  // legacy
  // const captchaScore = req.body.captchaScore;

  // if (isAgreement) {
  //   form = new FormAgreement({
  //     formName: formName,
  //     user: sanitize(req.body.user),
  //     form: sanitize(captchaFree.form), // "tmp form string",
  //     edited: false,
  //     created: currentTime,
  //     lastMod: currentTime,
  //     captchaScore: captchaScore
  //   });

  //   return form;

  // }

  // else. not user agreement


  if (formName === 'bluesheet') {
    form = new BluesheetForm({
      formName: formName,
      user: sanitize(req.body.user),
      formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
      formHistoryArr: sanitize(req.body.formHistoryArr), 
      versionDetails: sanitize(req.body.versionDetails), 
      currentVersion: sanitize(req.body.currentVersion),
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      state: sanitize(req.body.state || 'current'),
      // captchaScore: captchaScore
    });
  } else if (req.params.formName === 'aap1') {
    form = new Aap1Form({
      formName: formName,
      user: sanitize(req.body.user),
      formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
      formHistoryArr: sanitize(req.body.formHistoryArr), 
      versionDetails: sanitize(req.body.versionDetails), 
      currentVersion: sanitize(req.body.currentVersion),
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      state: sanitize(req.body.state || 'current' ),
      // captchaScore: captchaScore
    });
  }  else if (req.params.formName === 'aap2') {
    form = new Aap2Form({
      formName: formName,
      user: sanitize(req.body.user),
      formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
      formHistoryArr: sanitize(req.body.formHistoryArr), 
      versionDetails: sanitize(req.body.versionDetails), 
      currentVersion: sanitize(req.body.currentVersion),
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      state: sanitize(req.body.state || 'current'),
      // captchaScore: captchaScore
    });
  } else if (req.params.formName === 'greensheet') {
    form = new GreensheetForm({
      formName: formName,
      user: sanitize(req.body.user),
      formWithLatestHistory: sanitize(req.body.formWithLatestHistory), 
      formHistoryArr: sanitize(req.body.formHistoryArr), 
      versionDetails: sanitize(req.body.versionDetails), 
      currentVersion: sanitize(req.body.currentVersion),
      edited: false,
      created: currentTime,
      lastMod: currentTime,
      state: sanitize(req.body.state || 'current'),
      // captchaScore: captchaScore
    });
  }

  // console.log("req.params=", req.params);
  // console.log("req.body=", req.body);

  //  console.log("req.body.form=", req.body.form);

  if (debug.CREATE_FORM) {
    console.log("createForm: before save", form);
  }


  return form;

}

// legacy
// removeCaptcha = form => {
//   // remove the reCaptchaV3Token field. also sanitize

//   if (debug.CREATE_FORM) {
//     console.log("removeCaptcha: form with captcha", form);
//   }

//   const form2Save = form;
//   delete form2Save.reCaptchaV3Token;

//   if (debug.CREATE_FORM) {
//     console.log("removeCaptcha: form2Save with captcha removed", form2Save);
//   }

//   return form2Save;
// }

