var express = require("express");

var router = express.Router();

//Get All Movie
router.get("/", function(req,res,next){
    res.render("movie/allMovies",{
        title:"Halaman Get Movie"
    });
});

//Create Movie
router.get("/create",function(req,res,next){
    res.render("movie/createMovie",{
        title:"Halaman Create Movie"
    });
});

//Update Movie
router.get("/update/:movieId", function (req, res, next) {
    res.render("movie/updateMovie", {
        title: "Halaman Update Movie",
         movieId:req.params.movieId
    });
});

//Action Create
router.post("/create",function(req,res){

});

//Action Update
router.put("/update/:movieId", function (req, res) {

});

//Action Delete
router.delete("/delete/:movieId", function (req, res) {

});

module.exports = router;