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
    childFormName: { type: String, index: true },  // aap2child etc
    studentName: { type: String, index: true }  // for search
});

commonFormSchema.pre('save', function(next) {
    this.studentEmail = this.formWithLatestHistory.studentEmail.val;
    if (this.studentEmail) {
        this.studentEmail = this.studentEmail.toLowerCase();
    }
    this.collegeId = this.formWithLatestHistory.collegeId.val;

    this.studentName =
    this.formWithLatestHistory.studentFirstName.val + ' ' +
        this.formWithLatestHistory.studentLastName.val;

    // signature does not apply to greensheet
    // in order to not complicate things as more forms are added,
    // we are keeping the sig field even if we are not using it.
    this.studentSigStatus = StudentSigStatus.PENDING;
    
    
    console.log("from commonFormSchema.pre-save. this=", this);
    next();
});

// see https://stackoverflow.com/a/49114797
// find by id and update calls findOneAndUpdate
// also the query object has a field called _update that has 
// data we need
commonFormSchema.pre('findOneAndUpdate', function (next) {

    if (this._update.formWithLatestHistory) {
        if (this._update.formWithLatestHistory.studentEmail &&
            this._update.formWithLatestHistory.studentEmail.val) {
            this._update.studentEmail = this._update.formWithLatestHistory.studentEmail.val.toLowerCase();
        }
        if (this._update.formWithLatestHistory.collegeId &&
            this._update.formWithLatestHistory.collegeId.val) {
            this._update.collegeId = this._update.formWithLatestHistory.collegeId.val;
        }
    
        if (this._update.formWithLatestHistory.studentFirstName &&
            this._update.formWithLatestHistory.studentFirstName.val &&
            this._update.formWithLatestHistory.studentLastName &&
            this._update.formWithLatestHistory.studentLastName.val) {
            
            this._update.studentName =
                this._update.formWithLatestHistory.studentFirstName.val + ' ' +
                this._update.formWithLatestHistory.studentLastName.val;
        }

    }
    
    
    next();
});

// commonFormSchema.post('findById', function (next) {
//     console.log("commonFormSchema.post findById", this);
// });

// commonFormSchema.post('findOne', function (next) {
//     console.log("commonFormSchema.post findOne", this);
// });



module.exports = commonFormSchema;

