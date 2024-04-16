import { messageModel } from "../model/message-model.js";
import { io } from "../socket/socket.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.find({}).sort({createdAt: -1}).populate("user", "name image").exec();
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in Get message Controller :: ", error.message);
    return res.status(500).json({
      error: "Internal server Error.",
    });
  }
};

export const postMessages = async (req, res) => {
  try {
    const { userID } = req.params;
    const { message } = req.body;

    const newMessage = await messageModel.create({
      user: userID,
      message,
    });

    const messages = await messageModel.findById(newMessage._id).populate("user", "name image").exec();
    io.emit("newMessage", messages);
    return res.status(200).json({message:"Message created."});
  } catch (error) {
    console.log("Error in Post message Controller :: ", error.message);
    return res.status(500).json({
      error: "Internal server Error.",
    });
  }
};

export const likesMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    const { userID } = req.params;

    const message = await messageModel.findById(messageId);

    const isLiked = message.likes.includes(userID);
    if (!isLiked) {
      message.likes.push(userID);

      await message.save();
      io.emit("like", message)

      return res.status(200).json("Liked");
    } else {
      message.likes = message.likes.filter((ele) => {
        return ele != userID;
      });
    
      await message.save();
      io.emit("like", message)

      return res.status(200).json("Dis Liked");
    }
  } catch (error) {
    console.log("Error in Like message Controller :: ", error.message);
    return res.status(500).json({
      error: "Internal server Error.",
    });
  }
};
