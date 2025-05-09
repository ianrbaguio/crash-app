const { readFileSync } = require("fs");
const { Client } = require("pg");

// --- MODIFIED LINE ---
// Changed the path to point correctly from the root directory
const query = readFileSync("crash/.data/scripts/crash-migration.sql", "utf-8");
// --- END MODIFIED LINE ---

const dbConfig = {
  user: "postgres",       // Make sure this is your actual user
  password: "postgres", // <-- IMPORTANT: Replace with your actual password
  host: "localhost",
  port: 5432,             // Ensure port is a number, not a string, if Client expects it
  database: "Crash",
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!"); // Updated log message

    client.query(query, (err, result) => {
      if (err) {
        console.error("Error executing migration script: ", err); // Use console.error for errors
      } else {
        console.log("Database migration script executed successfully.");
        // Optionally show some result info if needed, but often just confirmation is enough
        // console.log("Query result:", result.rows);
      }
      // End the client connection regardless of success or error in query
      client.end(() => {
        console.log("Disconnected from PostgreSQL database.");
      });
    });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database: ", err); // Use console.error for errors
    // Ensure client potentially ends even if connection fails (though it might not be necessary)
    client.end();
  });