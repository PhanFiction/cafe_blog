const userDB = require('../db/userDB');

exports.updateUserInfo = async (req, res) => {
  const userId = req.params.id;
  const userInfo = req.body;

  try {
    const updatedUser = await userDB.updateUser(userId, userInfo);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userDB.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};