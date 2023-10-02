import sgMail from '@sendgrid/mail';
import { sendCredentials } from './Sendmailgen.js';
import dotenv from "dotenv";

dotenv.config();
export const sendEmail=async(name,email,pwd)=>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(name,email,pwd);
    const msg = {
        to: email,
        from: 'ayiendaglen@gmail.com',
        subject: 'Welcome to Rgs',
        html: sendCredentials(name,email,pwd),
      };
   
      try {
       const result= await sgMail.send(msg);
       if(result){
        console.log(result);
       }

      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      }
}