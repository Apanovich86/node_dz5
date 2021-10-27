const { CORS_NOT_ALLOWED } = require('./constants');
const {ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT, NODE_ENV} = require('./config');

module.exports = {
    CORS_NOT_ALLOWED,

    ALLOWED_ORIGIN,
    MONGO_CONNECT_URL,
    PORT, NODE_ENV,

    config: require('./config'),
    constants: require('./constants'),
    userRoles: require('./user-rols.enum'),
    emailActions: require('./email-action.enum')
};
