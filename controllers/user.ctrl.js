const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto-js")
const register = asyncHandler(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) return res.status(400).json({
        status: Fail,
        message: "Missing Input"
    })
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
        return next(new Error(`This email ${email} is already exists`));
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        status: "Success",
        response
    })
});

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new Error("Please provide both email and password"));
    const existedEmail = await User.findOne({ email });
    if (!existedEmail) {
        return next(new Error(`This ${email} is not exist`));
    } else {
        if (!(await existedEmail.isMatch(password))) {
            next(new Error("Password is not match"));
        } else {
            const { password, role, ...userData } = existedEmail.toObject()
            const payload = { _id: existedEmail._id, role: existedEmail.role }
            const access_token = generateAccessToken(payload);
            const refresh_token = generateRefreshToken(payload);
            await User.findOneAndUpdate({ _id: existedEmail._id }, {
                refreshToken: refresh_token
            }, { new: true })
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                status: "Login Successfully",
                userData,
                access_token
            })
        }
    }
})

const refreshToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie.refresh_token) return next(new Error("Do not have refresh token"));
    jwt.verify(cookie.refresh_token, process.env.SECRET_JWT_REFRESH_TOKEN, function (err, decoded) {
        if (err) return next(new Error("Refresh Token expired!"));
    })
    const user = await User.findOne({
        refreshToken: cookie.refresh_token
    })
    if (!user) return next(new Error("Refresh token not exists"));
    const payload = { _id: user._id, role: user.role }
    const access_token = generateAccessToken(payload, process.env.EXPIRED_JWT_ACCESS_TOKEN);
    return res.status(200).json({
        access_token
    })
})

const getCurrent = asyncHandler(async (req, res, next) => {
    if (!req.user) return next(new Error("authentication error"));
    return res.status(200).json({
        user: req.user
    })
});

const logout = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie || !cookie.refresh_token) return next(new Error("No refresh token in cookie"));
    await User.findByIdAndUpdate(req.user._id, { refreshToken: " " }, { new: true })
    res.clearCookie("refresh_token");
    req.user = null
    return res.status(200).json({
        message: "Logout successfully!",
    })
})
module.exports = {
    register,
    login,
    refreshToken,
    getCurrent,
    logout
}