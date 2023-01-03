const express = require("express");
const verifyToken = require("../../../middleware/auth");
const router = express.Router();

const ImageKit = require("imagekit");
require("dotenv").config();

router.get("/", verifyToken, (req, res) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.send(authenticationParameters);
});

module.exports = router;
