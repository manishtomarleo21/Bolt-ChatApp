import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {

    const { email, password, fullname } = req.body;
    // console.log(req.body);
    
    try {
        if(!email || !password || !fullname) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

       if(password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
       }

       const user = await User.findOne({ email });
       if(user) {
        return res.status(400).json({ message: "Email already exists" });
       }

       //Hash Password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullname,
            password: hashedPassword,
        });

        if(newUser){
            //generate jwbtoken(jasonwebtoken)
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                profilePic: newUser.profilePic,
            });

        }else{
            res.status(400).json({message:"Invalid User Data!"});
        }

    }catch (error) {
        console.log("Error in signup", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
export const logout = (req, res) => {
    try {
        
        // res.clearCookie('jwt');
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.log("Error in logout", error.message);
        return res.status(500).json({ message: "Something went wrong" });
        
    }
}

export const updateProfile = async (req, res) => {
    try {
        
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in updateProfile", error.message);
        return res.status(500).json({ message: "Something went wrong" });
        
    }
}

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
    
