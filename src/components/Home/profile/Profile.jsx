import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBBadge,
} from "mdb-react-ui-kit";
import { getUserById } from "~/lib/apis/user/userInfo";
import "./Profile.css";

export default function ProfileComponent() {
  // profile 정보를 가져와서 상태로 관리
  const [profile, setProfile] = useState({});

  // useEffect를 이용해서 profile 정보를 가져오는 함수
  useEffect(() => {
    // profile 정보 가져오기
    setProfile(getUserById(1));
    // getUserById(1).then((response) => {
    //   setProfile(response);
    // });
  }, []);
  return (
    <MDBCard className="profile-card">
      <MDBCardBody className="text-center">
        <div className="mt-3 mb-4">
          <MDBCardImage
            src={profile.profileImageUrl}
            className="rounded-circle"
            fluid
            style={{ width: "100px" }}
          />
        </div>

        <MDBBadge className="profile-badge" pill>
          <MDBCardImage
            src={""}
            className="rounded-circle"
            fluid
            style={{ width: "100px" }}
          />
        </MDBBadge>
        <MDBTypography tag="h4">{profile.nickname}</MDBTypography>
        <MDBCardText className="text-muted mb-4">{profile.email}</MDBCardText>

        <MDBBtn href="/mypage" rounded size="lg">
          MY PAGE
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
