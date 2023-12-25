import React from "react";
import { Button } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { TiCamera } from "react-icons/ti";
import { VscDebugStackframeDot } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { profileUpdateImage } from "../../redux/Auth/Auth.action";
import { profileFetch } from "../../redux/Profile/Profile.action";
import { formatDate } from "../../utils/TimestamptoDate";
import { updateProfileInfo } from "./EditProfile/redux/Action";

function ProfileInfo() {
  const { data } = useSelector((state) => state.editProfile);

  const dispatch = useDispatch();

  const handleProfileUpdate = (data) => {
    dispatch(profileUpdateImage(data));
    dispatch(profileFetch());
  };

  const handleImg = (e) => {
    let formdata = new FormData();
    formdata.append("profile_image", e.target.files[0]);
    formdata.append("type", "profile_image");
    dispatch(updateProfileInfo(formdata, handleProfileUpdate));
  };

  return (
    <div className="profile-Info">
      <div>
        <div className="profile-image">
          <div className="image-icon">
            <TiCamera className="camera-icon" />
            <input
              title=""
              type="file"
              className="visually"
              id="photo"
              onChange={(e) => handleImg(e)}
            />
            <div
              className="profile--image"
              style={{
                backgroundImage: `url(${
                  data?.personal?.profile_image
                    ? data?.personal?.profile_image?.url?.full
                    : process.env.PUBLIC_URL + "/profileimg.png"
                })`,
              }}
            ></div>
          </div>
          {/* {
					data?.personal?.profile_image ? 
					<img src={data?.personal?.profile_image?.url?.full} alt={data?.personal?.profile_image?.alt} />
					:
					<img src={process.env.PUBLIC_URL + '/profileimg.png'} alt="User Profile User" />
					} */}
          <span>
            <VscDebugStackframeDot />
            Online
          </span>
        </div>
        <h6>{data?.personal?.first_name}</h6>
      </div>
      <div>
        <Button variant="outline-secondary">Preview Public Mode</Button>
      </div>
      <Link
        to="/seller_onboarding/personal_info"
        style={{
          color: "white",
          border: "gray",
          background: "#50c074",
          width: "100%",
          fontWeight: 600,
          display: "block",
          textAlign: "center",
          margin: "10px auto",
          lineHeight: "38px",
          borderRadius: "5px",
        }}
      >
        Edit Profile
      </Link>
      <hr />
      <div className="profile-details">
        <div>
          <div className="detail-level">
            <IoLocationSharp />
            <span>From</span>
          </div>
        </div>
        <div>
          <p>{data?.personal?.country}</p>
        </div>
      </div>
      <div className="profile-details">
        <div>
          <div className="detail-level">
            <IoLocationSharp />
            <span>Member Since</span>
          </div>
        </div>
        <div>
          <p>{formatDate(data?.personal?.created_at, "MMM DD")}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
