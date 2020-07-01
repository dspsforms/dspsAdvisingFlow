const mongoose = require('mongoose');

// draft student before email has been verified
const studentTmpSchema = mongoose.Schema({
    
    key: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true , index: true },
    // hold password here before email verification.
    //  after student is verified, keep password only in user collection
    password: { type: String }, 
    name: { type: String, required: true },
    collegeId: { type: String, required: true },
    cellPhone: { type: String },
    creatorIP: { type: String, required: true},  // save the IP address of the student
    
    created: { type: Date },
    lastMod: { type: Date },
   
    // emailVerificatonDate: { type: Date },
    // cellPhoneVerificationDate: { type: Date },
    status: { type: String } // pending, active, alum, barred, deleted, etc
});

module.exports = mongoose.model('studentTmp', studentTmpSchema);