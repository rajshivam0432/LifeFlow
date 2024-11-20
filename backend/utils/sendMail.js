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
export const sendBloodRequestToDonor = async (
  donor,
  bloodType,
  quantity,
  hospitalName
) => {
  try {
    if (!donor?.userId?.email) {
      throw new Error("Donor email is missing.");
    }

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: donor.userId.email,
      subject: "Blood Donation Request for Your Blood Type",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif;">
          <p style="font-size: 1.1em;">Hello ${donor.userId.name},</p>
          <p style="font-size: 1.1em;">We have received a request for blood donation for your blood type <b>${bloodType}</b> from <b>${hospitalName}</b>.</p>
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
    console.log("Blood request email sent to donor successfully.");
  } catch (error) {
    console.error("Error sending blood request email to donor:", error.message);
    throw error;
  }
};

export const sendBloodRequestToHospital = async (
  donor,
  bloodType,
  quantity,
  hospital
) => {
  try {
    if (!hospital?.email) {
      throw new Error("Hospital email is missing.");
    }

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: hospital.email,
      subject: "Blood Donation Request",
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif;">
          <p style="font-size: 1.1em;">Hello ${hospital.name},</p>
          <p style="font-size: 1.1em;">A request for blood type <b>${bloodType}</b> has been initiated by <b>${donor.name}</b>.</p>
          <p style="font-size: 1.1em;">Here are the details:</p>
          <ul>
            <li><strong>Blood Type:</strong> ${bloodType}</li>
            <li><strong>Quantity:</strong> ${quantity} units</li>
          </ul>
          <p style="font-size: 1.1em;">Please reach out to the donor if further information is required.</p>
          <p style="font-size: 0.9em;">Best Regards,<br />Team ${donor.email}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Blood request email sent to hospital successfully.");
  } catch (error) {
    console.error(
      "Error sending blood request email to hospital:",
      error.message
    );
    throw error;
  }
};

export default { sendBloodRequestToDonor, sendBloodRequestToHospital };