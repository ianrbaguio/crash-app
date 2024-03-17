const { readFileSync } = require("fs");
const { Client } = require("pg");

const query = readFileSync(".data/scripts/crash-migration.sql", "utf-8");

const dbConfig = {
  user: "postgres",
  password: "iTsuna10",
  host: "localhost",
  port: "5432",
  database: "Crash",
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

client
  .connect()
  .then(() => {
    console.log("Connected to local!");

    client.query(query, (err, result) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log("Query result:", result.rows);
        client.end();
      }
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
