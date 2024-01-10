const router = require("express").Router();
const { register, login, refreshToken, getCurrent, logout, forgotPassword, resetPassword } = require("../controllers/user.ctrl")
const { authenticate } = require("../middlewares/authenticate")
router
    .post("/register", register)
    .post('/login', login)
    .get('/me', authenticate, getCurrent)
    .post("/logout", authenticate, logout)
    .post("/refresh-token", refreshToken)
    .post("/forgot-password", forgotPassword)
    .post("/reset-password", resetPassword)
module.exports = router