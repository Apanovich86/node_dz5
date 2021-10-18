const router = require('express').Router();

const {userController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {userRoles} = require('../configs');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid,
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
    userMiddleware.isUpdateUserValid,
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
