const router = require('express').Router()

const User = require('../model/UserModel')
const OtpCode = require('../model/OtpCodeModel')

const sendOtpMessage = require('../utils/sendOtpMessage')
const generateRandomOtpCode = require('../utils/generateOtpCode')
const deleteCurrentOtpCode = require('../utils/deleteCurrentOtpCode')

const dotenv = require('dotenv')
dotenv.config()

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })

    const otpCode = generateRandomOtpCode(5)

    if (user) {
      const { _id, ...currentUser } = user._doc

      const newOtpCode = await new OtpCode({
        code: otpCode,
        phoneNumber: currentUser.phoneNumber,
        id: _id,
      }).save()
      deleteCurrentOtpCode(_id, 240)

      sendOtpMessage(currentUser.phoneNumber, otpCode)

      return res.status(200).json(currentUser)
    }

    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    })

    const { _doc: createdUser } = await newUser.save()
    const { _id, ...currentUser } = createdUser

    const newOtpCode = await new OtpCode({
      code: otpCode,
      phoneNumber: currentUser.phoneNumber,
      id: _id,
    }).save()
    deleteCurrentOtpCode(_id, 240)

    sendOtpMessage(currentUser.phoneNumber, otpCode)

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/verify', async (req, res) => {
  try {
    const otpCode = await OtpCode.findOne({ phoneNumber: req.body.phoneNumber })

    if (req.body.code === otpCode.code) {
      return res.status(200).json({ id: otpCode.id })
    }

    throw new Error('Invalid code')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
