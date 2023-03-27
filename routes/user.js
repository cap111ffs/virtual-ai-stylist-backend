import User from '../model/UserModel.js'
import Post from '../model/PostModel.js'
import bcrypt from 'bcrypt'
import Router from 'express'
const router = new Router()

router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.passWord) {
      const salt = await bcrypt.genSalt(10)
      req.body.passWord = await bcrypt.hash(req.body.passWord, salt)
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        },
      )
      res.status(200).json(updateUser)
    } catch (error) {
      res.status(200).json(error)
    }
  } else {
    res.status(401).json('You can update your account')
  }
})

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({ userName: user.userName })
        await User.findByIdAndDelete(req.params.id)
        req.status(200).json('User has been delete...')
      } catch (error) {
        res.status(500).json(error)
      }
    } catch (error) {
      res.status(404).json('User not found...')
    }
  } else {
    res.status(401).json('Wrong credentials!')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { passWord, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(400).json(other)
  }
})

// module.exports = router
export default router
