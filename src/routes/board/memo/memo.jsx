import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../mypage/mypage.css";
import MyNavbar from "../../../components/MyNavbar/MyNavbar";

const Memo = () => {
  // 사용자 정보와 공부 기록 리스트를 상태로 관리
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    studyLogList: [],
  });

  // 마운트될 때 사용자 정보를 불러오는 가정
  useEffect(() => {
    // API 호출을 통해 사용자 정보를 가져오는 로직을 구현
    // 이 예제에서는 예시 데이터를 사용
    setUserInfo({
      name: "홍길동",
      email: "hong@example.com",
      studyLogList: [
        {
          id: 1,
          title: "React 기초",
          studyTime: "2:00",
          description: "React의 기본 개념과 구성 요소에 대해 공부했습니다.",
        },
        {
          id: 2,
          title: "JavaScript 고급",
          studyTime: "2:00",
          description:
            "JavaScript의 고급 문법과 비동기 처리에 대해 공부했습니다.",
        },
      ],
    });
  }, []);

  return (
    <>
      <MyNavbar />

      <Container>
        <h1 className="header">
          <b>📝Memo📝</b>
        </h1>
        <Row>
          <Col xs={12} md={8}>
            <section>
              <h2>
                <b>공부 기록</b>
              </h2>
              <ul>
                {userInfo.studyLogList.map((log) => (
                  <li key={log.id}>
                    <h3 style={{ fontSize: "20px" }}>{log.title}</h3>
                    <p>
                      <b>공부 시간:</b> {log.studyTime}
                    </p>
                    <p>
                      <b>설명:</b> {log.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Col>
          <Col xs={12} md={4}>
            <section>
              <h2>
                <b>사용자 정보</b>
              </h2>

              <Image
                className="profile"
                src="src/img/jinbe.jpeg"
                roundedCircle
              />

              <p>이름: {userInfo.name}</p>
              <p>이메일: {userInfo.email}</p>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Memo;
