const mongoose = require('mongoose');

const studentSignatureSchema = mongoose.Schema({
    formName: { type: String, required: true, index: true },
    formId: { type: String, required: true , index: true}, // may not be unique because aap1 may have to be signed multiple times
    studentEmail: { type: String, required: true , index: true},
    collegeId: { type: String },
    studentName: { type: String },
    studentSignature: { type: String, required: true }, // whatever the student types in to sign
    signatureDate: { type: Date },
    lastMod: { type: Date },
    ipAddr: { type: String } , // ip address from where this was signed
    loginSessionId: { type: String } // once this is implemented
  
});

studentSignatureSchema.pre('save', function(next) {
  // the req object is not a param, so ipAddr, loginSessionId, etc must be filled elsewhere
  // console.log("from studentSignatureSchema.pre-save. this=", this);
  next();
});

module.exports = mongoose.model('studentSignature', studentSignatureSchema);