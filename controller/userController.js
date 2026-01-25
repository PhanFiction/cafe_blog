const userDB = require('../db/userDB');
const cloudinaryService = require('../utils/cloudinaryService');

// Update user information
exports.updateUserInfo = async (req, res) => {
  const userID = req.user.id;
  const userInfo = req.body;

  // Delete image from the database
  if (userInfo.img != null && userInfo.img === '') {
    const foundUser = await userDB.getUserById(userID);
    if (foundUser && foundUser.imgPublicId) {
      await cloudinaryService.deleteImg(foundUser.imgPublicId);
    }
    userInfo.img = null;
    userInfo.imgPublicId = null;
  }

  try {
    const updatedUser = await userDB.updateUser(userID, userInfo);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}

// Get user information by ID
exports.getUser = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

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
}