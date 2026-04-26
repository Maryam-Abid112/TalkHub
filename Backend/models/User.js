const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
            // Hashed password will be stored here
        },

        profilePic: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: "",
            maxlength: 120
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        verificationToken: {
            type: String,
            default: ""
        },

        verificationTokenExpires: {
            type: Date,
            default: null
        },

        lastSeen: {
            type: Date,
            default: null
        },

        isOnline: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);