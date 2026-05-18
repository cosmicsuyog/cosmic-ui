import { generateToken } from "../config/token.js";
import userModel from "../models/user.model.js";

export const googleAuth = async (req, res) => {
try {
    const {name,email} = req.body;

    let user = await userModel.findOne({email})
    

    if (!user){
        user = await userModel.create({
            name,
            email,
        })
    }   
    
    const token = generateToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })


    return res.status(200).json({success: true, user});

} catch (error) {
    return res.status(500).json({success: false, message: `Google Auth Error : ${error}`});
}
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });
        return res.status(200).json({success: true, message: "Logout successful"});
    } catch (error) {
        return res.status(500).json({success: false, message: `Logout Error : ${error}`});
    }
}