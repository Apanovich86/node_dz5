const {UPDATE_USER, DELETE_USER} = require('../configs');
const {User, O_Auth, ActionToken} = require('../dataBase');
const {emailService, passwordService, jwtService, userService} = require('../service');
const userUtil = require('../util/user.util');
const emailTemplatesEnum = require('../configs/email-action.enum');
const {ACTIVATE_USER_TOKEN} = require('../configs/token-type');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normUsers = users.map(value => userUtil.userNormalizator(value));

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            User.testStatic(222);

            const normUsers = userUtil.userNormalizator(user);

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const actionToken = jwtService.createActionToken();

            await ActionToken.create({action_token: actionToken, type: ACTIVATE_USER_TOKEN, user_id: newUser._id});

            await emailService(newUser.email, emailTemplatesEnum.WELCOME, {
                userName: newUser.email,
                token: actionToken
            });

            const normUser = userUtil.userNormalizator(newUser.toObject());

            res.json(normUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            const updateUser = await User.findByIdAndUpdate(user_id, {name}, {new: true});

            await emailService.sendMail(req.body.email, UPDATE_USER, { userName: name });

            const normUsers = userUtil.userNormalizator(updateUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const delUser = await User.deleteOne({ _id: user_id });

            await O_Auth.deleteMany({user_id: user._id});

            await emailService.sendMail(req.body.email, DELETE_USER, { userName: name });

            const normUsers = userUtil.userNormalizator(delUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    }
};
