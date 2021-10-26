const {userNormalizator} = require('../util/user.util');
const {O_Auth, User} = require('../dataBase');
const userUtil = require('../util/user.util');
const {ErrorHandler, errors} = require('../errors/ErrorHandler');
const {jwtService, emailService, passwordService} = require('../service');
const ActionToken = require('../dataBase/ActionToken');
const ActionTokenTypeEnum = require('../configs/token-type');
const EmailActionEnum = require('../configs/email-action.enum');
const {URL_FROM_FRONT_END, PASSWORD_FORGOT_URL, NEW_PASSWORD} = require('../configs');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user} = req;

            await user.comparePassword(req.body.password);

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user.toObject());

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const newUser = userUtil.userNormalizator(user);

            const refreshPair = await O_Auth.findByIdAndUpdate({user_id: newUser._id},
                {...tokenPair});

            res.json(refreshPair);
        } catch (e) {
            res.json(e.message);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user} = req;

            await O_Auth.deleteOne({user_id: user._id});

            res.json('You are logged out');

        } catch (error) {
            next(error);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
            }

            const actionToken = jwtService.createActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: ActionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: URL_FROM_FRONT_END + PASSWORD_FORGOT_URL + '?token=' + actionToken});

            res.json('Ok');

        } catch (error) {
            next(error);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {_id, email, name} = req.user;

            const hashedPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(_id, {password: hashedPassword});

            await emailService.sendMail(email, NEW_PASSWORD, {userName: name, password});

            await O_Auth.deleteMany({user_id: _id});

            res.json('Good');

        } catch (error) {
            next(error);
        }
    },
};
