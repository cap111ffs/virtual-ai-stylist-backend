import smsaerov2 from 'smsaero-v2';

const sendOtpMessage = async (phoneNumber, message) => {
  const client = new smsaerov2.Client(process.env.SMSAERO_LOGIN_URL, process.env.SMSAERO_API_KEY);
  const res = await client.send(
    new smsaerov2.Message({
      sign: 'SMS Aero',
      number: phoneNumber,
      text: message,
    }),
  );
};

export default sendOtpMessage;
