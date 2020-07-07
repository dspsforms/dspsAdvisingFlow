const mongoose = require('mongoose');

const versionDetailSchema = require('./version-details-schema');
const StudentSigStatus = require('../constants/student-sig-status');

const commonFormSchema = mongoose.Schema({
    formName: { type: String, required: true },
    user: { type: String, index: true },
    studentEmail: { type: String, index: true },
    collegeId: { type: String, index: true },

    // form with one (latest) history for each field
    formWithLatestHistory: { type: mongoose.Schema.Types.Mixed },

    // form with entire history
    formHistoryArr: { type: mongoose.Schema.Types.Mixed },

    // form: { type: String },
    versionDetails: [versionDetailSchema],
    currentVersion: { type: Number },
    edited: { type: Boolean },
    created: { type: Date },
    lastMod: { type: Date },
    captchaScore: { type: String },
    state: { type: String, index: true },
    studentSigStatus: { type: String, index: true }, // 'pending', 'signed', 'not-required'
    studentSigId: { type: String, index: true }, // key in signature collection. multiple signatures are possible, one for each version
    isParent: { type: Boolean, index: true }, // if this is a child form
    parentId: { type: String, index: true }, // if this is a child form
    childFormName: { type: String, index: true }  // aap2child etc
});

commonFormSchema.pre('save', function(next) {
    this.studentEmail = this.formWithLatestHistory.studentEmail.val;
    this.collegeId = this.formWithLatestHistory.collegeId.val;

    // signature does not apply to greensheet
    // in order to not complicate things as more forms are added,
    // we are keeping the sig field even if we are not using it.
    this.studentSigStatus = StudentSigStatus.PENDING;
    
    
    console.log("from commonFormSchema.pre-save. this=", this);
    next();
});

// commonFormSchema.post('findById', function (next) {
//     console.log("commonFormSchema.post findById", this);
// });

// commonFormSchema.post('findOne', function (next) {
//     console.log("commonFormSchema.post findOne", this);
// });



module.exports = commonFormSchema;

