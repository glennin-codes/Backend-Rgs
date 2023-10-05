import { sendEmail } from "./email.js";

export const test = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    await sendEmail(name, email, password);
    return res.send("email sent succefull");
  } catch (e) {
    console.log(e);
    return res.send("did not send", e);
  }
};
