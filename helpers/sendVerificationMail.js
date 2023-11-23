import sgMail from "@sendgrid/mail";

export const sendVerificationMail = async (userEmail, verificationToken) => {
  const baseURL = process.env.BASE_URL;
  const verificationURL = `${baseURL}/api/users/verify/${verificationToken}`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: userEmail,
    from: "sylwia.brusze@gmail.com",
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${verificationURL}`,
    html: `<strong>
  Click the following link to verify your email:
  <a href="${verificationURL}">
    ${verificationURL}
  </a>
</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
