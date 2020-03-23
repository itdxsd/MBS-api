"use strict";
const config = require("./config");
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.port || config.host;
//var https = require('https');
var passport = require('passport');


app.use(passport.initialize());
app.use(cookieParser());
// create application/x-www-form-urlencoded parser  
app.use(bodyParser.urlencoded({ extended: true }));

// create application/json parser  
app.use(bodyParser.json());



var loginController = require('./dataController/loginController');
var userController = require('./dataController/userController');

app.use("/api/login", loginController)
app.use("/api/user", userController)

app.get('/', function (req, res) {
    res.send('Hello MBS World');
})

var server = app.listen(port, function () {
    var datetime = new Date();
    var message = "Server running on Port:-" + port + " Started at:- " + datetime;
    console.log(message)
})

//https.createServer(options, app).listen(443);
