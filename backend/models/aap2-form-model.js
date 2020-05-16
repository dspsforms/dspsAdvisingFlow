const mongoose = require('mongoose');

const versionDetailSchema = require('./version-details-schema');

const aap2Schema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  formHistory: { type: mongoose.Schema.Types.Mixed },

  // form: { type: String },
  versionDetails: [versionDetailSchema],
  currentVersion: { type: Number },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: { type: String }
  
});

module.exports = mongoose.model('aap2', aap2Schema);
