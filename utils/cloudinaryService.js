const config = require('../config/index');

// Default image size
const transformation = {
  width: 500, 
  height: 400,
  crop: "scale",
};

/**
 * Uploads an image to Cloudinary with an optional folder path.
 * 
 * @param {string} imgURL - The URL of the image to be uploaded.
 * @param {string} folderName - The folder name where the image will be stored.
 *                              Accepted values: "profile" or "posts".
 * @returns {Object} - The result of the Cloudinary upload operation.
 */
exports.uploadBlogImg = async (imgURL) => {
  const imgResult = await config.cloudinaryService.uploader.upload(imgURL, {
    folder: '/cafeBlog/posts',
    transformation,
  });
  return imgResult;
}

/**
 * Uploads an image to Cloudinary with an optional folder path.
 * 
 * @param {string} imgURL - The URL of the image to be uploaded.
 * @param {string} folderName - The folder name where the image will be stored.
 *                              Accepted values: "profile" or "posts".
 * @returns {Object} - The result of the Cloudinary upload operation.
 */
exports.uploadProfileImg = async (imgURL) => {
  const imgResult = await config.cloudinaryService.uploader.upload(imgURL, {
    folder: '/cafeBlog/profile',
    transformation,
  });
  return imgResult;
}

exports.deleteImg = async(imgId, folderName) => {
  const folderPath = folderName === 'profile' ? profilePath: blogPath;
  await config.cloudinaryService.uploader.destroy(`${folderPath}/${imgId}`);
}