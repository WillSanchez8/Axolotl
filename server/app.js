'use-strict'
const cors = require('cors');
var express = require('express');

var app = express();
app.use(cors());

var api_routes = require('./routes/PexelsRuta');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//rutas base
app.use('/api', api_routes);

module.exports = app;