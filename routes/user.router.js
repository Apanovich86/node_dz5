const router = require('express').Router();

const {userController} = require('../controllers');
const {fileMiddleware, userMiddleware} = require('../middlewares');
const {userRoles} = require('../configs');
const {createUserValidator, updateUserValidator} = require('../validators');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.checkUserById,
    userController.getUserById
);
router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(updateUserValidator),
    userMiddleware.checkAccessToken,
    userMiddleware.checkUserById,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userMiddleware.checkAccessToken,
    userMiddleware.checkUserById,
    userMiddleware.checkUserRoles([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    userController.deleteUser);

module.exports = router;
