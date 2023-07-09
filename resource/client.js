
const fs = require('fs');

const jsonString = fs.readFileSync('./data/customer.json', 'utf-8');

const jsonObject = JSON.parse(jsonString);
//console.log(jsonObject)
const client = new Map(Object.entries(jsonObject["customer"]));
console.log(client)

// Convertir el objeto 'data' en una cadena JSON
//const updatedJsonContent = JSON.stringify(client, null, 2);

 // Escribir el contenido actualizado en el archivo JSON
//fs.writeFileSync('./data/customer.json', updatedJsonContent, 'utf8');
 

module.exports.client = client

