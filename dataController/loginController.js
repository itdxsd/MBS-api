var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
var passport = require('../auth/passport');
const config = require("../config");
var custService = require('../dataServices/registerService');
var macController = require('../dataServices/macService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* Post users register. */
router.post('/register', function (req, res, next) {
    //let status = req.query.status;

    //Service Call
    custService.postData(req, res, function (data, err) {
        if (err) {
            res.render('customers', { message: 'Error Saving Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            //res.redirect('/customers');
            //res.status(200).json({ message: 'Successfully added' });
            res.status(200).json(data);
        }
    });
});

/* Post users Login. */
router.post('/login/user', function (req, res, next) {
    passport.authenticate('local', function (data, err) {
        if (err) {
            console.log(err.name + ':' + err.message);
        } else {
            if (data.user != null) {
                macController.macTest(req, data, function (xdata, err) {
                    if (err) {
                        console.log(err);
                    }

                });
                res.status(200).json(data);
            }
            else {
              
                console.log('Incorrect login details!!');
           
                res.sendStatus(403);
            }
        }
    })(req, res, next);
});

//Sample Dummy Login
/* Post users Login. */
router.post('/login/:username/:pwd', function (req, res, next) {
    let userdata = {
        username: req.params.username,
        password: req.params.pwd
    };

    //Go to server for user varificarion
    if (userdata.username == "xerxes" && userdata.password == "admin") {
        let token = jwt.sign(userdata, config.secretKey, {
            algorithm: config.algorithm,
            expiresIn: '5m'
        });

        res.status(200).json({
            message: 'Login Successful',
            jwtoken: token
        });
    }
    else {
        res.status(401).json({
            message: 'Login Failed'
        });
    }
});

// GET user Logout
router.get('/logout', function (req, res, next) {
    res.clearCookie('jwtoken');
    res.clearCookie('loggeduser');
    //res.redirect('/users');
    res.status(401).json({
        message: 'Users out'
    });
});

module.exports = router;
