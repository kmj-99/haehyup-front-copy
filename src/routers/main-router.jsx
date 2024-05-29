import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/routes/page";
import Signup from "~/routes/board/signup/signup";
import Signin from "../routes/board/signin/signin";
import MyPage from "../routes/board/mypage/mypage";
import HomePage from "../routes/home/page";
import HomeLayout from "../routes/home/top-layout";
import Memo from "../routes/board/memo/memo";
import SeaRoomPage from "../routes/room/sea";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    index: true,
  },
  {
    path: "/home",
    element: <HomePage />,
    index: true,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/memo",
    element: <Memo />,
  },
  {
    path: "/room/sea",
    element: <SeaRoomPage />
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
    ],
  },
]);
export default router;
