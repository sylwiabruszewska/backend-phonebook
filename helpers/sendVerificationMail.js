import sgMail from "@sendgrid/mail";

export const sendVerificationMail = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "sylwia.brusze@gmail.com",
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${process.env.BASE_URL}/api/users/verify/${verificationToken}`,
    html: `<strong>
  Click the following link to verify your email:
  <a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">
    ${process.env.BASE_URL}/api/users/verify/${verificationToken}
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
