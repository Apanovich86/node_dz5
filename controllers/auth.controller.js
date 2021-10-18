const {userNormalizator} = require('../util/user.util');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {user} =req;

            const userNormalized = userNormalizator(user.toObject());

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    }
};
