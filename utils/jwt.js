const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_JWT_ACCESS_TOKEN, {
        expiresIn: process.env.EXPIRED_JWT_ACCESS_TOKEN
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_JWT_REFRESH_TOKEN, {
        expiresIn: process.env.EXPIRED_JWT_REFRESH_TOKEN
    })
}

const verifyRefreshToken = (token) => {
    return jwt.ve
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}