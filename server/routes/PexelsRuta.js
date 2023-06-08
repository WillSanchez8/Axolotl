const express = require('express');
const APIControl = require('../controller/PexelsControl');

const api = express.Router();

api.get('/pexels/:query', APIControl.getPexelsImages);
api.get('/pexels/labels', APIControl.getPexelsImagesWithLabels);

module.exports = api;
