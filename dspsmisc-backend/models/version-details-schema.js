const mongoose = require('mongoose');

const versionDetailSchema = mongoose.Schema({
  version: { type: Number, required: true },
  date: { type: Date, required: true },
  completedByUserId: { type : String, required: true }
});

// module.exports = mongoose.model('versionDetail', versionDetailSchema);
module.exports = versionDetailSchema;