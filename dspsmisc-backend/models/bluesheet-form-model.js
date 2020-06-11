const mongoose = require('mongoose');

const commonFormSchema = require('./common-form-schema');



// not quite sure how to get back the history. To be studied.

// this is one approach. keeps a separate collection for versions. 
// so far, unclear how to navigate through history. needs studying.
// maybe, mongoose will need the entire form model?

// see https://www.npmjs.com/package/mongoose-version-history
// bluesheetSchema.plugin(versionHistory, {
//   trackDate: true,
//   addDateToDocument: true

// });

// another approach for versioning.
// our version number __v seems to go up by 2 every time (instead of 1)
// also, where are the previous versions? need studying.

// https://stackoverflow.com/questions/35288488/easy-way-to-increment-mongoose-document-versions-for-any-update-queries/35309652#35309652


// bluesheetSchema.pre('save', function(next) {
//   this.increment();
//   return next();
// });

// bluesheetSchema.pre('update', function( next ) {
//   this.update({}, { $inc: { __v: 1 } }, next );
// });

// bluesheetSchema.pre('findOneAndUpdate', function( next ) {
//   this.update({}, { $inc: { __v: 1 } }, next );
// });

module.exports = mongoose.model('bluesheet', commonFormSchema);
