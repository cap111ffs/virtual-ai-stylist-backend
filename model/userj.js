const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
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
        require: false,
    },
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("UserJ", UserSchema)