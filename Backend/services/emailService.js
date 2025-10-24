const axios = require("axios");
require("dotenv").config();

const sendFeedbackEmail = async ({ name, email, message }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name, email },
        to: [{ email: process.env.ADMIN_EMAIL }],
        subject: "New Feedback from Customer",
        htmlContent: `<p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Message:</strong> ${message}</p>`
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );
    return { success: true };
  } catch (err) {
    console.error("Email sending failed:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendFeedbackEmail };
