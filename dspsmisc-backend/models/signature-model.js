const mongoose = require('mongoose');


const signatureSchema = mongoose.Schema({
    formName: { type: String, required: true, index: true },
    formId: { type: String, required: true , index: true}, // may not be unique because aap1 may have to be signed multiple times
    email: { type: String, required: true, index: true },
    formVersion: { type: Number }, 
    collegeId: { type: String },
    name: { type: String },
    userId: { type: String }, // user._id of student
    signature: { type: String, required: true }, // whatever the student types in to sign
    signatureDate: { type: Date },
    lastMod: { type: Date },
    ipAddr: { type: String } , // ip address from where this was signed
    loginSessionId: { type: String } // once this is implemented
  
});

// the tuple (formName, formId, formVerson, email) must be unique

signatureSchema.index({ formName: 1, formId: 1, formVersion: 1, email: 1 }, { unique: true });

// if needed
// signatureSchema.pre('save', function(next) {
//   // the req object is not a param, so ipAddr, loginSessionId, etc must be filled elsewhere
//   // console.log("from signatureSchema.pre-save. this=", this);
//   next();
// });

signatureSchema.pre('save', function(next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});


module.exports = mongoose.model('signature', signatureSchema);