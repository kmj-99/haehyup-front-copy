import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar/MyNavbar";
import { Cpu } from "react-bootstrap-icons";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    // 추가적인 로그인 로직을 여기에 작성합니다.
    // 예: 서버로 폼 데이터를 전송하여 인증

    if (formData.email === "" || formData.password === "") {
      setError("Please fill out all fields.");
      return;
    }

    // 예시: 서버 요청을 성공적으로 완료한 경우
    setError("");
    alert("Signin successful!");
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <div style={{ textAlign: "center" }}>
              <img
                src="src/img/login-jinbe.png"
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "10px", // 이미지를 둥글게 만들기 위해 borderRadius 추가
                  display: "block", // 이미지를 블록 요소로 만듭니다.
                  margin: "0 auto", // 이미지를 중앙에 배치합니다.
                }}
                className="mb-3"
              />
            </div>
            <h1>Sign In</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-4">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
