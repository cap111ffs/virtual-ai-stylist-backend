const router = require('express').Router()
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const smsaerov2 = require('smsaero-v2')
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

    const client = new smsaerov2.Client(
      'cap111ffsinho@gmail.com',
      'NEFI_F6sufBEqm7fSfcDTbPzgQL5S4cf',
      { timeout: 10 },
    )
    ;(async function () {
      const res = await client.send(
        new smsaerov2.Message({
          sign: 'SMS Aero',
          number: '79829258384', // num or [num1, num2, ...numN]
          text: 'Test message',
        }),
      )
      console.log(res)
    })()
    res.status(200).json(currentUser)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
