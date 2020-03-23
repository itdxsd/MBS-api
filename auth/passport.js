var passport = require('passport');
var strategy = require('passport-local');
var dbService = require('../dataAccess/master');
let jwt = require('jsonwebtoken');
const config = require("../config");

passport.use(new strategy({ session: false }, function (username, password, callback) {
    //Stored Procedure CALL
    //var query = "[GetUserAuthentication]'" + username + "', '" + password + "'";
    var query = "CALL MBS.MBS_AUTHENTICATION(?,?)";
    var userdata = [
        username,
        password
    ];
    //Get Data From Database
    dbService.prepareSync(userdata, query, function (data, err) {
        if (err) {
            callback(null, err);
            console.log(err);
        } else {
            var result = data
            if (result.length > 0) {
                let token = jwt.sign(result[0], config.secretKey, {
                    algorithm: config.algorithm,
                    expiresIn: '5m'
                });
                callback({ user: result[0], TOKEN: token, STATUS: 200 });

            }
            else {
                callback({ user: null, token: null });
            }
        }
    });
}));

module.exports = passport;