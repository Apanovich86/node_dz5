const User = require('../dataBase/User');
const {ErrorHandler, errors} = require('../errors');
const {authValidator, userValidator} = require('../validators/user.validator');

module.exports = {
    isAuthBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(errors.NOT_FOUND_ERR.message, errors.NOT_FOUND_ERR.code);
            }

            req.user = user;

            await compare(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new ErrorHandler(errors.RESOURCE_ALREADY_EXISTS.message, errors.RESOURCE_ALREADY_EXISTS.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const userById = await User.findById(user_id).lean();

            if (!userById) {
                throw new ErrorHandler(errors.NOT_FOUND_USER_BY_ID.message, errors.NOT_FOUND_USER_BY_ID.code);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoles: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(errors.FORBIDDEN_ERR.message, errors.FORBIDDEN_ERR.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
