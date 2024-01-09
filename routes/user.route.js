const router = require("express").Router();
const { register } = require("../controllers/user.ctrl")
router.post("/register", register)

module.exports = router