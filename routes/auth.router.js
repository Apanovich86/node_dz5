const authRouter = require('express').Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

authRouter.post('/login', userMiddleware.isAuthBodyValid, userMiddleware.checkLoginMiddleware, authController.loginUser);
authRouter.post('/logout', userMiddleware.checkAccessToken, authController.logout);
authRouter.post('/refresh', userMiddleware.checkRefreshToken, authController.loginUser);


module.exports = authRouter;
