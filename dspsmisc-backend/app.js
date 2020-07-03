const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");



const mongoose = require('mongoose');

// load env variables.
// const cwd = process.cwd();
const envPath = './.env';
console.log("envPath=", envPath);
require('dotenv').config({ path: envPath });
const config = require('./config/config');




const formRoutes = require('./routes/form-routes');
const userRoutes = require('./routes/user-routes');
const ownFormRoutes = require('./routes/own-form-routes');
const signatureRoutes = require('./routes/signature-routes');



// Connection URL
// const uri = 'mongodb://localhost:27017/simpledsps';
const uri = config.MONGO_URL;
console.log('mongo url= ', uri);

mongoose.Promise = global.Promise;

// mongoose.connect(url);

// add a second field options after uri if desired

// https://mongoosejs.com/docs/deprecations.html#findandmodify
// 
// autoIndex is set to false to avoid performance hit in production
// https://mongoosejs.com/docs/guide.html

mongoose.connect(uri, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
  // autoIndex: false
}
).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("connected to database ");
    },
    err => { /** handle initial connection error */
      console.log("database connect error", err);
    }
  );

/*
make a copy of misc/once.js, call it once.tmp.js, add first admin
user, run it once, then delete once.tmp.js
supply FIRST_TIME as an environment variable, but do it only once.
if it's greater than 0, a new admin will be created if it doesn't already exist
*/

if (config.FIRST_TIME > 0) {
  console.log("config.FIRST_TIME > 0, current time=", new Date());
  const once = require('./misc/once.tmp');
} else {
  console.log("config.FIRST_TIME is <= 0, current time=", new Date());
}

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// doesn't work
// app.use("/print/", express.static(path.join(__dirname, "angular-print")));

app.use((req, res, next) => {
  console.log("req.originalUrl=", req.originalUrl);
  next();
});

app.use("/foo", express.static(path.join(__dirname, "angular-print")));

app.use("/", express.static(path.join(__dirname, "angular-ionic")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// "/api/form/list"
app.get("/api/form2/list", (req, res, next) => {
  console.log("matching /api/form/list");
//trying to get collection names
mongoose.connection.db.listCollections().toArray().then(collections => {
  console.log("collections: ", collections);
  /*
  collections:  [ { name: 'intakeforms',
  type: 'collection',
  options: {},
  info: { readOnly: false, uuid: [Object] },
  idIndex:
   { v: 2,
     key: [Object],
     name: '_id_',
     ns: 'simpledsps.intakeforms' } } ]
     */

  res.status(200).json({
    message: "Collections List fethed successfully",
    collections: collections
  });

})
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      message: "Error",
      err: err
    });
  });


});






app.use("/api/form", formRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ownform", ownFormRoutes);
app.use("/api/signform", signatureRoutes);

// doesn't work
// app.use("/print", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular-print", "index.html"));
// });
// app.use("/print\/*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular-print", "index.html"));
// });


// print angular app, served form the same server. 
// there is only one url match for the print app
// e.g., print/view/bluesheet/5efd6cc5779b154c708c68d3
app.use("/print/view/:formName/:formId", (req, res, next) => {
  console.log("serving print app");
  res.sendFile(path.join(__dirname, "angular-print", "index.html"));
})

// default angular app
app.use((req, res, next) => {
  console.log("serving main app");
  res.sendFile(path.join(__dirname, "angular-ionic", "index.html"));
});


// console.log("calling testEmail1");
// const test = require('./testEmail1');
// console.log("end testEmail1");

// works
// console.log("calling testEmail2 async mode");
// const testSend = require('./testEmail2');
// testSend().catch(console.error);
// console.log("caller after testEmail2, but that stuff is running async");


module.exports = app;
