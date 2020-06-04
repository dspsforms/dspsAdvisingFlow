const mongoose = require('mongoose');

// history changes to user password and other meta data
const metaHistorySchema = mongoose.Schema({
  ip: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type : String, required: true }
});

module.exports = metaHistorySchema;