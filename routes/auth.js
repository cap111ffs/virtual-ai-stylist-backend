const router = require("express").Router()
const User = require("../model/userj")
const bcrypt = require("bcrypt")


router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.passWord, salt)

        const newUser = new User({
            userName: req.body.userName,
            phoneNumber: req.body.phoneNumber,
            passWord: hashedPass,
        })

        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ userName:req.body.userName })

        !user && res.status(400).json("No user!") 
        
        const validate = await bcrypt.compare(req.body.passWord, user.passWord)

        !validate && res.status(400).json("Wrong Credentials!")

        const { passWord, ...other } = user._doc

        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }

})
module.exports = router