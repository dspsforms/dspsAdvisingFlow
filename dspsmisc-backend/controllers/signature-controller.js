const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const Signature = require('../models/signature-model');

// these are probably needed for mongoose.model(formName)
const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
// no signature needed for Greensheet


// /api/signform
exports.signForm = (req, res, next) => {

    // duplicate signature is prevented by declaring a unique index on (formName, formId, formVersion, email)

    try {

        const formName = sanitize(req.body.formName);
        const formModel = mongoose.model(formName);

        // for email, use what is in json web token, not what is being 
        // submitted in req.body.email

        // use email from decoded token in check-auth-loggedin.js
        const ownEmail = req.userData.email;

        // const ownEmail = 'am@amarnathm.com'; // for testing
        // const ownEmail = 'c@test.com'; // for testing
    
        const filter =
        {
            $and: [
                { studentEmail: ownEmail },
                { _id: req.body.formId }
            ]
        };

        formModel.findOne(filter).then(form => {
            if (!form) {
                // no matching form found. cannot sign
                res.status(401).json({
                    err: 'Form ' + form.formName + ' for this user not found. Could not sign.'
                });
                return;
            }

            // signing current version
            // if signing a different version is ok, comment this out
            // req.body.formVersion is a string, convert to int
            if (form.currentVersion !== +req.body.formVersion) {
                // version being signed is different from current version
                res.status(401).json({
                    err: 'Form ' + form.formName + ' has a different version than the one being signed. Could not sign.'
                });
                return;
            }

            // sign this


            const now = new Date();
            console.log(req.body);
            const signature = new Signature({
                formName: sanitize(req.body.formName),
                formId: form._id,
                email: ownEmail,
                formVersion: +req.body.formVersion,
                collegeId: req.body.collegeId,
                name: req.body.name,
                userId: null, // req.userData.userId, // TODO
                signature: req.body.signature,
                signatureDate: now,
                lastMod: now,
                ipAddr: req.headers['x-forwarded-for'] || req.connection.remoteAddress, 
                loginSessionId: null // TODO
            
            });
            
            signature.save().then(
                createdSig => {
                    return updateFormSignatureStatus(createdSig, req, res, next);
                    // res.status(201).json({
                    //     message: 'Form ' + form.formName + ' signed',
                    //     sigId: createdSig._id
                    // });

                    // prepare req so as to send email to dsps
                    // and/or show an alert on the dsps person's alerts
                    // next(); 

                }).catch(err => {
                    console.log(err);
                    res.status(201).json({
                        message: 'saving of signature failed',
                        err: err
                    });
                }) // catch for signature.save then
        }); // formModel.fineOne then

    } catch (err) {
        console.log(err);
          res.status(500).json({
            message: 'Signature failed',
            err: err
          });
    }
    
  
}
  
updateFormSignatureStatus = (sigObj, req, res, next) => {
      
    try {
        const formModel = mongoose.model(sigObj.formName);
        if (formModel) {
            formModel.findByIdAndUpdate(
                mongoose.Types.ObjectId(sigObj.formId),
                { studentSigStatus: 'signed' }, 
                { new: true },
      
                // findByIdAndUpdate callback function
                (err, result) => {
                    console.log(result);
                    if (err) return res.status(500).send({
                            _id: sigObj.formId,
                            message: "form update error, post signature",
                            err: err
                    });
                    // else  -- no error
                    return res.status(200).json({
                        signature: sigObj,
                        message: "form signed"
                    });
                } // findByIdAndUpdate callback

            ) // findByIdAndUpdate

        } // formModel
        else {
            return res.status(200).json({
                err: "form update error, no form found"
            })
        }
      
          
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "form update error, after signature",
            err: err
        });
    }
    
    

}  // updateFormSignatureStatus