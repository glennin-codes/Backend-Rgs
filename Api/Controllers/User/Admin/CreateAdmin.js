import User from "../../../Models/User.js";
import bcrypt from 'bcrypt'
import { sendEmail } from "../../../Utils/Email/email.js";
// Registration route for master-admins
export const CreateAdmin = async (req, res) => {
  try {
    if(req.body){
        const email=req.body.email;
        const password=req.body.password;
        const checkUser= await User.findOne({email:email});
        if(checkUser){
            return res.status(409).json({message:"User already exists"})
        }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
        name: req.body.name,
        location: req.body.location,
        phone:req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        photo:req.body.photo,
        role:"admin"
    });
    await newAdmin.save();

    await sendEmail(newAdmin.name, email, password);
    res.status(201).json({ message: "admin  created successfully" });
    }
    else{
        return res.status(
            400
        ) .json({ message: "Please provide the required fields" })
    }
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ message: "Error creating admin user", error });
  }
};


