const express = require("express");


// dsps guard
const checkAuthDsps = require("../middleware/check-auth-dsps");

// admin guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// logged in guard
const checkAuthLoggedIn = require("../middleware/check-auth-loggedin");

// verify captcha

// const verifyCaptchaV3 = require("../middleware/verify-captchav3");

const emailNotifyDsps = require("../middleware/email-notify-dsps");

const emailNotifyStudentNewForm = require("../middleware/email-notify-student-new-form");

const router = express.Router();

const FormController = require('../controllers/form-controller');


// post  "/api/form/:formName" verify captcha v3
// router.post("/:formName", verifyCaptchaV3, FormController.postForm, emailNotify);
// emailNotifyDsps is not required. because faculty just filled out the form
// they don't need a notification -- until student signs
router.post("/:formName", FormController.postForm, emailNotifyStudentNewForm);

// // post  "/api/form/agreement/:formName"  // add checkAuthStaff or checkAuthAdmin
// router.post("/agreement/:formName", checkAuthAdmin, FormController.postFormAgreement);

// patch  "/api/form/:formName"  //  checkAuthDsps 
router.patch("/:formName", checkAuthDsps, FormController.patchForm);

// patch  "/api/form/full/:formName"  //  checkAuthDsps  will update full form
router.patch("/full/:formName", checkAuthDsps, FormController.patchFullForm);


// "/api/form/list"  -- must have dsps permission
router.get("/list", checkAuthDsps, FormController.list);


// // get "/api/form/agreement/:formName"
// router.get("/agreement/:formName", FormController.getFormAgreement);

// get "/api/form/:formName"  -- must have staff level perm
router.get("/:formName", checkAuthDsps,  FormController.getFormsForACategory );

// get "/api/form/:formName/:_id"  -- with this pattern, need staff level perm
router.get("/:formName/:_id", checkAuthDsps, FormController.getAForm);




// delete "/api/form/:formName/:id"  -- with this pattern, need staff level perm
router.delete("/:formName/:id", checkAuthDsps, FormController.deleteAForm );

module.exports = router;
