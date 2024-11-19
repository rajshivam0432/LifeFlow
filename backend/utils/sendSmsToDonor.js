// // utils/sendSms.js
// import twilio from "twilio";
// import dotenv from "dotenv";

// dotenv.config();

// // Set up Twilio client using environment variables for sensitive data
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // Function to send SMS to donor
// export const sendSmsToDonor = async (phoneNumber, message) => {
//   try {
//     const sms = await client.messages.create({
//       body: message, // The content of the SMS message
//       from: "+91 62015 12130", // Your Twilio phone number
//       to: "+91 80786 90114", // The recipient's phone number
//     });
//     console.log("SMS sent:", sms.sid); // Log the message SID (Twilio message ID) to confirm it was sent
//   } catch (error) {
//     console.error("Error sending SMS:", error); // Log any errors
//     throw new Error("Failed to send SMS"); // Throw an error if SMS fails
//   }
// };
