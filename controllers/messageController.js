const Chat = require("../model/Chat");
const User = require("../model/User");
const Message = require("../model/Message");

const getMessages = async (req, res, next) => {};

const setMessages = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;

    let newMessage = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    newMessage = await newMessage.populate("sender");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newMessage,
    });
    res.status(200).json({
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMessages,
  setMessages,
};
