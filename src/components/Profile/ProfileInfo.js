import React from "react";
import { Button } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { VscDebugStackframeDot } from "react-icons/vsc";
import { useSelector } from "react-redux";

function ProfileInfo() {
  const { data } = useSelector((state) => state.profile);
  return (
    <div className="profile-Info">
      <div>
        <div className="profile-image">
          <img src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/57ad80cf8e4fbad733c09a1dfa54cd8b-1619094323467/5b36368c-ac76-4bd3-98e3-ec1ea6d6d753.png" />
          <span>
            <VscDebugStackframeDot />
            Online
          </span>
        </div>
        <h6>{data?.personal?.first_name}</h6>
      </div>
      <div>
        <Button variant="outline-secondary">Preview Public Modeaaaa</Button>
      </div>
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
          <p>Apr 2021</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
