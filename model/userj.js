const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("UserJ", UserSchema)