import Router from 'express';

import User from '../model/UserModel.js';
import OtpCode from '../model/OtpCodeModel.js';

import generateRandomOtpCode from '../utils/generateOtpCode.js';
import sendOtpMessage from '../utils/sendOtpMessage.js';
import deleteCurrentOtpCode from '../utils/deleteCurrentOtpCode.js';

const router = new Router();

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });

    const otpCode = generateRandomOtpCode(5);

    if (user) {
      const { _id, ...currentUser } = user._doc;

      if (req.body.profilePic) {
        currentUser.profilePic = req.body.profilePic;
        await User.findByIdAndUpdate(_id, { profilePic: req.body.profilePic });
      }

      if (req.body.userName !== currentUser.userName) {
        currentUser.userName = req.body.userName;
        await User.findByIdAndUpdate(_id, { userName: req.body.userName });
      }

      await OtpCode.findOne({ id: _id }).deleteOne();

      new OtpCode({
        code: otpCode,
        phoneNumber: currentUser.phoneNumber,
        id: _id,
      }).save();
      sendOtpMessage(currentUser.phoneNumber, otpCode);

      deleteCurrentOtpCode(_id, 240);

      return res.status(200).json(currentUser);
    }

    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      profilePic: req.body.profilePic,
    });

    const { _doc: createdUser } = await newUser.save();
    const { _id, ...currentUser } = createdUser;

    new OtpCode({
      code: otpCode,
      phoneNumber: currentUser.phoneNumber,
      id: _id,
    }).save();
    sendOtpMessage(currentUser.phoneNumber, otpCode);

    deleteCurrentOtpCode(_id, 240);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post('/verify', async (req, res) => {
  try {
    const otpCode = await OtpCode.findOne({ phoneNumber: req.body.phoneNumber });

    if (req.body.code === otpCode.code) {
      deleteCurrentOtpCode(otpCode.id, 1);

      return res.status(200).json({ id: otpCode.id });
    }

    throw new Error('Invalid code');
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
