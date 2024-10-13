const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: "your-email@gmail.com", // Your email
    pass: "your-email-password", // Your email password
  },
});

// Send email alert
exports.sendEmailAlert = functions.https.onRequest((req, res) => {
  const {cryptoId, targetPrice, alertType, email} = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Crypto Price Alert Set",
    text: `You have set an alert for ${cryptoId}. ` +
    `The target price is $${targetPrice} ` +
    `and the alert type is '${alertType}'.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent:", info.response);
    return res.status(200).send("Alert set successfully");
  });
});
