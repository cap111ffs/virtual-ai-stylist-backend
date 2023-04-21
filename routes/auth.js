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

      new OtpCode({
        code: otpCode,
        phoneNumber: currentUser.phoneNumber,
        id: _id,
      }).save();
      deleteCurrentOtpCode(_id, 240);

      sendOtpMessage(currentUser.phoneNumber, otpCode);

      return res.status(200).json(currentUser);
    }

    const newUser = new User({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    });

    const { _doc: createdUser } = await newUser.save();
    const { _id, ...currentUser } = createdUser;
    new OtpCode({
      code: otpCode,
      phoneNumber: currentUser.phoneNumber,
      id: _id,
    }).save();
    deleteCurrentOtpCode(_id, 240);

    sendOtpMessage(currentUser.phoneNumber, otpCode);

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
