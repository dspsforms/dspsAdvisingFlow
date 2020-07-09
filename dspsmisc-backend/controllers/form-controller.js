const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
const Aap2childForm = require('../models/aap2child-form-model');
const GreensheetForm = require('../models/greensheet-form-model');

const Signature = require('../models/signature-model');


// for complaint forms, user must be an admin.
const isAdminAuthorized = require('../middleware/check-auth-admin-boolean');

const CommonFormController = require('./common-form-controller');

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

      CommonFormController.getFormDetails(document, req, res); // will handle response

      // the stuff below is handled now in  CommonFormController.getFormDetails(...)

      // console.log("form from db", document);

      // var hasSig, isParent = false;
      // var signatures = null;
      // var children = null;
      
      // // fetch signature of parent doc here. 
      // // client fetches sigs of child docs in a separate call

      // // create an array of Promises, and execute Promise.all
      // const actions = [];
      // if (document.studentSigStatus && document.studentSigStatus === 'signed') {
      //   actions.push(Signature.find({ formId: document._id }).exec() );
      //   hasSig = true;
      // }

      // if (document.isParent) {
      //   const testId = document._id.toString();
      //   console.log(testId);
      //   const formModel = mongoose.model(document.childFormName); 
      //   const filter = { parentId: document._id.toString() } 
      //   actions.push( formModel.find(filter).sort({ lastMod: -1 }).exec() ); 
      //   isParent = true;
      // }

      // if (actions.length > 0) {
      //   var results = Promise.all(actions);
      //   results.then(data => {
      //     console.log(data);
      //     if (hasSig && isParent) {
      //       // 1,1
      //       signatures = data[0];
      //       children = data[1];
      //     } else if (!hasSig && !isParent) {
      //       // 0,0 no-op
      //     } else if (hasSig) {
      //       // 1,0
      //       signatures = data[0];
      //     } else {
      //       // 0,1 
      //       children = data[0];

      //     }

      //     res.status(200).json({
      //       message: "Form fetched successfully",
      //       formData: document,
      //       signatures: signatures,
      //       children: children
      //     });
      //   }).catch( (err) => {
      //     console.log(err);
      //   });

        
      // } // actions.length > 0

      // else {
      //   res.status(200).json({
      //     message: "Form fetched successfully",
      //     formData: document
      //   });
      // }
      
    })  // form.findById then
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Fetching form data failed",
      err: err
    });
  });

}


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
  } else if (formName === 'aap2child') {
    form = Aap2childForm;
  }


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
    state: sanitize(req.body.state || 'current'),
    isParent: req.body.isParent || null,
    parentId: sanitize(req.body.parentId) || null,
    childFormName: sanitize(req.body.childFormName) || null
  });

  return modelInstancePromise;
}


exports.signatures = (req, res, next) => {
    

  const idArr = req.body.idArr;
    // console.log("idArrStr=", idArrStr);

    // const idArr = JSON.parse(idArrStr);
    console.log("idArr", idArr);

  const filter = {
    'formId': { $in: idArr }
  };

  Signature.find(filter).then(sigs => {

    res.status(200).json({
      message: "Signatures fetched successfully",
      signatures: sigs,
    });
    return;

  }).catch((err) => {
    
    res.status(200).json({
      message: "Signature fetch failed",
      err: err,
    });

  });
}

