// import express from "express";
// import axios from "axios";
// import { Server as SocketIO } from "socket.io";
// import https from "https";
// import fs from "fs";
// import cors from "cors"
// import 'regenerator-runtime/runtime';

// /////////////////
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const usersRouter = require('./routes/api/users');
// // const seaRouter = require('./routes/api/sea');
// ////////
// const PORT = process.env.PORT || 4000;

// const app = express();

// app.use(cors()); //모든 접근 허용
// app.use(express.json());
// app.set("view engine", "pug");
// app.set("views", process.cwd() + "/src/views");

// /////////////////

// dotenv.config(); 

// mongoose
//   .connect(
//     'mongodb+srv://liarcrown15:admin1234@haehyup.njuy1y4.mongodb.net/?retryWrites=true&w=majority&appName=Haehyup'
//   )
//   .then(() => console.log("Connected Successful"))
//   .catch(err => console.log(err));



// /////////////////
// app.use("/public", express.static(process.cwd() + "/src/public"));

// ////
// app.use('/users', usersRouter);
// // app.use('/sea',seaRouter);
// ////
// app.get("/0", (req, res) => {
//   res.render("sea")
// });

// app.get("/1", (req, res) => {
//   res.render("forest");
// });

// app.get("/2", (req, res) => {
//   res.render("rain");
// });

// // SSL 인증서와 키 파일을 읽어옵니다.
// const privateKey = fs.readFileSync("./private.pem", "utf8");
// const certificate = fs.readFileSync("./public.pem", "utf8");
// const credentials = { key: privateKey, cert: certificate };


// const httpsServer = https.createServer(credentials, app);
// const wsServer = new SocketIO(httpsServer, {
//   cors: {
//     origin: "https://172.16.1.238:4000",  // 허용할 도메인 설정
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// let roomObjArr = [];
// const MAXIMUM = 5;

// wsServer.on("connection", (socket) => {
//   let myRoomName = null;
//   let myNickname = null;

//   socket.on("join_room", (roomName, nickname) => {
//     myRoomName = roomName;
//     myNickname = nickname;

//     let isRoomExist = false;
//     let targetRoomObj = null;

//     for (let i = 0; i < roomObjArr.length; ++i) {
//       if (roomObjArr[i].roomName === roomName) {
//         if (roomObjArr[i].currentNum >= MAXIMUM) {
//           socket.emit("reject_join");
//           return;
//         }

//         isRoomExist = true;
//         targetRoomObj = roomObjArr[i];
//         break;
//       }
//     }

//     if (!isRoomExist) {
//       targetRoomObj = {
//         roomName,
//         currentNum: 0,
//         users: [],
//       };
//       roomObjArr.push(targetRoomObj);
//     }

//     targetRoomObj.users.push({
//       socketId: socket.id,
//       nickname,
//     });
//     ++targetRoomObj.currentNum;

//     socket.join(roomName);
//     socket.emit("accept_join", targetRoomObj.users);
//   });

//   socket.on("offer", (offer, remoteSocketId, localNickname) => {
//     socket.to(remoteSocketId).emit("offer", offer, socket.id, localNickname);
//   });

//   socket.on("answer", (answer, remoteSocketId) => {
//     socket.to(remoteSocketId).emit("answer", answer, socket.id);
//   });

//   socket.on("ice", (ice, remoteSocketId) => {
//     socket.to(remoteSocketId).emit("ice", ice, socket.id);
//   });

//   socket.on("chat", (message, roomName) => {
//     socket.to(roomName).emit("chat", message);
//   });

//   socket.on("disconnecting", () => {
//     socket.to(myRoomName).emit("leave_room", socket.id, myNickname);

//     let isRoomEmpty = false;
//     for (let i = 0; i < roomObjArr.length; ++i) {
//       if (roomObjArr[i].roomName === myRoomName) {
//         const newUsers = roomObjArr[i].users.filter(
//           (user) => user.socketId != socket.id
//         );
//         roomObjArr[i].users = newUsers;
//         --roomObjArr[i].currentNum;

//         if (roomObjArr[i].currentNum == 0) {
//           isRoomEmpty = true;
//         }
//       }
//     }

//     if (isRoomEmpty) {
//       const newRoomObjArr = roomObjArr.filter(
//         (roomObj) => roomObj.currentNum != 0
//       );
//       roomObjArr = newRoomObjArr;
//     }
//   });
// });

// const handleListen = () =>
//   console.log(`✅ Listening on https://172.16.1.238:${PORT}`);
// httpsServer.listen(PORT, handleListen);