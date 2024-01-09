const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
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
            req.user = userData;
            res.status(200).json({
                status: "Login Successfully",
                userData
            })
            next();
        }
    }
})
module.exports = {
    register,
    login
}