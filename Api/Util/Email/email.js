import sgMail from '@sendgrid/mail';
import { sendCredentials } from './Sendmailgen.js';

export const sendEmail=async(name,email,pwd)=>{
    sgMail.setApiKey('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');
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