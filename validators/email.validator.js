const Joi = require('joi');

const {constants} = require('../configs');

const mailValidator = Joi.object({
    email: Joi
        .string()
        .regex(constants.EMAIL_REGEXP)
        .required(),
});

module.exports = {mailValidator};
