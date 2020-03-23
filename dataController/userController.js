var express = require('express');
var router = express.Router();
var custService = require('../dataServices/userService');
let verifyToken = require('../auth/verifytoken');
//const mybatisMapper = require('mybatis-mapper');


// /* GET customers listing. */
router.get('/getmapper', function (req, res, next) {

    res.status(200).json("Sample Response");
});
// */

/* GET customers listing. */
router.get('/', function (req, res, next) {
    let status = req.query.status;
    //Service Call
    custService.getData(req, res, function (data, err) {
        if (err) {
            console.log('Error Loading Data!!');
        } else {
            // res.render('customers', { customerdata: data.recordset, message: status });
            res.status(200).json(data);
        }
    });
});


/* GET customers ByID */
router.post('/getuser', function (req, res, next) {
    let status = req.query.status;
    let decoded = req.body.USER_INFO_ID;
    console.log('decoded ' + decoded);
    custService.getDataById(decoded, req, res, function (data, err) {
        if (err) {
            //res.render('customers', { message: 'Error Binding Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.status(200).json(data);
        }
    });
});

/* POST customer */
router.post('/save', verifyToken, function (req, res, next) {
    let status = req.query.status;

    //Service Call
    custService.postData(req, res, function (data, err) {
        if (err) {
            res.render('customers', { message: 'Error Saving Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.redirect('/customers');
        }
    });
});

/* DELETE Delete customers */
router.get("/delete/:id", verifyToken, function (req, res) {
    let status = req.query.status;

    //Service Call
    custService.deleteData(req, res, function (data, err) {
        if (err) {
            res.render('customers', { message: 'Error Deleting Data!!' });
            console.log(err.name + ':' + err.message);
        } else {
            res.redirect('/customers');
        }
    });
});


module.exports = router;