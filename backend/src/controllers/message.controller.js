import User from "../models/user.model.js";
import Message from "../models/message.model.js"
export const getUsersForSidebar = async (req, res) => {
  try {
    const userID = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: userID } }).select("-password");

    return res.status(200).json(filterUsers)

  } catch (error) {
    console.log("Internal server Error in getUsersForSidebar ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    })
    return res.status(200).json(messages)

  } catch (error) {
    console.log("Internal server Error in getMessages ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image)
       imageUrl = uploadResponse.secure_url
    }
    const newMessages = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    })

    await newMessages.save()
// todo :relatime functionality socket .io
    return res.status(201).json(newMessages)
  } catch (error) {
    console.log("Internal server Error in sendMessages ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};