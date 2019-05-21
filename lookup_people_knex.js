const settings = require("./settings"); // settings.json

const knex = require('knex')({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
      },
    searchPath: ['knex', 'public'],
  });


knex.select().from('famous_people')
    .asCallback(function(err, rows) {
        let query = process.argv[2];
        let counter = 0;
        let list = 1;
        if (err) return console.error(err);
        console.log("Searching...")
        
        // to provide counter number
        for (let i = 0; i < rows.length; i ++) {
            if (rows[i].first_name === query) {
                counter ++
            }
        }
        // to find name matches
        console.log(`Found ${counter} person(s) by the name '${query}':`)
        for (let i = 0; i < rows.length; i ++) {
            if (rows[i].first_name === query) {
                console.log(`- ${list}: ${rows[i].first_name} ${rows[i].last_name}, born '${rows[i].birthdate}'`)
                counter ++
                list ++
            }
        }
    })
    .finally(function() {
        knex.destroy();
    })