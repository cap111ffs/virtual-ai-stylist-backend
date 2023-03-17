const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true,
    },
    passWord: {
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