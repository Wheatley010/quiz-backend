// SendGrid API для отправки писем
export const sendEmail = async (to, subject, html) => {
  try {
    console.log(`[Email Service] Sending email to: ${to}, subject: ${subject}`);
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
          },
        ],
        from: {
          email: process.env.ADMIN_EMAIL || 'noreply@quiz-app.com',
          name: 'Quiz App',
        },
        subject,
        content: [
          {
            type: 'text/html',
            value: html,
          },
        ],
      }),
    });

    const responseBody = await response.text();
    
    console.log(`[Email Service] SendGrid response status: ${response.status}`);
    if (responseBody) {
      console.log(`[Email Service] SendGrid response body:`, responseBody);
    }

    // SendGrid returns 202 Accepted for successful requests
    if (response.status === 202 || response.status === 200) {
      console.log(`✓ Email sent successfully to: ${to}`);
      return { success: true };
    } else {
      throw new Error(`SendGrid API error: ${response.status} - ${responseBody}`);
    }
  } catch (error) {
    console.error(`✗ Email error for recipient ${to}:`, error.message);
    throw error;
  }
};
