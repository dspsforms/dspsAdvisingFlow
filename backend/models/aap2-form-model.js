const mongoose = require('mongoose');

const commonFormSchema = require('./common-form-schema');

module.exports = mongoose.model('aap2', commonFormSchema);
