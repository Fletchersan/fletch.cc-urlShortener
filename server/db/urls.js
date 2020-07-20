const joi = require('@hapi/joi');

const db = require('./connection');

const urls = db.get('urls');
/*
    url: 'http://example.com',
    name: 'super-catchy'
*/

const schema = joi.object({
    name: joi.string().token().min(1).max(15).required(),
    url: joi.string().uri({
        scheme: [
            /https?/
        ]
    }).required()
}).with('name', 'url');

function create(almostFletch) {
    const {error, value} = schema.validate(almostFletch);
    console.log(value);
    console.log(error);
    if(error === undefined)
    {
        const url = urls.findOne({name: almostFletch.name});
        if(!url) {
            return urls.insert(almostFletch);
        } else {
            return Promise.reject({
                details: [{message: `Sorry short name already in use`}],
            })
        }
    } else {
        console.log('F at create in urls................');// ,error);
        return Promise.reject(error);
    }
}

function find(name) {
    return urls.findOne({name: name});
}

module.exports = {
    create,
    find
};