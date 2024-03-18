const User = require("../Models/User");
const Chat = require("../Models/Chat");


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
      .populate("members", "_id email firstname lastname")
      .populate("latestMessage", "content -_id");
    // console.log(chat);
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

const createChat = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { name, members } = req.body;
    // console.log({name , isGroup , members});
    // console.log(id);

    // just to ensure that there are anyuser with that id
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        message: "User Not Found",
      });

      if(!members.length) return res.status(400).json({ message:"Must chat has members"})

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

// change it which can fetch groups that user find in and get only groups not private chat (i think that we will n't need it !)✅
const getGroups = async (req, res, next) => {
  try {
    const { id } = req.user;
    const groups = await Chat.find({$and:[
      {"members.2":{$exists:true}},
    {members:id}]},"-createdAt -updatedAt -__v")
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
  createChat,
  getGroups,
};
