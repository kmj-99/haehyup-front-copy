import React, { createContext, useEffect } from "react";

const roomContext = createContext();

const socket = io("https://172.16.1.238:4000/", {
  reconnectionAttempts: 5,
  secure: true,
});

export default function RoomProvider({ children }) {
  useEffect(() => {}, []);
  return <roomContext.Provider value={{}}>{children}</roomContext.Provider>;
}
