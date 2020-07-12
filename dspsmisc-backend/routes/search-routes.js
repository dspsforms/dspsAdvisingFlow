const express = require("express");


// dsps guard
const checkAuthDsps = require("../middleware/check-auth-dsps");

const SearchController = require("../controllers/search-controller");

const router = express.Router();

// /api/search/form
//  leaves the possibility of /api/search/user for later.

// search is a post, so what is searched is not visible in the url
// get the search term from req.body.searchTerm
router.post("/form",
  // checkAuthDsps,
  SearchController.searchForm);


module.exports = router;
