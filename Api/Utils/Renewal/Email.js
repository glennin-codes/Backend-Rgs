import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { sendRenewalCredentials } from "./renewalMailgen.js";

dotenv.config();
export const sendRenewalEmail = async (name, email, pwd) => {
  console.log(name, email, pwd);
  const msg = {
    to: email,
    from: "ayiendaglen@gmail.com",
    subject: "Welcome to Rgs",
    html: sendRenewalCredentials(name, email, pwd),
  };

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const result = await sgMail.send(msg);
    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};
