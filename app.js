var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require("passport");
const flash = require ("connect-flash");
const session = require("express-session");
var expressLayout = require("express-ejs-layouts");

const database = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movie');

var app = express();
// Config Passport
require("./config/passport")(passport);
//Connection to MongoDB
database.connection.on("error", console.error.bind(console, "MongoDB Connection Error:"));

// view engine setup
app.use(expressLayout);
app.set('view engine', 'ejs');

//Express Body Parser
app.use(express.urlencoded({
  extended: true
}));

//Express Session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized: true,
}))

//passport midleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Global Variable 
app.use(function(req,res,next){
  res.locals.error = req.flash("error");
  next();
})
app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/movies', movieRouter);





module.exports = app;
