const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
const GreensheetForm = require('../models/greensheet-form-model');

const Signature = require('../models/signature-model');

const CommonFormController = require('./common-form-controller');

// every path starts with /api/ownform -- which is already processed
// by app.js before we get here

// get /api/ownform/list  -- goes to OwnFormController.ownList
//
//     /api/ownform/list/:studentSigStatus (pending, signed)
//
// get /api/ownform/getaform/:formName/:_id   -- goes to OwnFormController.getAForm
//
//      

// post /api/ownform/sign/:formName/:id   
//
// get /api/ownform/listCategory/:formName

// /api/ownform/list
// also, /api/ownform/list/:studentSigStatus (pending, signed)
exports.ownList = (req, res, next) => {

    try {

    
        // all except greensheet
        const formNames = ['bluesheet', 'aap1', 'aap2'];

        // use email from decoded token in check-auth-loggedin.js
        const ownEmail = req.userData.email;

        // const ownEmail = 'am@amarnathm.com'; // for testing
        // const ownEmail = 'c@test.com'; // for testing

        const studentSigStatus = sanitize(req.params.studentSigStatus);

        let filter;

        if (!studentSigStatus) {
            filter = {
                studentEmail:
                    { $regex: new RegExp('^' + ownEmail + '$', "i") }  
            };
        } else {
            filter = {
                $and: [
                    { studentEmail: { $regex: new RegExp('^' + ownEmail + '$', "i") } },
                    { studentSigStatus : studentSigStatus }
                ]
            }
        }

        var fn = function createFindPromise(formName) { //  async action
        
            const formModel = mongoose.model(formName);

            // sort by lastMod, most recent first
            // and return the Promise
            return formModel.find(filter).sort({ lastMod: -1 });

            // return new Promise(resolve => setTimeout(() => resolve(v * 2), 100));
        };
        // map over forEach since it returns
    
        var actions = formNames.map(fn); // run the function over all items
    
        // we now have a promises array and we want to wait for it
    
        var results = Promise.all(actions); // pass array of promises
    
        var joinedResult = {};
        results.then(data =>
        // or just .then(console.log)
        // console.log(data)  // [2, 4, 6, 8, 10]
        {
            console.log("results of find", data);
            var i = 0;
            formNames.forEach(formName => {
                joinedResult[formName] = data[i++];
            });

            res.status(200).json({
                message: "Forms for student",
                listOfForms: joinedResult
            });
        }).catch(err => {
            console.log("error in one or more of promise.all", err);
            res.status(200).json({
                message: "Forms for student failed",
                err: err
            });
        });

        // formNames.forEach(formName => {
        //     const formModel = mongoose.model(formName);

        //     // sort by lastMod, most recent first
        //     formModel.find(filter).sort({ lastMod: -1 }).then(formsDataForACategory => {
        //         result[formName] = formsDataForACategory;
        //     })
        // })

    } catch (err) {
        console.log("outside err", err);

        res.status(200).json({
            message: "outside error",
            err: err
        });
    }

} // ownList


// get "/api/ownform/getaform/:formName/:_id" 
exports.getAForm = (req, res, next) => {

    try {

        const formName = sanitize(req.params.formName);
        const formId = sanitize(req.params._id);

        // use email from decoded token in check-auth-loggedin.js
        const ownEmail = req.userData.email;

        // const ownEmail = 'am@amarnathm.com'; // for testing

        const filter = {
            $and: [
                { _id: formId },
                { studentEmail: { $regex: new RegExp('^' + ownEmail + '$', "i") } },
            ] 
        };
        const formModel = mongoose.model(formName);

        formModel.findOne(filter).then(document => {
            if (!document) {
                res.status(200).json({
                    message: "No form found for student",
                    err: "No form found for student"
                });
                return;
            }
         
            // else (document is not empty)

            CommonFormController.getFormDetails(document, req, res); // will handle response

            //    // if the form is signed, fetch the signatures
            //     if (document.studentSigStatus && document.studentSigStatus === 'signed') {
            //         Signature.find({ formId: document._id }).then(signatures => {

            //             // document['signatures'] = signatures;
            //             res.status(200).json({
            //                 message: "Form fetched successfully",
            //                 formData: document,
            //                 signatures: signatures
            //             });
                        
                        
            //         }) // signature.find then
            //     }  // if signed
            //     else {
            //         res.status(200).json({
            //             message: "Form fetched successfully",
            //             formData: document
            //         }); 
            //     }
                
           
            
        }) // findOne then
        .catch(err => {
            console.log("error in query to db", err);
            res.status(200).json({
                message: "Form fetch for student failed",
                err: err
            });
        });
        
    } catch (err) {
        console.log("outside err", err);

        res.status(200).json({
            message: "outside error",
            err: err
        });
    }
}  // getAForm


// for student, need to verify it's theirs
exports.signatures = (req, res, next) => {
    
    const idArr = req.body.idArr;
    // console.log("idArrStr=", idArrStr);

    // const idArr = JSON.parse(idArrStr);
    console.log("idArr", idArr);

    // use email from decoded token in check-auth-loggedin.js
    const ownEmail = req.userData.email;

    //  const ownEmail = 'am@amarnathm.com'; // for testing
  
    const filter = {
        $and: [ 
            { email: { $regex: new RegExp('^' + ownEmail + '$', "i") } },
            { 'formId': { $in : idArr } }
        ]
    };
  
    const formModel = mongoose.model('signature');

    formModel.find(filter).then(sigs => {
        console.log("sigs", sigs);
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
