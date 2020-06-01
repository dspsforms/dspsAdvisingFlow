const mongoose = require('mongoose');

const randomKeySchema = mongoose.Schema({
    key: { type: String, required: true, unique: true },
    
    // this is student._id
    tmpId: { type: String },

    creatorIP: { type: String},
    created: { type: Date },
    status: { type: String } // pending,  deleted, etc
});

module.exports = mongoose.model('randomKey', randomKeySchema);