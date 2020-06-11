const express = require("express");

// these are for a student to access their own data
// all routes start with /api/ownform

// logged in guard
const checkAuthLoggedIn = require("../middleware/check-auth-loggedin");


const router = express.Router();

const OwnFormController = require('../controllers/own-form-controller');


// "/api/ownform/list"  -- own forms, for student. must be logged in
// add checkAuthLoggedIn
router.get("/list", OwnFormController.ownList);

// "/api/ownform/list/:studentSigStatus"  -- own forms, with a given signature status
router.get("/list/:studentSigStatus",  OwnFormController.ownList);

// /api/ownform/getaform/:formName/:_id
// add checkAuthLoggedIn
router.get("/getaform/:formName/:_id", checkAuthLoggedIn, OwnFormController.getAForm);

// "/api/ownform/signform"  -- req.body.formName and req.body.formId
// router.post("/signform", checkAuthLoggedIn, OwnFormController.signForm);

// "/api/form/student/list"  --  forms for a student. must have dsps permission
// router.get("/student/list/:studentEmail", checkAuthDsps, OwnFormController.studentList);

// instructor will require a different set of paths. they can see all bluesheets where they are the
// instructor



module.exports = router;
