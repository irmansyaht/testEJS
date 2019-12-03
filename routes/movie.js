var express = require("express");

var router = express.Router();
var moment = require("moment");
var movie = require ("../models/MovieSchema");
const {CekAuth} = require("../config/auth");

//Get All Movie
router.get("/",CekAuth, function(req,res,next){
    let ListMovies = [];
    movie.find(function(err,movie){
        if(movie){
            for(let data of movie){
                ListMovies.push({
                    id: data._id,
                    name: data.name,
                    released_on : data.released_on
                })
            }
            res.render("movie/allMovies",{ListMovies})
        }
        else {
            ListMovies.push({
                id: "",
                name: "",
                released_on: ""
            });
            res.render("movie/allMovies", {
                ListMovies
            })
        }
    })
  });

//Create Movie
router.get("/create", CekAuth,function(req, res, next) {
    res.render("movie/createMovie",{
        title:"Halaman Create Movie"
    });
});

//Update Movie
router.get("/update/:movieId", CekAuth,function (req, res, next) {
    movie.findById(req.params.movieId, function (err, movieInfo) {
        var newDate = moment(movieInfo.released_on).format("YYYY-MM-DD")
        if (movieInfo) {
            console.log(movieInfo);
            res.render("movie/updateMovie", {
                movie: movieInfo,
                newDate
            })
        }
    })
});

//Action Create
router.post("/create", CekAuth,function(req, res) {
    const {name,date} = req.body;

    let errors = [];

    if(!name || !date){
        errors.push({msg:"Silahkan Lengkapi Data yang Dibutuhkan"});
    }
    
    if (errors.length> 0){
        res.render("movie/createMovie", {
            errors
        })
    }else{
        const newMovie = movie({
            name,
            released_on : date
        });
        newMovie.save().then(
            movie => {
                errors.push({msg:"Data Movie Berhasil Disimpan"});
                res.render("movie/createMovie",{errors})
            }
        ).catch(err=>console.log(err))
    }
});

//Action Update
router.post("/update",CekAuth, function (req, res) {
let errors = [];
movie.findByIdAndUpdate(req.body.id,{name:req.body.name,released_on:req.body.date},
    function(err){
        if(err){
            console.log(err);
        }else{
            errors.push({msg:"Data berhasil Diubah"});
            var newMovies = {_id:req.body.id,name:req.body.name};
            var newDate = moment(req.body.date).format("YYYY-MM-DD");
            console.log(req.body);
            res.render("movie/updateMovie", {
                movie: newMovies,
                newDate,
                errors
            })
        }
    });
       
});

//Action Delete
router.get("/delete/:movieId", CekAuth,function (req, res) {
    console.log(req.params.movieId);
    movie.findByIdAndDelete(req.params.movieId,function(){
        res.redirect("/movies")
    })
});

module.exports = router;