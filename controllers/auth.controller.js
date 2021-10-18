const {userNormalizator} = require('../util/user.util');
const O_Auth = require('../dataBase/O_Auth');
const userUtil = require("../util/user.util");
const tokenType = require("../configs/token-type");
const { jwtService } = require("../service");
module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user} =req;

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

           const refreshPair = await O_Auth.findByIdAndUpdate({user_id:newUser._id},
            {...tokenPair});

            res.json(refreshPair);
        } catch (e) {
            res.json(e.message);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { user } = req;

            await O_Auth.deleteOne({user_id: user._id});

            res.json('You are logged out');

        } catch (error) {
            next(error)
        }
    },
};
