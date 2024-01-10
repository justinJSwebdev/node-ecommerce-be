const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const authenticate = asyncHandler(async (req, res, next) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer") && req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(new Error("Invalid token"))
    }
    jwt.verify(token, process.env.SECRET_JWT_ACCESS_TOKEN, function (err, decoded) {
        if (err) return next(new Error("ACCESS TOKEN Expired"))
        req.user = decoded
    })
    next();
});

module.exports = {
    authenticate
}