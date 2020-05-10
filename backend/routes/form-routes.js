const express = require("express");


// dsps guard
const checkAuthDsps = require("../middleware/check-auth-dsps");

// admin guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// verify captcha

// const verifyCaptchaV3 = require("../middleware/verify-captchav3");

const emailNotify = require("../middleware/email-notify");

const router = express.Router();

const FormController = require('../controllers/form-controller');


// post  "/api/form/:formName" verify captcha v3
// router.post("/:formName", verifyCaptchaV3, FormController.postForm, emailNotify);
router.post("/:formName", FormController.postForm, emailNotify);

// // post  "/api/form/agreement/:formName"  // add checkAuthStaff or checkAuthAdmin
// router.post("/agreement/:formName", checkAuthAdmin, FormController.postFormAgreement);

// patch  "/api/form/:formName"  // add checkAuthStaff or checkAuthAdmin
router.patch("/:formName", checkAuthDsps, FormController.patchForm);

// "/api/form/list"  -- must have staff permission
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
