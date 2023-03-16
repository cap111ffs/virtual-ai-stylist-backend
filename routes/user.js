const router = require("express").Router()
const User = require("../model/userj")
const Post = require("../model/postj")
const bcrypt = require("bcrypt")

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            )
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(200).json(error)
        }
    } else {
        res.status(401).json("You can update your account")
    }
})



router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)
                req.status(200).json("User has been delete...")
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json("User not found...")
        }

    } else {
        res.status(401).json("Wrong credentials!")
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(400).json(other)
    }
})


module.exports = router