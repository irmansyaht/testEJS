var express = require('express');
var router = express.Router();
const{CekAuth,forwardAuth} = require("../config/auth");
// Landing Page
router.get('/',forwardAuth, function(req, res, next) {
  res.render("Welcome", { title: "Halaman Welcome" });
});

//Halaman Dashboard
router.get('/dashboard', CekAuth ,function (req, res, next) {
  res.render("Dashboard", {
    title: "Halaman Dashboard"
  });
});

module.exports = router;
