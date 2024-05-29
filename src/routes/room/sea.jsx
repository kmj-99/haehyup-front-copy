import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

/**
 * TODO
 * 1. socket init
 * 2. socket.io로 연결 (const socket = io("https://172.16.1.238:4000");)
 * 3. socket.emit (join-room, 'sea', 'world')
 * 4. on("accept_join", [{socketId: "93RMyaKd3Yyl6ceaAAAI", nickname: "aa"}...]
 
* 5. on(offer)
 * 6 on(candidate)
 * 7. on(ice)

 */

export default function SeaPage() {
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
