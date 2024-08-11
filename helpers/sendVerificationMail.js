import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(process.env.API_KEY, process.env.API_SECRET);

export const sendVerificationMail = async (userEmail, verificationToken) => {
  const baseURL = process.env.BASE_URL;
  const verificationURL = `${baseURL}/verify/${verificationToken}`;

  const request = mailjet.post("send").request({
    FromEmail: "phonebook.app1@gmail.com",
    FromName: "PhoneBook",
    Subject: "PhoneBook - Email Verification",
    "Html-part": `
            <div style="font-family: sans-serif; text-align: center; font-size: 16px">
              <p style="color: #333; font-size: 24px">PhoneBook</p>

              <p style="color: #555">Click the following link to verify your email:</p>
              <p>
                <a href="${verificationURL}" style="color: #a06cd5; font-size: 18px; text-decoration: none;">
                Activate your account
                </a>
              </p>
            </div>
          `,
    Recipients: [{ Email: userEmail }],
  });

  try {
    const response = await request;
    console.log("Email sent:", response.body);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
