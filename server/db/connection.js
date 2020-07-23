const monk = require('monk');
const connectionURL = 'localhost/fletch-sh';

const db = monk(connectionURL, ()=> {
    console.log(`db listening at ${connectionURL}`);
});

module.exports = db;