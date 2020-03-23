var dbService = require('../dataAccess/master');


// View data
var getData = function (req, res, callback) {
    //Stored Procedure
    let query = 'CALL MBSDEVT_SCHEMA.USERS';
    console.log(query);
    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);

        } else {
            callback(data);
        }
    });
};

/// View Data by ID
var getDataById = function (decoded, req, res, callback) {
    let customerId = [req.body.id]; let status = req.query.status;
    var name = req.params.name;

    //Stored Procedure
    var query = "CALL MBS.MBS_GET_USER_INFO(?)";
    //Database Query
    console.log();
    var cn = [decoded];
    dbService.prepareSync(cn, query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};


var postData = function (req, res, callback) {
    let customerId = 0;
    if (isNaN(parseInt(req.body.customerId)))
        customerId = 0;
    else
        customerId = parseInt(req.body.customerId);
    //Stored Procedure
    var query = "[SaveCustomer] " + customerId + ", '" + req.body.customerName + "', '" + req.body.customerContact + "', '" + req.body.customerEmail + "'";
    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

// Delete Data
var deleteData = function (req, res, callback) {
    let customerId = req.params.id;
    //Stored Procedure
    var query = "[DeleteCustomersByID] " + parseInt(customerId) + "";
    //Database Query
    dbService.executeQuery(query, function (data, err) {
        if (err) {
            callback(null, err);
        } else {
            callback(data);
        }
    });
};

module.exports = {
    getData,
    getDataById,
    postData,
    deleteData
};