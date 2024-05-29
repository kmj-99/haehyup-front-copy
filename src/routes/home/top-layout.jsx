import MyNavbar from "../../components/MyNavbar/MyNavbar";
import { Outlet } from "react-router-dom";

/**
 * em : 부모 태그의 font-size를 기준으로 상대적인 크기를 지정
 * width : 2em, 부모 태그의 font-size: 20px, 부모 태그의 width: 100px
 * => 1em: 20px
 * 
 * rem : root em, html(루트 태그)의 font-size를 기준으로 상대적인 크기를 지정
 * vh, vw : viewport height, viewport width: (사용자 디바이스) 화면의 높이, 너비를 기준으로 상대적인 크기를 지정
 */

export default function HomeLayout() {
  return (
    <>
      <MyNavbar  />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </>
  );
}
