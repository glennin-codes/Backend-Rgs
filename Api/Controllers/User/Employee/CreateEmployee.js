// Used to create a new employee
import bcrypt from 'bcrypt'
import User from '../../../Models/User.js';

export const CreateEmployee = async (req, res) => {
  try {
    if(req.body){
        const email=req.body.email;
        const password=req.body.password;
        const checkUser= await User.findOne({email:email});
        if(checkUser){
            return res.status(409).json({message:"User already exists"})
        }
    // Create a new master-admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMasterAdmin = new User({
        name: req.body.name,
        location: req.body.location,
        phone:req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        photo:req.body.photo,
        
    });
   
    await newMasterAdmin.save();

    res.status(201).json({ message: "Employee user created successfully" });
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
      .json({ message: "Error creating master-admin user", error });
  }
};


