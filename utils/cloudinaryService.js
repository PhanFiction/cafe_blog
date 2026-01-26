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
  try {
    const imgResult = await config.cloudinary.uploader.upload(imgURL, {
      folder: '/cafeBlog/posts',
      transformation,
    });
    return imgResult;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};

exports.uploadRecipeImg = async (imgURL) => {
  try {
    const imgResult = await config.cloudinary.uploader.upload(imgURL, {
      folder: '/cafeBlog/recipes',
      transformation,
    });
    return imgResult;
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
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
  const imgResult = await config.cloudinary.uploader.upload(imgURL, {
    folder: '/cafeBlog/profile',
    transformation,
  });
  return imgResult;
}

/* 
  * Deletes an image from Cloudinary by its public ID. 
*/
exports.deleteImg = async(imgId) => {
  await config.cloudinary.uploader.destroy(`${imgId}`);
}