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


let firstNameInput = process.argv[2];
let lastNameInput = process.argv[3];
let birthdateInput = process.argv[4];

knex('famous_people').insert([{
    first_name: firstNameInput,
    last_name: lastNameInput,
    birthdate: birthdateInput
}])
.asCallback(function(err, rows) {
    if (err) return console.error(err);
    knex('famous_people')
    .asCallback(function(err, rows) {
        if (err) return console.log(err);
        console.log(rows)
    })
    .finally(function() {
        knex.destroy();
    })
})