const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
    if (err) {
    return console.error("Connection Error", err);
  }
  let query = process.argv[2];
  let counter = 0;
  list = 1;
  client.query("SELECT * FROM famous_people WHERE famous_people.first_name = $1", [query], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...")

    // to provide counter number
    for (let i = 0; i < result.rows.length; i ++) {
        if (result.rows[i].first_name = query) {
            counter ++
        }
    }

    // to find name matches
    console.log(`Found ${counter} person(s) by the name '${query}':`)
    for (let i = 0; i < result.rows.length; i ++) {
        if (result.rows[i].first_name = query) {
            console.log(`- ${list}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`)
            counter ++
            list ++
        }
    }
    client.end();
  });
});