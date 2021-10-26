const authRouter = require('express').Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const actionTokenTypes = require('../configs/token-type');
const {emailValidator, passwordValidator} = require('../validators');

authRouter.post('/login', userMiddleware.isAuthBodyValid, userMiddleware.checkLoginMiddleware, authController.loginUser);
authRouter.post('/logout', userMiddleware.checkAccessToken, authController.logout);
authRouter.post('/refresh', userMiddleware.checkRefreshToken, authController.refresh);

authRouter.post('/password/forgot',
    userMiddleware.isUserBodyValid(emailValidator),
    authController.sendMailForgotPassword);

authRouter.put('/password/forgot',
    userMiddleware.isUserBodyValid(passwordValidator),
    userMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.setNewPasswordAfterForgot
);

module.exports = authRouter;
