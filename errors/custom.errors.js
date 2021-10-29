module.exports = {
    NOT_FOUND_ERR: {
        message: 'Wrong email or password',
        code: 404
    },

    RESOURCE_ALREADY_EXISTS: {
        message: 'Email already exists',
        code: 400
    },

    FORBIDDEN_ERR: {
        message: 'Access denied',
        code: 403
    },

    NOT_VALID_BODY: {
        message: 'Wrong email or password',
        code: 400
    },

    NOT_FOUND_USER_BY_ID: {
        message: 'User with this id does not exist',
        code: 404
    },

    INVALID_TOKEN: {
        message: 'Invalid token',
        code: 401
    },

    WRONG_TEMPLATE_NAME: {
        message: 'Wrong template name',
        code: 400
    },

    USER_NOT_FOUND: {
        message: 'User not found',
        code: 404
    },

    WRONG_TOKEN_TYPE: {
        message: 'Wrong token type',
        code: 500
    },

    NOT_SUPPORTED_ERR: {
        message: 'Not supported format',
        code: 400
    },

    INTERNAL_SERVER_ERROR: 500
};
