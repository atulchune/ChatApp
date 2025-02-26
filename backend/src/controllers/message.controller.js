import User from "../models/user.model";

export const getUsersForSidebar = async (req, res) => {
    try {
        const userID = req.user._id;
        const filterUsers = await User.find({_id:{$ne:userID}}).select("-password");

        return res.status(200).json(filterUsers)
     
    } catch (error) {
      console.log("Internal server Error in getUsersForSidebar ",error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };