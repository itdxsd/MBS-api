var dbService = require('../dataAccess/master');

var postData = function (req, res, callback) {

    //Stored Procedure
    var Message = 000000000000000000, rvalue = 00;
    var cn = parseInt(req.body.accountnumber);
    var query = "CALL MBSDEVT_SCHEMA.MBS_REGISTER(?,?,?,?,?,?,?,?)";

    var p_username = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.username };
    var p_password = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.password };
    var p_lastname = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.lastname };
    var p_firstname = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.firstname };
    var p_middlename = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.middlename };
    var p_accountnumber = { ParamType: "INPUT", DataType: "VARCHAR", Data: req.body.accountnumber };
    var p_rvalue = { ParamType: "OUTPUT", DataType: "INTEGER", Data: 00 };
    var p_message = { ParamType: "OUTPUT", DataType: "VARCHAR(200)", Data: "0", Length: 30 };

    var parameter = [p_username, p_password, p_lastname, p_firstname, p_middlename, p_accountnumber, p_rvalue, p_message];
    dbService.prepareSyncZ(parameter, query, function (err, data) {
        if (err) {
            callback(err);
        } else {

            callback(data);
        }
    });
};

module.exports = {
    postData
};