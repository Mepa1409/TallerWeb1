
const fs = require('fs');

const jsonString = fs.readFileSync('./data/automovil.json', 'utf-8');

const jsonObject = JSON.parse(jsonString);
//console.log(jsonObject)
const cars = new Map(Object.entries(jsonObject["cars"]));
//console.log(cars)

function addCars() {
    // Convertir el mapa actualizado a un objeto JSON
    const updatedObject = Object.fromEntries(cars);

    // Actualizar el objeto JSON original con el nuevo cliente
    jsonObject["cars"] = updatedObject;

    // Convertir el objeto JSON en una cadena JSON
    const updatedJsonContent = JSON.stringify(jsonObject, null, 2);

    // Escribir el contenido actualizado en el archivo JSON
    fs.writeFileSync('./data/automovil.json', updatedJsonContent, 'utf8');
}

function deleteCar(idCar) {
    if (cars.has(idCar)) {
        // Obtener el cliente y eliminarlo del mapa
        const customer = cars.get(idCar);
        cars.delete(idCar);

        // Convertir el mapa actualizado a un objeto JSON
        const updatedObject = Object.fromEntries(cars);

        // Actualizar el objeto JSON original con el mapa actualizado
        jsonObject["cars"] = updatedObject;

        // Convertir el objeto JSON en una cadena JSON
        const updatedJsonContent = JSON.stringify(jsonObject, null, 2);

        // Escribir el contenido actualizado en el archivo JSON
        fs.writeFileSync('./data/automovil.json', updatedJsonContent, 'utf8');

    }
}

module.exports.cars = cars
module.exports.addCars = addCars
module.exports.deleteCar = deleteCar

