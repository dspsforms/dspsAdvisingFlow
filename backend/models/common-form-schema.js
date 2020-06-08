const mongoose = require('mongoose');

const versionDetailSchema = require('./version-details-schema');

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
    state: { type: String, index: true }
  
});

commonFormSchema.pre('save', function(next) {
    this.studentEmail = this.formWithLatestHistory.studentEmail.val;
    this.collegeId = this.formWithLatestHistory.collegeId.val;
    console.log("from commonFormSchema.pre-save. this=", this);
    next();
});

module.exports = commonFormSchema;

