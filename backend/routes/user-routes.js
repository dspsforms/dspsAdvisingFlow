const express = require("express");


// admin guard
const checkAuthAdmin = require("../middleware/check-auth-admin");

// (staff or admin or dsps faculty) guard
const checkAuthDsps = require("../middleware/check-auth-dsps");

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


const UserController = require("../controllers/user-controller");

const router = express.Router();


// post /api/user/addstaff -- requester must have admin permission
router.post("/addstaff", checkAuthAdmin, UserController.addStaff);


// post /api/user/addstudentstep1 -- student user signup. no auth permission reqd
router.post("/addstudentstep1", UserController.addStudentStep1);

// post /api/user/verifyemail -- student user signup. no auth permission reqd
router.post("/verifyemail", UserController.verifyEmail);

// post /api/user/checkandupdatepassword -- check and update password
// extractUserId will extract userId and email from web token, and put it in req.userData
router.post("/checkandupdatepassword", extractUserId,  UserController.checkAndUpdatePassword);

// this and stuent users may need email verification workflow
// post /api/user/addinstructor -- requester must be dsps staff, faculty or admin
// router.post("/addinstructor", checkAuthDsps, UserController.addstaff );

// post /api/user/login -- requester is not logged in, no auth needed
router.post("/login", UserController.login);

// /api/user/list -- requester be admin
router.get("/list", checkAuthAdmin, UserController.list);

// // instructors and students can be listed by dsps staff or faculty + admin
// router.get("/listinstructors", checkAuthDsps, UserController.listInstructors);

// // instructors and students can be listed by dsps staff or faculty + admin
// router.get("/liststudents", checkAuthDsps, UserController.listStudents );

module.exports = router;
