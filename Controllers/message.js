const Chat = require("../Models/Chat");
const User = require("../Models/User");
const Message = require("../Models/Message");
const { messageValidation } = require("../Validators/message");

const getMessages = async (req, res, next) => {
  const { chat_, page_ } = req.query;

  // console.log({chat_,page_});
  try {
    if (chat_ && page_) {
      const messages = await Message.find({ chat: chat_ }, "-__v")
        .sort({ createdAt: "desc" })
        .populate("sender", "_id email firstname lastname")
        .skip(page_ * 10)
        .limit(10);

      return res.status(200).json({
        messages,
      });
    }

    return res.status(400).json({
      chat_Query: "Is required",
      page_Query: "Is required",
    });
  } catch (error) {
    res.status(500).json({
      message: "Process Failed",
      error: error.message,
    });
  }
};

const setMessages = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;

    const validation = messageValidation.validate(req.body);

    if (validation.error) {
      let errorMessage = "";
      for (const err of validation.error.details) {
        errorMessage += `${err.path.join(" > ")} ${err.message.slice(
          err.message.lastIndexOf('"') + 1
        )}`;
      }
      return res.status(400).json({
        message: errorMessage,
      });
    }

    let newMessage = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newMessage,
    });

    newMessage = await newMessage.populate("sender");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.latestMessage ",
      select: "content",
    });
    newMessage = await User.populate(newMessage, {
      path: "chat.members ",
      select: "firstname lastname",
    });

    res.status(200).json(newMessage);
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
