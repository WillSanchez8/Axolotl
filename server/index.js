require('dotenv').config();
var app = require('./app');
var port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Servidor corriendo el puerto ' + port);
});    