const User = require("../model/User");
const Chat = require("../model/Chat")


const getChats=async(req,res,next)=>{
    try {
        const {id} = req.user

        // just to ensure that there are anyuser with that id
        const user = await User.findById(id);
        if(!user) return res.status(404).json({
            message:"User Not Found"
        })

        const chat = await Chat.find({members:id},"-__v").populate("members","_id email firstname lastname")
        // console.log(chat);
        if(!chat.length) return res.status(204).json()

        res.status(200).json({
            message:"done",
            chat
        })

        next()
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Process Failed",
            error: error.message,
          });
    }

}





const createGroup=async(req,res,next)=>{
    try {
        const {id} = req.user

        const {name , isGroup , members} = req.body
        // console.log({name , isGroup , members});
        // console.log(id);



        // just to ensure that there are anyuser with that id
        const user = await User.findById(id);
        if(!user) return res.status(404).json({
            message:"User Not Found"
        })

        if(!isGroup) return res.status(400).json({message:"Should be Group is true"})

        members.push(id)
        const chat = await Chat.create({
            name,
            isGroup,
            members
        })




        res.status(201).json({
            message:"Created Chat Group Successfully",
            chat
        })

    } catch (error) {
        res.status(500).json({
            message: "Process Failed",
            error: error.message,
          });
    }
}


const getGroups=async(req,res,next)=>{

}


module.exports={
    getChats,
    createGroup,
    getGroups
}