const express = require("express");
const router = express.Router();

router.use("/note", require("./note"));
router.use("/notes", require("./notes"));
router.use("/imagekit", require("./imagekit"));

module.exports = router;
