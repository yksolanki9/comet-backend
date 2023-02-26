const express = require("express");
const router = express.Router();

router.use("/note", require("./note"));
router.use("/notes", require("./notes"));
router.use("/imagekit", require("./imagekit"));
router.use("/shared", require("./shared"));

module.exports = router;
