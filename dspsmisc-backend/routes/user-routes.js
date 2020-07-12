const express = require("express");


// admin guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// (staff or admin or dsps faculty) guard
const checkAuthDsps = require("../middleware/check-auth-dsps");

const checkAuthLoggedIn = require("../middleware/check-auth-loggedin");

const emailVerifyEmail = require("../middleware/email-verify-email");

const emailResetPasswordMail = require("../middleware/email-reset-password-email");


// currently, staff and faculty have same access

// // staff guard
// const checkAuthStaff = require("../middleware/check-auth-staff");

// // dsps faculty guard
// const checkAuthDspsFaculty = require("../middleware/check-auth-faculty");

// instructor guard
const checkAuthInstructor = require("../middleware/check-auth-instructor");

// student guard
const checkAuthStudent = require("../middleware/check-auth-student");

// extract userId, check if user is logged in
const extractUserId = require("../middleware/extract-userId");

// this marks a random key as used, along with date and ip address
// needs req.randomStr
const randomKeyUpdateStatus = require("../middleware/randomkey-update-status");


const UserController = require("../controllers/user-controller");

const router = express.Router();


// post /api/user/addstaff -- requester must have admin permission
router.post("/addstaff", checkAuthAdmin, UserController.addStaff);


// post /api/user/addstudentstep1 -- student user signup. no auth permission reqd
router.post("/addstudentstep1", UserController.accountExists, UserController.addStudentStep1, emailVerifyEmail);

// post /api/user/verifyemail -- student user signup. no auth permission reqd
// TODO send a welcome email
router.post("/verifyemail", UserController.accountExists, UserController.verifyEmail, randomKeyUpdateStatus);

// post /api/user/checkandupdatepassword -- check and update password
// extractUserId will extract userId and email from web token, and put it in req.userData
// TODO send an alert email
router.post("/checkandupdatepassword", extractUserId,  UserController.checkAndUpdatePassword);

// resetpasswordstep1
router.post("/resetpasswordstep1",  UserController.resetPasswordStep1, emailResetPasswordMail);

// retrieveuserfromrandomkey
router.post("/retrieveuserfromrandomkey",  UserController.retrieveUserFromRandomKey, randomKeyUpdateStatus);

// resetpasswordstep2
router.post("/resetpasswordstep2",  UserController.updatePasswordBasedOnEmail);

// this and stuent users may need email verification workflow
// post /api/user/addinstructor -- requester must be dsps staff, faculty or admin
// router.post("/addinstructor", checkAuthDsps, UserController.addstaff );

// post /api/user/login -- requester is not logged in, no auth needed
router.post("/login", UserController.login);

// /api/user/listdsps -- requester must be dsps user
router.get("/listdsps", checkAuthDsps, UserController.listDspsUsers);

// /api/user/listdspssmall -- requester must be logged in
router.get("/listdspssmall", checkAuthLoggedIn, UserController.listDspsUsersSmall);

// /api/user/liststudents -- requester must be dsps user
router.get("/liststudents", checkAuthDsps, UserController.listStudents);

//  /api/user/student/:collegeId
// checkAuthDsps
router.get("/student/:collegeId", checkAuthDsps, UserController.fetchStudent);


// // instructors and students can be listed by dsps staff or faculty + admin
// router.get("/listinstructors", checkAuthDsps, UserController.listInstructors);

// // instructors and students can be listed by dsps staff or faculty + admin
// router.get("/liststudents", checkAuthDsps, UserController.listStudents );

module.exports = router;
