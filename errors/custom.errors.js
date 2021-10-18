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

    INTERNAL_SERVER_ERROR: 500
};
