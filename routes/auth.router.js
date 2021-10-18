const authRouter = require('express').Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

authRouter.post('/login', userMiddleware.isAuthBodyValid, userMiddleware.checkLoginMiddleware, authController.loginUser);

module.exports = authRouter;
