const Chat = require("../model/Chat");
const User = require("../model/User");
const Message = require("../model/Message");

const getMessages = async (req, res, next) => {
    const {chat_,page_} = req.query

    // console.log({chat_,page_});
    try {
        if(chat_&&page_){
            
            const messages = await Message.find({chat:chat_},"-__v").sort({createdAt:"desc"})
            .populate("sender","_id email firstname lastname")
            .skip(page_*10).limit(10);

            return res.status(200).json({
                messages
            })
        }

        return res.status(400).json({
            chat_Query:"Is required",
            page_Query:"Is required"
        })

    
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
