const router = require('express').Router()
const User = require('../model/UserModel')
const dotenv = require('dotenv')
const sendOtpMessage = require('../utils/sendOtpMessage')
dotenv.config()

let userId
let otpCode

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })

    if (user) {
      const { _id, ...currentUser } = user._doc
      userId = _id

      otpCode = '54321' // here is generate code like otpCode = generateCode()

      sendOtpMessage(req.body.phoneNumber, otpCode)

      return res.status(200).json(currentUser)
    }

    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    })

    const { _doc: createdUser } = await newUser.save()
    const { _id, ...currentUser } = createdUser
    userId = _id

    otpCode = 'hell nahhh blud, wha u waffling bout' // here is generate code like otpCode = generateCode()

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
