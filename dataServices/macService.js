var dbService = require('../dataAccess/master');

exports.macTest = function (req, data) {
    var decoded = data.user.USER_INFO_ID;
    var x = parseInt(decoded)
    let query = 'CALL MBSDEVT_SCHEMA.MBS_UPDATE_USER_AUTH(?,?,?,?)';
    //MBSDEVT_SCHEMA.MBS_UPDATE_USER_AUTH

    var p_ID = { ParamType: "INPUT", DataType: "INTEGER", Data: decoded };
    var p_MACCADDRESS = { ParamType: "INPUT", DataType: "VARCHAR(200)", Data: req.body.macaddress };
    var p_rvalue = { ParamType: "OUTPUT", DataType: "INTEGER", Data: 00 };
    var p_message = { ParamType: "OUTPUT", DataType: "VARCHAR(200)", Data: "0", Length: 30 };

    var parameter = [p_ID, p_MACCADDRESS, p_rvalue, p_message];

    dbService.prepareSyncZ(parameter, query, function (err, data) {
        if (err) {
            //callback(err);
            console.log(err);
        } else {
            //console.log(data);
            // callback(data);
        }
    });

}