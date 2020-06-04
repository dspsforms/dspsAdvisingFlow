const mongoose = require('mongoose');

const randomKeySchema = mongoose.Schema({
    key: { type: String, required: true, unique: true },
    
    // for the case when student is signing up
    // this is student._id
    tmpId: { type: String },

    // for the case when user has forgotten password
    email: {type: String },

    creatorIP: { type: String},
    created: { type: Date },

    expiresAt: {type: Date},

    // newUser, forgotPassword, etc
    purpose: { type: String },
    status: { type: String } // pending,  deleted, etc
});

module.exports = mongoose.model('randomKey', randomKeySchema);