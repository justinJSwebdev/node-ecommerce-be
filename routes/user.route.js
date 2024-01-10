const router = require("express").Router();
const { register, login, refreshToken, getCurrent, logout } = require("../controllers/user.ctrl")
const { authenticate } = require("../middlewares/authenticate")
router
    .post("/register", register)
    .post('/login', login)
    .get('/me', authenticate, getCurrent)
    .post("/logout", authenticate, logout)
    .post("/refresh-token", refreshToken)
module.exports = router