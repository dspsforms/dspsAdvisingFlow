// library functions for both dsps requests and student requests to call

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

// called after a document has been found

exports.getFormDetails = (document, req, res) => {

    console.log("form from db", document);

    var hasSig, isParent = false;
    var signatures = null;
    var children = null;
    
    // fetch signature of parent doc here.
    // client fetches sigs of child docs in a separate call

    // create an array of Promises, and execute Promise.all
    const actions = [];
    if (document.studentSigStatus && document.studentSigStatus === 'signed') {
        actions.push(Signature.find({ formId: document._id }).exec() );
        hasSig = true;
    }

    if (document.isParent) {
        const testId = document._id.toString();
        console.log(testId);
        const formModel = mongoose.model(document.childFormName); 
        const filter = { parentId: document._id.toString() } 
        actions.push( formModel.find(filter).sort({ lastMod: -1 }).exec() ); 
        isParent = true;
    }

    if (actions.length > 0) {
    var results = Promise.all(actions);
    results.then(data => {
        console.log(data);
        if (hasSig && isParent) {
        // 1,1
        signatures = data[0];
        children = data[1];
        } else if (!hasSig && !isParent) {
        // 0,0 no-op
        } else if (hasSig) {
        // 1,0
        signatures = data[0];
        } else {
        // 0,1 
        children = data[0];

        }


        res.status(200).json({
        message: "Form fetched successfully",
        formData: document,
        signatures: signatures,
        children: children
        });
    }).catch( (err) => {
        console.log(err);
    });

    
    } // actions.length > 0

    else {
        res.status(200).json({
            message: "Form fetched successfully",
            formData: document
        });
    }

}

