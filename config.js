"use strict";

const assert = require("assert");
const dotenv = require("dotenv");

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const { PORT,
    HOST,
    HOST_URL,
    COOKIE_ENCRYPT_PWD,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    DB2_DRIVER,
    DB2_DATABASE,
    DB2_HOSTNAME,
    DB2_PORT,
    DB2_PROTOCOL,
    DB2_UID,
    DB2_PWD,
    X_SECRETKEY,
    X_ALGORITHM
    // OKTA_ORG_URL,
    // OKTA_CLIENT_ID,
    // OKTA_CLIENT_SECRET
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(COOKIE_ENCRYPT_PWD, "COOKIE_ENCRYPT_PWD configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(DB2_DATABASE, "DB2_DATABASE configuration is required.");
assert(DB2_HOSTNAME, "DB2_HOSTNAME configuration is required.");
assert(DB2_PORT, "DB2_PORT configuration is required.");
assert(DB2_PROTOCOL, "DB2_PROTOCOL configuration is required.");
assert(DB2_UID, "DB2_UID configuration is required.");
assert(DB2_PWD, "SQL_PASSWORD configuration is required.");
assert(X_SECRETKEY, "SECRETKEY configuration is required.");
assert(X_ALGORITHM, "ALGORITHM configuration is required.");
// assert(OKTA_ORG_URL, "OKTA_ORG_URL configuration is required.");
// assert(OKTA_CLIENT_ID, "OKTA_CLIENT_ID configuration is required.");
// assert(OKTA_CLIENT_SECRET, "OKTA_CLIENT_SECRET configuration is required.");

// export the configuration information
module.exports = {
    secretKey: X_SECRETKEY,
    algorithm: X_ALGORITHM,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    cookiePwd: COOKIE_ENCRYPT_PWD,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt
        }
    },
    db2: {
        DRIVER: DB2_DRIVER,
        DATABASE: DB2_DATABASE,
        HOSTNAME: DB2_HOSTNAME,
        PORT: DB2_PORT,
        PROTOCOL: DB2_PROTOCOL,
        UID: DB2_UID,
        PWD: DB2_PWD
    }

    // ,
    // okta: {
    //     url: OKTA_ORG_URL,
    //     clientId: OKTA_CLIENT_ID,
    //     clientSecret: OKTA_CLIENT_SECRET
    // }
};