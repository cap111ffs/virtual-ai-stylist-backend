const router = require('express').Router()
const User = require('../model/UserModel')
const dotenv = require('dotenv')
const sendOtpMessage = require('../utils/sendOtpMessage')
dotenv.config()

let userId
let otpCode

router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    })

    const { _doc: user } = await newUser.save()
    const { _id, ...currentUser } = user
    userId = _id

    otpCode = 'hell nahhh blud, what u waffling bout' // here is generate code like generateCode()

    sendOtpMessage(req.body.phoneNumber, otpCode)

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })

    !user && res.status(400).json('No user!')

    const { _id, ...currentUser } = user._doc
    userId = _id

    otpCode = '54321' // here is generate code like generateCode()

    sendOtpMessage(req.body.phoneNumber, otpCode)

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/verify', async (req, res) => {
  try {
    if (req.body.code === otpCode) {
      res.status(200).json({ userId })
    } else {
      throw new Error('Invalid code')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
