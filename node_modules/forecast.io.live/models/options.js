var Joi = require('joi');

var options = Joi.object().keys({
    timeInterval: Joi.number().integer().positive().required(),
    timeout: Joi.number().integer().positive().required()
});

module.exports = options;