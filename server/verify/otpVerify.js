import nodemailer from "nodemailer";

export const sendOtpMail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<h1>${otp}</h1>`
    });

    console.log("Mail sent");
  } catch (error) {
    console.log("Mail Error:", error);
  }
};