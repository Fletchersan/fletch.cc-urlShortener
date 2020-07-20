const monk = require('monk');
const connectionURL = process.env.MONGODB_URI || 'localhost/fletch-sh';

const db = monk(connectionURL, ()=> {
    console.log(`db listening at ${connectionURL}`);
});

module.exports = db;