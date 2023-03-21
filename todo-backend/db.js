"use strict";
// Database setup 

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect().then(res => {
  console.log("Connected to database");
}).catch(err => {
  console.log("Error connecting to database", err);
});



module.exports = db;