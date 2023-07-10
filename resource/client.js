
const fs = require('fs');

const jsonString = fs.readFileSync('./data/customer.json', 'utf-8');

const jsonObject = JSON.parse(jsonString);
//console.log(jsonObject)
const client = new Map(Object.entries(jsonObject["customer"]));
//console.log(client)

function addClient() {
 //console.log(client)
    // Convertir el mapa actualizado a un objeto JSON
    const updatedObject = Object.fromEntries(client);

    // Actualizar el objeto JSON original con el nuevo cliente
    jsonObject["customer"] = updatedObject;

    // Convertir el objeto JSON en una cadena JSON
    const updatedJsonContent = JSON.stringify(jsonObject, null, 2);

    // Escribir el contenido actualizado en el archivo JSON
    fs.writeFileSync('./data/customer.json', updatedJsonContent, 'utf8');

}

function deleteClient(idCliente) {

    if (client.has(idCliente)) {
        // Obtener el cliente y eliminarlo del mapa
        const customer = client.get(idCliente);
        client.delete(idCliente);

        // Convertir el mapa actualizado a un objeto JSON
        const updatedObject = Object.fromEntries(client);

        // Actualizar el objeto JSON original con el mapa actualizado
        jsonObject["customer"] = updatedObject;

        // Convertir el objeto JSON en una cadena JSON
        const updatedJsonContent = JSON.stringify(jsonObject, null, 2);

        // Escribir el contenido actualizado en el archivo JSON
        fs.writeFileSync('./data/customer.json', updatedJsonContent, 'utf8');

        // Devolver el cliente eliminado (opcional)
        //return customer;
    }
}




module.exports.client = client
module.exports.addClient = addClient
module.exports.deleteCliente = deleteClient


