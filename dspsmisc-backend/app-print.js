const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");



const mongoose = require('mongoose');

// load env variables.
// const cwd = process.cwd();
// .env must be path relative to where the server starts
const envPath = './.env'; 
console.log("envPath=", envPath);
require('dotenv').config({ path: envPath });
const config = require('./config/config');




const formRoutes = require('./routes/form-routes');
const userRoutes = require('./routes/user-routes');
const ownFormRoutes = require('./routes/own-form-routes');


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
  autoIndex: false}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("connected to database ");
    },
    err => { /** handle initial connection error */
      console.log("database connect error", err);
    }
  );



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/pdf", express.static(path.join(__dirname, "/pdf")));
app.use("/", express.static(path.join(__dirname, "/angular-print")));

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

// app.use("/print", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular-print", "index.html"));
// });

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular-print", "index.html"));
});


module.exports = app;
