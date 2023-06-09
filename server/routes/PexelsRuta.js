const express = require('express');
const APIControl = require('../controller/PexelsControl');

const api = express.Router();

api.get('/pexels/:query', APIControl.getPexelsImages);

module.exports = api;
