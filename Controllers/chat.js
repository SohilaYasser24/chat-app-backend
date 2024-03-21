const User = require("../Models/User");
const Chat = require("../Models/Chat");
const { chatValidation } = require("../Validators/chat");

// this is first request the front call it which return all chat that user make it ✅
const getChats = async (req, res, next) => {
  try {
    const { id } = req.user;

    // just to ensure that there are anyuser with that id
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        message: "User Not Found",
      });

    const chat = await Chat.find({ members: id }, "-__v -createdAt -updatedAt")
      .populate("members", "_id email firstname lastname image")
      .populate("latestMessage", "content -_id");
    console.log(chat);
    if (!chat.length) return res.status(204).json();

    res.status(200).json({
      message: "done",
      chat,
    });

    next();
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Process Failed",
      error: error.message,
    });
  }
};

const createGroupChat = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { name, members } = req.body;

    const validation = chatValidation.validate(req.body);

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
    // console.log({name , isGroup , members});
    // console.log(id);

    // just to ensure that there are anyuser with that id
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        message: "User Not Found",
      });

    if (!members.length)
      return res.status(400).json({ message: "Must chat has members" });

    members.push(id);
    const chat = await Chat.create({
      name,
      members,
    });

    res.status(201).json({
      message: "Created Chat Group Successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Process Failed",
      error: error.message,
    });
  }
};

const createPrivateChat = async (req, res, next) => {
  try {
    const { id } = req.user;

    // just to ensure that there are anyuser with that id
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        message: "User Not Found",
      });

    const recevierId = req.params.recieverId;
    const recevierData = await User.findById(recevierId);
    if (!recevierData)
      return res.status(404).json({
        message: "Receiver Not Found",
      });

    const name = recevierData.firstname + " " + recevierData.lastname;

    const members = [id, recevierId];

    const chat = await Chat.findOne({ members: { $all: members, $size: 2 } });
    let newChat;
    if (chat) {
      return res.json({
        chat:{
          _id:newChat._id,
          members:newChat.members,
          name:newChat.name,
        },
      });
    } else {
      newChat = await Chat.create({
        name,
        members,
      });
    }

    res.status(201).json({
      message: "Created Chat Successfully",
      chat:{
        _id:newChat._id,
        members:newChat.members,
        name:newChat.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Process Failed",
      error: error.message,
    });
  }
};

// change it which can fetch groups that user find in and get only groups not private chat (i think that we will n't need it !)✅
const getGroups = async (req, res, next) => {
  try {
    const { id } = req.user;
    const groups = await Chat.find(
      { $and: [{ "members.2": { $exists: true } }, { members: id }] },
      "-createdAt -updatedAt -__v"
    )
      .populate("members", "_id email firstname lastname")
      .populate("latestMessage", "content -_id");
    res.status(200).json({
      groups,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getChats,
  createGroupChat,
  createPrivateChat,
  getGroups,
};
