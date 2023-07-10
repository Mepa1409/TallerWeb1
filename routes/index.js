const express = require('express');
const routes = express.Router()
const fs = require('fs');
const path = require('path');
const {user} = require('./../resource/user')
const {client} = require('./../resource/client')
const {addClient} = require('./../resource/client')
const {deleteCliente} = require('./../resource/client')
const {cars} = require('./../resource/cars')
const {addCars} = require('./../resource/cars')
const {deleteCar} = require("../resource/cars");
const filePath = path.join(__dirname, '..', 'data', 'customer.json');
const filePathCars = path.join(__dirname, '..', 'data', 'automovil.json');


routes.get('/', (req, res) => {
    res.render('index.ejs', {title: 'Login'})
})

routes.post('/dashBoard', (req, res) => {
    const {inputUser, inputPassword} = req.body

    for (const [key, value] of user) {
        // console.log(key, " ", value)
        const userFromMap = user.get(key).user
        const passwordFromMap = user.get(key).password
        // console.log(userFromMap, passwordFromMap)
        if (inputUser === userFromMap && inputPassword === passwordFromMap) {
            req.session.loggedIn = true
            return res.render('dashboard.ejs', {title: 'Dashboard'})

        }
    }
    return res.redirect('/')

})

routes.get('/dashBoard', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard.ejs', {title: 'Dashboard'})
    } else {
        res.redirect('/');
    }
});


routes.get('/newConsult', (req, res) => {
    if (req.session.loggedIn) {
        res.render('consult.ejs', {title: 'Pagina consulta'})
    } else {
        res.redirect('/')
    }
})

routes.get('/register', (req, res) => {
    if (req.session.loggedIn === true) {
        res.render('register.ejs', {title: 'Pagina Registro'})
    } else {
        res.redirect('/')
    }

})

routes.get('/logOut', (req, res) => {
    if (req.session.loggedIn === true) {
        req.session.loggedIn = false
        return res.redirect('/')
    }
})

routes.get('/clients', (req, res) => {
    if (req.session.loggedIn) {
        res.render('clients.ejs', {title: 'Lista De Clientes', data: client})
    } else {
        res.redirect('/')
    }
})


routes.get('/cars', (req, res) => {
    if (req.session.loggedIn) {
        res.render('cars.ejs', {title: 'Lista De Autos', data: cars})
    } else {
        res.redirect('/')
    }
})


routes.post('/registerClient', (req, res) => {
    const {InputId, InputName, InputLastName, InputPhone, InputAdress} = req.body
    client.set(InputId, {'name': InputName, 'lastname': InputLastName, 'phone': InputPhone, 'address': InputAdress})
    addClient()

    if (req.session.loggedIn) {
        res.redirect('/dashBoard')
    } else {
        res.redirect('/')
    }
})
routes.post('/registerCar', (req, res) => {
    const {InputIdCar, InputBrand, InputValue, InputColor, InputModel} = req.body
    cars.set(InputIdCar, {'brand': InputBrand, 'value': InputValue, 'color': InputColor, 'model': InputModel})
    addCars()

   if (req.session.loggedIn) {
        res.redirect('/dashBoard')
    } else {
        res.redirect('/')
    }
})


routes.get('/consult1', (req, res) => {
    if (req.session.loggedIn) {
        res.render('consult1.ejs', {title: 'Buscar Cliente', data: client});
    } else {
        res.redirect('/');
    }
});

routes.get('/consultCar', (req, res) => {
    if (req.session.loggedIn) {
        res.render('consultCar.ejs', {title: 'Buscar Vehiculo', data: cars});
    } else {
        res.redirect('/');
    }
});

routes.post('/newConsult', (req, res) => {
    if (req.session.loggedIn) {
        const {searchId} = req.body;
        const jsonContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonContent);
        const customer = data.customer[searchId];

        if (customer) {
            res.render('consult1.ejs', {title: 'Buscar Cliente', data: customer, id: searchId});
        } else {
            res.render('consult1.ejs', {title: 'Buscar Cliente', error: 'Cliente no encontrado'});
        }
    } else {
        res.redirect('/');
    }
});

routes.post('/newConsultCar', (req, res) => {
    if (req.session.loggedIn) {
        const {searchIdCar} = req.body;
        const jsonContent = fs.readFileSync(filePathCars, 'utf8');
        const data = JSON.parse(jsonContent);
        const carss = data.cars[searchIdCar];

        if (carss) {
            res.render('consultCar.ejs', {title: 'Buscar Vehiculo', data: carss, id: searchIdCar});
        } else {
            res.render('consultCar.ejs', {title: 'Buscar Vehiculo', error: 'Vehiculo no encontrado'});
        }
    } else {
        res.redirect('/');
    }
});

routes.post('/deleteCustomer', (req, res) => {
    if (req.session.loggedIn) {
        const {idcliente} = req.body;
        console.log(idcliente)
        deleteCliente(idcliente)

        res.redirect('/newConsult');
    } else {
        res.redirect('/')
    }
})

routes.post('/deleteCar', (req, res) => {
    if (req.session.loggedIn) {
        const {idCar} = req.body;
        console.log("idcar :", idCar)
        deleteCar(idCar)

        res.redirect('/newConsult');
    } else {
        res.redirect('/')
    }
})

module.exports = routes