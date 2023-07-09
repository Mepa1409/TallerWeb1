
const fs = require('fs');

const jsonString = fs.readFileSync('./data/automovil.json', 'utf-8');

const jsonObject = JSON.parse(jsonString);
//console.log(jsonObject)
const cars = new Map(Object.entries(jsonObject["cars"]));
//console.log(cars)

module.exports.cars = cars

