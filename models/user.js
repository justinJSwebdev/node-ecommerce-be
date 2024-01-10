const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require("crypto-js")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    cart: {
        type: Array,
        default: []
    },
    address: [
        { type: mongoose.Schema.ObjectId, ref: 'Address' }
    ],
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    passwordChangeAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpired: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods = {
    isMatch: async function (password) {
        console.log(password)
        console.log(this.password)
        return await bcrypt.compare(password, this.password)
    },
    resetTokenGenerate: function () {
        const resetTokenString = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);
        this.passwordResetToken = crypto.SHA256(resetTokenString).toString(crypto.enc.Hex);
        this.passwordResetExpired = Date.now() + 15 * 60 * 1000;
        return resetTokenString;
    }
}


//Export the model
module.exports = mongoose.model('User', userSchema);