const router = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const validateServices = require('../utils/validate');
const middleware = require('../middleware/authMiddleware');

router.post('/login', validateServices.validateLoginCredentials, authController.login);
router.post('/signup', validateServices.validateSignUpCredentials, authController.signUp);
router.put('/user', middleware.extractToken, userController.updateUserInfo);
router.get('/user', middleware.extractToken, userController.getUser);
router.get('/authentication', authController.checkAuthentication);
router.get('/logout', authController.logout);

module.exports = router;