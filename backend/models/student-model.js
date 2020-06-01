const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    // hold password here before email verification.
    //  after student is verified, keep password only in user collection
    password: { type: String }, 
    name: { type: String, required: true },
    collegeId: { type: String, required: true , unique: true},
    cellPhone: { type: String },
    creatorIP: { type: String, required: true},  // save the IP address of the student
    // role is not needed. we know this record is for a student
    created: { type: Date },
    lastMod: { type: Date },
   
    emailVerificatonDate: { type: Date },
    cellPhoneVerificationDate: { type: Date },
    status: { type: String } // pending, active, alum, barred, deleted, etc
});

module.exports = mongoose.model('student', studentSchema);