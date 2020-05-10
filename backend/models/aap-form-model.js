const mongoose = require('mongoose');

const aapSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: { type: String },
  state: {type: String}
});

module.exports = mongoose.model('aap', aapSchema);
