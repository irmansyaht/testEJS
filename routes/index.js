var express = require('express');
var router = express.Router();

// Landing Page
router.get('/', function(req, res, next) {
  res.render("Welcome", { title: "Halaman Welcome" });
});

//Halaman Dashboard
router.get('/dashboard', function (req, res, next) {
  res.render("Dashboard", {
    title: "Halaman Dashboard"
  });
});

module.exports = router;
