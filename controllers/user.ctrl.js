const User = require("../models/user")
const asyncHandler = require("express-async-handler")

const register = asyncHandler(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) return res.status(400).json({
        status: Fail,
        message: "Missing Input"
    })
    const response = await User.create(req.body)
    return res.status(200).json({
        status:"Success",
        response 
    })
});


module.exports = {
    register
}