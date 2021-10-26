const Joi = require('joi');

const {constants} = require('../configs');

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
});

module.exports = {passwordValidator};
