const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendAlertEmail(userEmail, productName, targetPrice, currentPrice, productUrl) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Price Drop Alert: ${productName}`,
    html: `
      <h2>Price Drop Detected!</h2>
      <p><b>${productName}</b> has dropped to <b>Rs.${currentPrice}</b></p>
      <p>Your target was: Rs.${targetPrice}</p>
      <a href="${productUrl}">Buy Now</a>
    `
  });
}

module.exports = { sendAlertEmail };