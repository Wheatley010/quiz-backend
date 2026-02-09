import { sendEmail } from '../config/mail.js';

// Письмо при регистрации
export const sendWelcomeEmail = async (email, username) => {
  const subject = 'Welcome to Quiz App!';
  const html = `
    <h2>Welcome, ${username}!</h2>
    <p>Thank you for registering on our Quiz App.</p>
    <p>Now you can:</p>
    <ul>
      <li>Create your own quizzes</li>
      <li>Take quizzes created by other users</li>
      <li>Track your results</li>
    </ul>
    <p>Best regards,<br>Quiz App Team</p>
  `;
  
  await sendEmail(email, subject, html);
};

// Письмо при смене пароля
export const sendPasswordChangeEmail = async (email, username) => {
  const subject = 'Password Changed Successfully';
  const html = `
    <h2>Password Change Confirmation</h2>
    <p>Hi ${username},</p>
    <p>Your password has been changed successfully.</p>
    <p>If you did not make this change, please contact support immediately.</p>
    <p>Best regards,<br>Quiz App Team</p>
  `;
  
  await sendEmail(email, subject, html);
};
