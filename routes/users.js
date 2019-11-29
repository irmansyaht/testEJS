var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require("../models/UserSchema");
// Halaman Login
router.get('/login', function(req, res, next) {
  res.render('login',{title:"Halaman Login"});
});

//Halaman Register
router.get('/register', function (req, res, next) {
  res.render('register', {
    title: "Halaman Register"
  });
});

//Action Login
router.post('/login', function (req, res) {
  
  const {email,password} = req.body;
 
  let errors = [];

  if (!email || !password){
    errors.push({msg:"Silahkan Lengkapi Data Anda"});
  }
  if (errors.length > 0) {
    res.render("login", {
      errors,
      email,
      password,

    });
  }
  else {
    User.findOne({email:email}).then(user=>{
      if (user){
        if (bcrypt.compareSync(password,user.password)){
          res.redirect("/dashboard");
        }else{
          errors.push({msg:"Password Anda Salah"});
          res.render("login", {
            errors,
            email,
            password,
          });
        }
      }
      else{
        errors.push({msg:"Email Anda Belum Terdaftar"});
        res.render("login", {
          errors,
          email,
          password,
        });
      }
    })
  }

  });

//Action Register
router.post("/register",function(req,res){
  console.log(req.body);
  const {name,email,password,password2} = req.body;

  let errors = [];


if (!name || !email || !password || !password2){
  errors.push({
    msg: "Silahkan Lengkapi Data Anda"
  });
  console.log ("Silahkan lengkapi data Anda");
}

if (password != password2){
  errors.push({msg:"Password Tidak sama"});
  console.log("Password Tidak sama");
}

if (errors.length > 0) {
  res.render("register",{
    errors,
    name,
    email,
    password,
    password2
  })
} else {
  User.findOne({email:email}).then(
    user => {
      if (user){
        console.log("Email Sudah Terpakai");
        errors.push({msg:"Email sudah terpakai"});
        res.render("register",{
              errors,
              name,
              email,
              password,
              password2
        })
      }
      else{
        const newUser = new User ({
          name,
          email,
          password
        });
        newUser.save().then(user=>{
          console.log("Selamat Anda Berhasil Registrasi, Silahkan Login")
          res.redirect("/auth/login");
        }).catch(err=>console.log(err));
      }
    }
  )
}
});

module.exports = router;
