const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');

// Configurar el middleware de express-session
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una cadena secreta de tu elección
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

//configuracion EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('PORT', process.env.PORT || 3005)
app.set(express.v)
app.listen(app.get('PORT'), ()=>{
    console.log(`Server is running on PORT ${app.get('PORT')}`);
})

app.use('/', require('./routes/index'))
//app.use('/Dash', require('./routes/dashBoard'))

