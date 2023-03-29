import { Client, Message } from 'smsaero-v2';
import dotenv from 'dotenv';

dotenv.config();

const sendOtpMessage = async (phoneNumber, message) => {
  const client = new Client(process.env.SMSAERO_LOGIN_URL, process.env.SMSAERO_API_KEY);
  await client.send(
    new Message({
      sign: 'SMS Aero',
      number: phoneNumber,
      text: message,
    }),
  );
};

export default sendOtpMessage;
