const router = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const middleware = require('../middleware/index');
const passport = require('passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/authentication',
  failureRedirect: '/login',
  failureFlash: true
}));
router.post('/signup', authController.signUp);
router.put('/user', middleware.extractToken, userController.updateUserInfo);
router.get('/user', middleware.extractToken, userController.getUser);
router.get('/authentication', authController.checkAuthentication);
router.get('/logout', authController.logout);

module.exports = router;