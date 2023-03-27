import User from '../model/UserModel.js'
import dotenv from 'dotenv'
import sendOtpMessage from '../utils/sendOtpMessage.js'
import generateRandomOtpCode from '../utils/generateOtpCode.js'
import OtpCode from '../model/OtpCodeModel.js'
dotenv.config()
import Router from 'express'
const router = new Router()

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })

    if (user) {
      const { _id, ...currentUser } = user._doc
      const otpCode = generateRandomOtpCode(5)
      const newOtpCode = new OtpCode({
        code: generateRandomOtpCode(5),
        phoneNumber: req.body.phoneNumber,
        id: _id,
      })
      const { _doc: createdOtpCode } = await newOtpCode.save()
      sendOtpMessage(req.body.phoneNumber, otpCode)
      return res.status(200).json(currentUser)
    }
    const otpCode = generateRandomOtpCode(5)
    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    })
    const { _doc: createdUser } = await newUser.save()
    const { _id, ...currentUser } = createdUser
    const newOtpCode = new OtpCode({
      code: generateRandomOtpCode(5),
      phoneNumber: req.body.phoneNumber,
      id: _id,
    })
    const { _doc: createdOtpCode } = await newOtpCode.save()
    sendOtpMessage(req.body.phoneNumber, otpCode)

    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/verify', async (req, res) => {
  try {
    const otpCode = await OtpCode.findOne({ phoneNumber: req.body.phoneNumber })
    if (req.body.code === otpCode) {
      res.status(200).json({ code: req.body.code })
    } else {
      throw new Error('Invalid code')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// module.exports = router

export default router
