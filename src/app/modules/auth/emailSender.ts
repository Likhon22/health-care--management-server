import nodemailer from "nodemailer";
import config from "../../config";

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string
) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"Healthcare Support" <${config.email.user}>`,
      to: email,
      subject: "Password Reset Request - Valid for 5 Minutes Only",
      text: `
      Password Reset Request
      
      You have requested to reset your password for your Healthcare account.
      
      Please use the following link to reset your password: ${resetLink}
      
      IMPORTANT: This link is valid for 5 minutes only.
      
      If you did not request this password reset, please ignore this email or contact support if you have concerns.
    `,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e9e9e9; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Healthcare account.</p>
        <p><strong style="color: #e74c3c;">This reset link will expire in 5 minutes.</strong></p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
        </div>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="background-color: #f8f9fa; padding: 10px; word-break: break-all; font-size: 14px;">${resetLink}</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e9e9e9; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">This is an automated message, please do not reply to this email.</p>
      </div>
    `,
    });

    console.log("Password reset email sent to %s", email);
    return info;
  } catch (err) {
    console.log(err);
  }
};

// Example usage (can be removed in production)
// sendPasswordResetEmail("user@example.com", "https://yourdomain.com/reset-password?token=abc123").catch(console.error);
