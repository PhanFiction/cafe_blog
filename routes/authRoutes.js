const router = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const middleware = require('../middleware/index');
const passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      // set user is authorized

      res.json({
        message: 'Logged in successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar_url
        }
      });
    });
  })(req, res, next);
});
router.post('/signup', authController.signUp);
router.put('/user', userController.updateUserInfo);
router.get('/user', userController.getUser);
router.get('/check_authentication', authController.checkAuthentication);
router.get('/logout', authController.logout);

module.exports = router;