const mongoose = require('mongoose');

const aap1Schema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  versionHistory: { type: mongoose.Schema.Types.Mixed },
  currentVersion: { type: Number },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: {type: String}
});

module.exports = mongoose.model('aap1', aap1Schema);
