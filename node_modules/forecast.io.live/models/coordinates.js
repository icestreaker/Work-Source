var Joi = require('joi');
var lang = require('../lang');

var coordinates = Joi.object().keys({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    lang: Joi.any().valid(lang)
});

module.exports = coordinates;