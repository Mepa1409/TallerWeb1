
const fs = require('fs');

const jsonString = fs.readFileSync('./data/userAdmin.json', 'utf-8');

const jsonObject = JSON.parse(jsonString);
//console.log(jsonObject)
const userAdmin = new Map(Object.entries(jsonObject["administrator"]));
//console.log(userAdmin)

module.exports.user = userAdmin


