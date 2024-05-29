import React, { useState, useRef, useEffect } from "react";
import ThemeComponent from "../../components/Home/theme/Theme";
import ProfileComponent from "../../components/Home/profile/Profile";
import { Col, Container, Row } from "react-bootstrap";
import { io } from "socket.io-client"; // 여기서 io를 import합니다.
import "./room-style.css";

const socket = io("https://172.16.1.238:4000");

let pcObj = {
  // remoteSocketId: pc
};

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks();
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;

      if (currentCamera.label == camera.label) {
        option.selected = true;
      }

      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMedia(deviceId) {
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );

    myFace.srcObject = myStream;
    myFace.muted = true;

    if (!deviceId) {
      myStream.getAudioTracks().forEach((track) => (track.enabled = false));
      await getCameras();
    }
  } catch (error) {
    console.log(error);
  }
}

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (muted) {
    unMuteIcon.classList.remove(HIDDEN_CN);
    muteIcon.classList.add(HIDDEN_CN);
    muted = false;
  } else {
    muteIcon.classList.remove(HIDDEN_CN);
    unMuteIcon.classList.add(HIDDEN_CN);
    muted = true;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraIcon.classList.remove(HIDDEN_CN);
    unCameraIcon.classList.add(HIDDEN_CN);
    cameraOff = false;
  } else {
    unCameraIcon.classList.remove(HIDDEN_CN);
    cameraIcon.classList.add(HIDDEN_CN);
    cameraOff = true;
  }
}

