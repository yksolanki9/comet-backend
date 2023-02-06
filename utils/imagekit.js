const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImages = async (images) => {
  try {
    const result = [];
    for (let image of images) {
      const res = await imagekit.upload({
        file: image.base64,
        fileName: image.name,
      });
      result.push(res);
    }
    return result;
  } catch (err) {
    return {
      err,
    };
  }
};

module.exports = { uploadImages };
