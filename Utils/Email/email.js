// import sgMail from "@sendgrid/mail";
import { sendCredentials } from "./Sendmailgen.js";
import dotenv from "dotenv";
import { createTransport } from 'nodemailer';
import { configure } from "./config.js";


dotenv.config();
export const sendEmail = async (name, email, pwd) => {
  console.log(name, email, pwd);
  const msg = {
    to: email,
    from: "ayiendaglen@gmail.com",
    subject: "Welcome to Dowlladahahoosekgs",
    html: sendCredentials(name, email, pwd),
  };

  try {
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // const result = await sgMail.send(msg);
    // if (result) {
    //   console.log(result);
    // }
    sendMail(msg);
  } catch (error) {
    console.error(error);
  }
};
const sendMail= (options) => {

  let config = {
    service : 'gmail',
    auth : {
        user: configure.EMAIL,
        pass: configure.PASSWORD
    }
}

let transporter = createTransport(config);

transporter.sendMail(options, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
  


};
