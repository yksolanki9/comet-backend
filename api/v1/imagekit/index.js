const express = require("express");
const verifyToken = require("../../../middleware/auth");
const router = express.Router();

const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

//TODO: Map images to notes
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = await imagekit.upload({
      file: req.body.base64,
      fileName: req.body.fileName,
    });
    console.log("DATA iS", data);
    res.status(201).send({
      message: "Image uploaded successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "Image Upload failed",
      error: err,
    });
  }
});

module.exports = router;
