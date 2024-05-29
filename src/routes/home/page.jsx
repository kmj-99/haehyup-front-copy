import ThemeComponent from "../../components/Home/theme/Theme";
import ProfileComponent from "../../components/Home/profile/Profile";
import { Col, Container, Row } from "react-bootstrap";
// import { Display } from "react-bootstrap-icons";


export default function HomePage() {
  return (
    <Container fluid className="full-height-container">
      <Row className="full-height-row">
        <Col xs={10} className="full-height-col">
          <ThemeComponent />
        </Col>
        <Col xs={2}></Col>
      </Row>
      <div className="overlay">
        <ProfileComponent />
      </div>
    </Container>
  );
}