async function handleCameraChange() {
  try {
    await getMedia(camerasSelect.value);
    if (peerConnectionObjArr.length > 0) {
      const newVideoTrack = myStream.getVideoTracks()[0];
      peerConnectionObjArr.forEach((peerConnectionObj) => {
        const peerConnection = peerConnectionObj.connection;
        const peerVideoSender = peerConnection
          .getSenders()
          .find((sender) => sender.track.kind == "video");
        peerVideoSender.replaceTrack(newVideoTrack);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// muteBtn.addEventListener("click", handleMuteClick);
// cameraBtn.addEventListener("click", handleCameraClick);
// camerasSelect.addEventListener("input", handleCameraChange);

// Screen Sharing

let captureStream = null;

async function startCapture() {
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    const screenVideo = document.querySelector("#screen");
    screenVideo.srcObject = captureStream;
  } catch (error) {
    console.error(error);
  }
}

// Welcome Form (choose room)

// call.classList.add(HIDDEN_CN);

// const welcomeForm = welcome.querySelector("form");

async function initCall() {
  console.log("initCall");
  welcome.hidden = true;
  call.classList.remove(HIDDEN_CN);
  await getMedia();
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  console.log("handleWelcomeSubmit");
  if (socket.disconnected) {
    socket.connect();
  }

  const welcomeRoomName = welcomeForm.querySelector("#roomName");
  const welcomeNickname = welcomeForm.querySelector("#nickname");
  const nicknameContainer = document.querySelector("#userNickname");
  roomName = welcomeRoomName.value;
  welcomeRoomName.value = "";
  nickname = welcomeNickname.value;
  welcomeNickname.value = "";
  nicknameContainer.innerText = nickname;
  socket.emit("join_room", roomName, nickname);
}

// welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Chat Form

const chatForm = document.querySelector("#chatForm");
const chatBox = document.querySelector("#chatBox");

const MYCHAT_CN = "myChat";
const NOTICE_CN = "noticeChat";

// chatForm.addEventListener("submit", handleChatSubmit);

function handleChatSubmit(event) {
  console.log("handleCahtSubmit");
  event.preventDefault();
  const chatInput = chatForm.querySelector("input");
  const message = chatInput.value;
  chatInput.value = "";
  socket.emit("chat", `${nickname}: ${message}`, roomName);
  writeChat(`You: ${message}`, MYCHAT_CN);
}

function writeChat(message, className = null) {
  console.log("writeChat");
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = message;
  li.appendChild(span);
  li.classList.add(className);
  chatBox.prepend(li);
}

// Leave Room

const leaveBtn = document.querySelector("#leave");

function leaveRoom() {
  console.log("leaveRoom");
  socket.disconnect();

  call.classList.add(HIDDEN_CN);
  welcome.hidden = false;

  peerConnectionObjArr = [];
  peopleInRoom = 1;
  nickname = "";

  myStream.getTracks().forEach((track) => track.stop());
  const nicknameContainer = document.querySelector("#userNickname");
  nicknameContainer.innerText = "";

  myFace.srcObject = null;
  clearAllVideos();
  clearAllChat();
}

function removeVideo(leavedSocketId) {
  console.log("removeVide");
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((streamElement) => {
    if (streamElement.id === leavedSocketId) {
      streams.removeChild(streamElement);
    }
  });
}

function clearAllVideos() {
  console.log("clearAllVideos");
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((streamElement) => {
    if (streamElement.id != "myStream") {
      streams.removeChild(streamElement);
    }
  });
}

function clearAllChat() {
  console.log("clearAllChat");
  const chatArr = chatBox.querySelectorAll("li");
  chatArr.forEach((chat) => chatBox.removeChild(chat));
}

// leaveBtn.addEventListener("click", leaveRoom);

// Modal code

const modal = document.querySelector(".modal");
// const modalText = modal.querySelector(".modal__text");
// const modalBtn = modal.querySelector(".modal__btn");

function paintModal(text) {
  console.log("paintModal");
  modalText.innerText = text;
  modal.classList.remove(HIDDEN_CN);

  modal.addEventListener("click", removeModal);
  modalBtn.addEventListener("click", removeModal);
  document.addEventListener("keydown", handleKeydown);
}

function removeModal() {
  console.log("removeModal");
  modal.classList.add(HIDDEN_CN);
  modalText.innerText = "";
}

function handleKeydown(event) {
  console.log("handleKeydown");
  if (event.code === "Escape" || event.code === "Enter") {
    removeModal();
  }
}

// Socket code

socket.on("reject_join", () => {
  paintModal("Sorry, The room is already full.");
  const nicknameContainer = document.querySelector("#userNickname");
  nicknameContainer.innerText = "";
  roomName = "";
  nickname = "";
});

socket.on("accept_join", async (userObjArr) => {
  await initCall();

  const length = userObjArr.length;
  if (length === 1) {
    return;
  }

  writeChat("Notice!", NOTICE_CN);
  for (let i = 0; i < length - 1; ++i) {
    try {
      const newPC = createConnection(
        userObjArr[i].socketId,
        userObjArr[i].nickname
      );
      const offer = await newPC.createOffer();
      await newPC.setLocalDescription(offer);
      socket.emit("offer", offer, userObjArr[i].socketId, nickname);
      writeChat(`__${userObjArr[i].nickname}__`, NOTICE_CN);
    } catch (err) {
      console.error(err);
    }
  }
  writeChat("is in the room.", NOTICE_CN);
});

socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
  try {
    const newPC = createConnection(remoteSocketId, remoteNickname);
    await newPC.setRemoteDescription(offer);
    const answer = await newPC.createAnswer();
    await newPC.setLocalDescription(answer);
    socket.emit("answer", answer, remoteSocketId);
    writeChat(`notice! __${remoteNickname}__ joined the room`, NOTICE_CN);
  } catch (err) {
    console.error(err);
  }
});

socket.on("answer", async (answer, remoteSocketId) => {
  await pcObj[remoteSocketId].setRemoteDescription(answer);
});

socket.on("ice", async (ice, remoteSocketId) => {
  await pcObj[remoteSocketId].addIceCandidate(ice);
});

socket.on("chat", (message) => {
  writeChat(message);
});

socket.on("leave_room", (leavedSocketId, nickname) => {
  removeVideo(leavedSocketId);
  writeChat(`notice! ${nickname} leaved the room.`, NOTICE_CN);
  --peopleInRoom;
  sortStreams();
});

// RTC code

function createConnection(remoteSocketId, remoteNickname) {
  console.log("createConnection");
  const myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", (event) => {
    console.log("addEventListener");
    handleIce(event, remoteSocketId);
  });
  myPeerConnection.addEventListener("addstream", (event) => {
    console.log("addEventListener");
    handleAddStream(event, remoteSocketId, remoteNickname);
  });
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));

  pcObj[remoteSocketId] = myPeerConnection;

  ++peopleInRoom;
  sortStreams();
  return myPeerConnection;
}

function handleIce(event, remoteSocketId) {
  console.log("handleIce");
  if (event.candidate) {
    socket.emit("ice", event.candidate, remoteSocketId);
  }
}

