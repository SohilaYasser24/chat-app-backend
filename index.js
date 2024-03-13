require('dotenv').config();
const express = require('express');
const connect = require('./db');
// const User = require('./model/User');
// const Message = require('./model/Message');
// const Chat = require('./model/Chat');




const app = express();
const PORT = process.env.PORT




app.listen(PORT,()=>{
    console.log("Server is Online in PORT 5000");
});

connect();





//#region create Message 
// Message.create({
//     sender:"65f21c2c7408c0f85561cfec",
//     chat:"65f21ea96e54f8565ea5ce84",
//     content:"Hello Abdo"
// })
// .then(()=>{
//     console.log("Created Message");
// })
// .catch((err)=>{
//     console.log(err);
// })
//#endregion

//#region  Create Chat 
// Chat.create({
//     name:"abdo&abdo",
//     members:["65f21c2c7408c0f85561cfec","65f21db386bf3b19af1baa8a"]
// }).then(()=>{
//     console.log("Message Created");
// })
// .catch((err)=>{
//     console.log(err);
// })
//#endregion


//#region Create User Test
// User.create({
//     firstname:"Abdelrham",
//     gender:"male",
//     email:"abdo1@gmail.com",
//     password:"abdo123456"
// }).then(()=>{
//     console.log("Created");
// }).catch((error)=>{
//     console.log(error);
// })
//#endregion