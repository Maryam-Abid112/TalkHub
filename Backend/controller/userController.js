
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // create the email verification token
       


        //  create user properly
        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: "User registered",
             _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login placeholder
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// for searchbar
exports.alluser= async(req,res)=>{

    try{
        const user= await User.find().select("name");

        res.json(user);

    }catch(error){
        res.status(500).json({message:error.message })

    }  
}


// update profile

exports.update=async(req,res)=>{
    

    try{
        const user=await User.findById(req.user._id);
        

        if(!user){
         return res.status(404).json({message: "user not found"});
        }
         
         user.name=req.body.name || user.name;
         user.bio=req.body.bio || user.bio;

         const updatedUser = await user.save();

         res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            bio:updatedUser.bio,
         })


    }catch(err){
        res.status(500).json({message: err.message})
    }
}