const userDB = require('../db/userDB');

// Logout user and destroy session
exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid'); // removes cookie from browser
      res.json({ success: true, message: "Successfully logged out" });
    });
  });
};

// Sign up a new user
exports.signUp = async (req, res) => {
  try {
    const user = await userDB.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}

// Check if user is authenticated
exports.checkAuthentication = (req, res) => {
  req.userId = req['user'].id;
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "User is authenticated" });
  }
  res.status(401).json({ message: "User is not authenticated" });
};
