const jwt = require('jsonwebtoken');

const tokenTypeEnum = require('../configs/token-type');
const {ACTION_ACCOUNT, FORGOT_PASSWORD} = require('../configs/token-type');
const {WRONG_TOKEN_TYPE, INVALID_TOKEN} = require('../errors/custom.errors');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACTION_ACCOUNT, JWT_FORGOT_PASSWORD} = require('../configs/config');
const {ErrorHandler} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, 'JWT_ACCESS_SECRET', {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    createActionToken: (tokenType) => {
        let secretWord;

        switch (tokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_FORGOT_PASSWORD;
                break;
            case ACTION_ACCOUNT:
                secretWord = JWT_ACTION_ACCOUNT;
                break;
            default:
                throw new ErrorHandler(WRONG_TOKEN_TYPE.message, WRONG_TOKEN_TYPE.status);
        }

        return jwt.sign({}, secretWord, {expiresIn: '1d'});
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);

        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
        }
    },

};
