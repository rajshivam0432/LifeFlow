import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Function to send an email to the donor about the blood request
export const sendBloodRequestToDonor = async (donor, bloodType, quantity,name) => {
  try {  if (!donor.userId || !donor.userId.email) {
    throw new Error("Donor email is missing.");
  }
    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: donor.userId.email, // Assuming donor has a reference to the user with an email field
      subject: "Blood Donation Request for Your Blood Type",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif;">
          <p style="font-size: 1.1em;">Hello ${donor.userId.name},</p>
          <p style="font-size: 1.1em;">We have received a request for blood donation for your blood type <b>${donor.bloodType}</b> from <b>${name}</b>.</p>
          <p style="font-size: 1.1em;">Here are the details of the request:</p>
          <ul>
            <li><strong>Blood Type:</strong> ${bloodType}</li>
            <li><strong>Quantity:</strong> ${quantity} units</li>
           
          </ul>
          <p style="font-size: 1.1em;">If you're able to donate, please contact the hospital directly.</p>
          <p style="font-size: 0.9em;">Best Regards,<br />Team CITY HOSPITAL</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending blood request email to donor:", error.message);
    throw error;
  }
};
export default sendBloodRequestToDonor;