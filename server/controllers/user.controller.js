import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
try{
    const user = await User.findById(req.userId)
    if(!user){
        return res.status(200).json({
            message:"Failed to get Current User",
            success:false
        })
    }
    return res.status(200).json({
        message:"success",
        success:true,
        user
    })
}catch(error){
        res.status(500).json({ message: `Error getting Current User ${error.message}` });

}

}


export const getAllUsers = async (req, res) => {
try{
    const users = await User.find({_id: {$ne: req.userId}}).select("-password").sort({createdAt: -1})
    if(!users){
        return res.status(404).json({
            message:"Failed to get all users",
            success:false
        })
    }
    return res.status(200).json({
        message:"success",
        success:true,
        users
    })
}catch(error){
        res.status(500).json({ message: `Error getting all users ${error.message}` });

}

}
