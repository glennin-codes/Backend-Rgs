import Mailgen from "mailgen";

export const sendCredentials = (name, email, pwd) => {
  // Initialize Mailgen
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'RGS',
      link: 'https://rgsdashboard.netlify.app/',
    },
  });

  // Generate the email content
  const emailContent = {
    body: {
      name: name,
      intro: 'Welcome to Rgs, we are excited to have you on board! Here are your login details:',
      table: {
        data: [
          {
            key: 'Username:',
            value: email,
          },
          {
            key: 'Password:',
            value: pwd,
          },
        ],
      },
      action: {
        instructions: `
          Please log in within the next 2 hours or else your credentials will be revoked from our system.
          You can change your password later in your account settings.
          Please do not share your login details with anyone.
        `,
        button: {
          color: '#22BC66',
          text: 'Log In',
          link: 'https://rgsdashboard.netlify.app/',
        },
      },
      outro: 'If you have any questions, feel free to reply to this email.',
    },
  };
  const emailBody = mailGenerator.generate(emailContent);
  return emailBody;
};
