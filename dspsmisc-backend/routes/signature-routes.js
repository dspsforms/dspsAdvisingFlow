const express = require("express");

// logged in guard
const checkAuthLoggedIn = require("../middleware/check-auth-loggedin");


const router = express.Router();

const SignatureController = require('../controllers/signature-controller');

// add checkAuthLoggedIn
// add some sort of notification to corresponding faculty
router.post("/", SignatureController.signForm);

module.exports = router;
