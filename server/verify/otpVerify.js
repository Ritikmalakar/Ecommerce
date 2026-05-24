import nodemailer from "nodemailer";

export const sendOtpMail = async (otp, email) => {
  try {

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // mail options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    };

    // send mail
    await transporter.sendMail(mailOptions);

    console.log("OTP mail sent");

  } catch (error) {
    console.log(error);
  }
};