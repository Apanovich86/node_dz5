const Joi = require('joi');

const {constants} = require('../configs');

const authValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .trim()
        .required(),

    password: Joi
        .string()
        .regex(constants.PASSWORD_REGEXP)
        .required(),
});

module.exports = {authValidator};
