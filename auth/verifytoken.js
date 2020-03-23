var express = require('express');
var router = express.Router();
var dbService = require('../dataAccess/master');
var jwt = require('jsonwebtoken');
const config = require("../config");

router.use(function (req, res, next) {

    var token = req.headers['x-access-token'] || req.cookies.jwtoken;
    var httpMethod = null; //var httpMethod =
    console.log(req.method);
    var originalUrl = req.originalUrl;
   
    if (originalUrl.includes("save")) httpMethod = 'POST';
    else if (originalUrl.includes("edit")) httpMethod = 'PUT';
    else if (originalUrl.includes("delete")) httpMethod = 'DELETE';
    else httpMethod = 'GET';

    if (token) {
        jwt.verify(token, config.secretKey,
            {
                algorithm: config.algorithm

            }, function (err, decoded) {
                if (err) {
                    let errordata = {
                        message: err.message,
                        expiredAt: err.expiredAt
                    };
                    return res.status(402).json({ title: 'Unauthorized Access', status: 'Token Expired at ' + err.expiredAt });
                }
                req.decoded = decoded;

                //Stored Procedure
                // var query = "[GetUserAuthorization] '" + decoded.userId + "', '" + httpMethod + "'";
                let query = 'CALL MBS.MBS_AUTHORIZATION(?)';

                var userdata = [
                    decoded.USER_ID
                ];

                //Get Authorization From Database
                dbService.prepareSync(userdata, query, function (data, err) {
                    if (err) {
                        console.log(err.name + ':' + err.message);
                    } else {
                       // console.log(data[0].PERMISSION);
                        //var result = data[0].PERMISSION;

                        if (data.length > 0) {
                            next();
                        }
                        else {
                            console.log('Unauthorized Access!!');
                            res.status(401).json({
                                message: 'Unauthorized Access!!'
                            });
                            // if (httpMethod == 'GET') {
                            //     //return res.redirect('/');
                            // }
                            // else {
                            //     return res.redirect('/customers?status=' + encodeURIComponent('Operation Restricted!!'));
                            // }
                        }
                    }
                });
            });
    } else {
        // return res.redirect('/');
        res.clearCookie('jwtoken');
        res.clearCookie('loggeduser');
        return res.status(403).json({
            message: 'Forbidden Access'
        });
    }
});

module.exports = router;