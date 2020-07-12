const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const debug = require('../constants/debug');

const BluesheetForm = require('../models/bluesheet-form-model');
const Aap1Form = require('../models/aap1-form-model');
const Aap2Form = require('../models/aap2-form-model');
const Aap2childForm = require('../models/aap2child-form-model');
const GreensheetForm = require('../models/greensheet-form-model');


// /api/search/form
exports.searchForm = (req, res, next) => {

  try {


    // dsps people can search for all forms, incl greensheet
    const formNames = ['bluesheet', 'aap1', 'aap2', 'greensheet'];

    // search is a post request searchTerm is in req.body.searchTerm
    let searchTerm = req.body.searchTerm;

    let filter;

    if (!searchTerm || searchTerm.indexOf('*') >= 0) {
      res.status(200).json({
        message: "searchTerm is empty or illegal",
      });
      return;
    }

    searchTerm = searchTerm.trim();

    if (searchTerm.indexOf('G0') == 0) {
      // search on collegeId
      filter = { 'collegeId': searchTerm };
    } else if (searchTerm.indexOf('@') > 0) {
      filter = { 'studentEmail': searchTerm.trim() };
    }  else {

      // find({ 'studentName' : { $regex: /searchTerm/i } } )
      filter = {
        'studentName': new RegExp(searchTerm,  'i')  // i for ignore case
      };
    } // else

    var fn = function createFindPromise(formName) { //  async action

        const formModel = mongoose.model(formName);

        // sort by lastMod, most recent first
        // and return the Promise
        return formModel.find(filter).sort({ lastMod: -1 });

          // return new Promise(resolve => setTimeout(() => resolve(v * 2), 100));
    };

    // map over forEach since it returns

    var actions = formNames.map(fn); // run the function over all items

    // we now have a promises array and we want to wait for it

    var results = Promise.all(actions); // pass array of promises

    var joinedResult = {};
    results.then(data =>
      // or just .then(console.log)
      // console.log(data)  // [2, 4, 6, 8, 10]
      {
          console.log("results of find", data);
          var i = 0;
          formNames.forEach(formName => {
              joinedResult[formName] = data[i++];
          });

          res.status(200).json({
              message: "Forms for student",
              listOfForms: joinedResult
          });
      }).catch(err => {
          console.log("error in one or more of promise.all", err);
          res.status(200).json({
              message: "Forms for student failed",
              err: err
          });
      });

  } catch (err) {
      console.log("outside err", err);

      res.status(200).json({
          message: "outside error",
          err: err
      });
  }

} // search
