
const config = require("../config");
var ibmdb = require('ibm_db'),
    connStr = "DRIVER={DB2};DATABASE=MBSDEVT;HOSTNAME=localhost;PORT=50000;PROTOCOL=TCPIP;UID=DB2ADMIN;PWD=lenovo123";

var executeQuery = function (sp, res) {
    ibmdb.open(config.db2, function (err, conn) {

        if (err) return; console.log(err);
        conn.query(sp, function (err, data) {
            if (err) { console.log(err); }
            else { res(data); }
            conn.close(function () {
                console.log(sp);

            });
        });
    });
}


var executeNonQuery = function (userdata, sp, res) {
    ibmdb.open(config.db2, function (err, conn) {
        if (err) return; console.log(err); res(err);

        conn.prepareSync(sp, function (err, stmt) {
            console.log(sp)
            if (err) {
                console.log(err);
                return conn.closeSync();
                res(err);
            }
            //Bind and Execute the statement asynchronously
            stmt.executeSync(userdata, function (err, result, outparams) {
                if (err) {
                    console.log(err);
                    res(err);
                }
                else {
                    var data = result.fetchAllSync({ fetchmode: 7 });
                    console.log('gogo');
                    console.log(data);
                    res(outparams);
                    //close the stmt and connection;
                    result.closeSync();
                    stmt.closeSync();
                }
                conn.close(function (err) { res(err); console.log("err " + err); });
            });
        });
    });
}


var queryResults = function (userdata, sp, res) {
    ibmdb.open(config.db2, function (err, conn) {
        if (err) return; console.log(err); res(err);
        console.log(userdata, sp);
        conn.queryResult(sp, userdata, function (err, result, outparams) {
            if (err) {
                console.log(err);
                return conn.closeSync();
                res(err);
            } else {

                var datax = result.fetchAllSync();
                console.log(datax);
                console.log("data = ", result.fetchAllSync());
                console.log("meta = ", result.getColumnMetadataSync());
                result.closeSync();
                conn.closeSync();
                console.log("Executed ", +1, "times.");
            }
        });
    });
}


var executeSync = function (userdata, sp, res) {
    ibmdb.open(config.db2, function (err, conn) {
        if (err) { console.log(err); }
        var stmt = conn.prepareSync(sp);
        var result = stmt.executeSync(userdata);
        var data = result.fetchAllSync({ fetchmode: 4 });
        console.log(data);
        result.closeSync();
        stmt.closeSync();
    });
}

var prepareSyncZ = function (userdata, sp, res) {
    ibmdb.open(config.db2, function (err, conn) {
        if (err) { console.log(err); }
        var stmt = conn.prepareSync(sp);
       
        //Bind and Execute the statment asynchronously
        stmt.execute(userdata, function (err, result, outparams) {
           
            if (err) { console.log('error ng prepareSync ' + err); }
            else {
                data = result.fetchAllSync();
                //console.log('Outparams : ', outparams)
                // res(outparams);
                result.closeSync();
                stmt.closeSync();
            }
            //Close the connection
            conn.close(function (err) {
                if (err) { console.log(err); }
            });
        });
    });
}

var prepareSync = function (userdata, sp, res) {

    ibmdb.open(config.db2, function (err, conn) {
        if (err) { console.log(err); }
        var stmt = conn.prepareSync(sp);
        //Bind and Execute the statment asynchronously
        stmt.execute(userdata, function (err, result) {

            if (err) { console.log('error prepareSync ' + err); }
            else {
                data = result.fetchAllSync();
                res(data);
                result.closeSync();
                stmt.closeSync();
            }
            //Close the connection
            conn.close(function (err) {
                if (err) { console.log(err); }
            });
        });
    });
}

module.exports = {
    executeQuery,
    executeNonQuery,
    prepareSyncZ,
    prepareSync,
    queryResults,
    executeSync
}
