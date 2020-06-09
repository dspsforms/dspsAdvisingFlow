const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
const GreensheetForm = require('../models/greensheet-form-model');

// every path starts with /api/ownform -- which is already processed
// by app.js before we get here

// get /api/ownform/list
//     /api/ownform/list/:signatureStatus (pending, signed)
//
// get /api/ownform/:formName/:id
// post /api/ownform/sign/:formName/:id   
//
// get /api/ownform/listCategory/:formName

// /api/ownform/list
exports.ownList = (req, res, next) => {

    try {

    
        // all except greensheet
        const formNames = ['bluesheet', 'aap1', 'aap2'];

        // use email from decoded token in check-auth-loggedin.js
        const ownEmail = req.userData.email;

        // const ownEmail = 'am@amarnathm.com'; // for testing
        // const ownEmail = 'c@test.com'; // for testing

        const filter = { studentEmail: ownEmail };

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
                { studentEmail: ownEmail },
            ] 
        };
        const formModel = mongoose.model(formName);

        formModel.findOne(filter).then(document => {
            if (!document) {
                res.status(200).json({
                    message: "No form found for student",
                    err: "No form found for student"
                });
            } else {
                res.status(200).json({
                    message: "Form for student",
                    formData: document
                });
            }
            
        })
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