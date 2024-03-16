const Chat = require("../model/Chat");

const getChats = async (req, res, next) => {};

const createGroup = async (req, res, next) => {};

const getGroups = async (req, res, next) => {
  try {
    const groups = await Chat.where("isGroup").equals(true);
    res.status(200).json({
      message: "done",
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
  createGroup,
  getGroups,
};
