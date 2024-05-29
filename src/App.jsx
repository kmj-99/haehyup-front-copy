import React from "react";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./routers/main-router";
import "./App.css";
import RoomProvider from "./components/RoomProvider/RoomProvider";

function App() {
  return (
    <RoomProvider>
      <RouterProvider router={mainRouter} />
    </RoomProvider>
  );
}
export default App;
