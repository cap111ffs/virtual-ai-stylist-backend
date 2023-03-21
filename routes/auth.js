const router = require('express').Router()
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.passWord, salt)

    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      passWord: hashedPass,
      profilePic: req.body.profilePic,
    })

    const { _doc: user } = await newUser.save()
    const { _id, ...currentUser } = user
    currentUser.id = _id

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })

    !user && res.status(400).json('No user!')

    const validate = bcrypt.compare(req.body.passWord, user.passWord)

    !validate && res.status(400).json('Wrong Credentials!')

    const { _id, ...currentUser } = user._doc
    currentUser.id = _id

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