function handleAddStream(event, remoteSocketId, remoteNickname) {
  console.log("handleAddStream");
  const peerStream = event.stream;
  paintPeerFace(peerStream, remoteSocketId, remoteNickname);
}

function paintPeerFace(peerStream, id, remoteNickname) {
  console.log("paintPeerFace");
  const streams = document.querySelector("#streams");
  const div = document.createElement("div");
  div.id = id;
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  video.width = "400";
  video.height = "400";
  video.srcObject = peerStream;
  const nicknameContainer = document.createElement("h3");
  nicknameContainer.id = "userNickname";
  nicknameContainer.innerText = remoteNickname;

  div.appendChild(video);
  div.appendChild(nicknameContainer);
  streams.appendChild(div);
  sortStreams();
}

function sortStreams() {
  console.log("srotStreams");
  const streams = document.querySelector("#streams");
  const streamArr = streams.querySelectorAll("div");
  streamArr.forEach((stream) => (stream.className = `people${peopleInRoom}`));
}

socket.emit("join_room", "hello", "world");

export default function SeaRoomPage() {
  // States for mute and camera buttons
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Refs for DOM elements
  const myFaceRef = useRef(null);
  const muteBtnRef = useRef(null);
  const cameraBtnRef = useRef(null);
  const camerasSelectRef = useRef(null);
  const callRef = useRef(null);
  const welcomeRef = useRef(null);

  useEffect(() => {
    // Add any effect logic here if needed
  }, []);

  const handleMuteClick = () => {
    setIsMuted((prev) => !prev);
    // Add logic to mute/unmute the video/audio
  };

  const handleCameraClick = () => {
    setIsCameraOff((prev) => !prev);
    // Add logic to turn the camera on/off
  };

  return (
    <Container fluid className="full-height-container">
      <header>
        <i className="fab fa-pied-piper-square fa-2x"></i>
        <h1>Yoom</h1>
      </header>

      <main>
        <div id="welcome" ref={welcomeRef}>
          <form>
            <input id="roomName" type="text" required placeholder="Room Name" />
            <input
              id="nickname"
              type="text"
              required
              placeholder="Your Nickname"
            />
            <button>Enter Room</button>
          </form>
        </div>
        <div className="call" id="call" ref={callRef}>
          <div id="streamBox">
            <div id="streams">
              <div className="people1" id="myStream">
                <video
                  id="myFace"
                  ref={myFaceRef}
                  autoPlay
                  playsInline
                  width="400"
                  height="400"
                ></video>
                <h3 id="userNickname"></h3>
              </div>
            </div>
            <div id="controlers">
              <div id="controlers__column">
                <select id="cameras" ref={camerasSelectRef}></select>
              </div>
              <div id="controlers__column">
                <div id="buttons">
                  <button id="mute" ref={muteBtnRef} onClick={handleMuteClick}>
                    <i
                      className={`fas fa-microphone fa-2x ${
                        isMuted ? "muteIcon" : "unMuteIcon"
                      }`}
                    ></i>
                    <i
                      className={`fas fa-microphone-slash fa-2x ${
                        isMuted ? "unMuteIcon" : "muteIcon"
                      }`}
                    ></i>
                  </button>
                  <button
                    id="camera"
                    ref={cameraBtnRef}
                    onClick={handleCameraClick}
                  >
                    <i
                      className={`fas fa-video fa-2x ${
                        isCameraOff ? "cameraIcon" : "unCameraIcon"
                      }`}
                    ></i>
                    <i
                      className={`fas fa-video-slash fa-2x ${
                        isCameraOff ? "unCameraIcon" : "cameraIcon"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div id="controlers__column">
                <button id="leave">Leave</button>
              </div>
            </div>
          </div>
          <div id="chatRoom">
            <ul id="chatBox"></ul>
            <form id="chatForm">
              <input required type="text" placeholder="Write your chat" />
              <button>Send</button>
            </form>
          </div>
        </div>
      </main>

      <aside className="modal hidden">
        <div className="modal__box">
          <h2 className="modal__text"></h2>
          <button className="modal__btn">OK</button>
        </div>
      </aside>

      <script src="/socket.io/socket.io.js"></script>
      <script src="/public/js/sea.js"></script>
    </Container>
  );
}
