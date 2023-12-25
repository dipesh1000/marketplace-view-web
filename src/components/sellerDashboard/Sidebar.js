import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/TimestamptoDate";
import "./style/style.scss";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const { sidebarData } = useSelector((state) => state.sellerDashboard);
  let googleStatus = sidebarData?.profile?.linked_accounts?.find(
    (p) => p.provider_name === "google"
  )
    ? true
    : false;
  let facebookStatus = sidebarData?.profile?.linked_accounts?.find(
    (p) => p.provider_name === "facebook"
  )
    ? true
    : false;
  let githubStatus = sidebarData?.profile?.linked_accounts?.find(
    (p) => p.provider_name === "github"
  )
    ? true
    : false;
  let vimeoStatus = sidebarData?.profile?.linked_accounts?.find(
    (p) => p.provider_name === "vimeo"
  )
    ? true
    : false;
  let dribbbleStatus = sidebarData?.profile?.linked_accounts?.find(
    (p) => p.provider_name === "dribbble"
  )
    ? true
    : false;
  return (
    <>
      <div className="info-section">
        <div className="d-flex justify-content-between">
          <div className="user-wrap">
            <div className="img-container">
              <img
                src={user?.profileImage?.url?.resize}
                alt={user?.profileImage?.alt}
              />
            </div>
            <div className="user-name">{user?.username}</div>
          </div>
          <div className="stars">
            <i className="fa fa-star"></i>
            {sidebarData?.profile?.seller_rating != null ? (
              <>{sidebarData?.profile?.seller_rating?.average_rating}</>
            ) : (
              "N/A"
            )}
          </div>
        </div>
        <div className="line-break"></div>
        <ul>
          <li>
            <div className="title">Response Rate</div>
            <div className="rating">
              <div
                className="rate-bar"
                style={{
                  width: "60px",
                  borderRadius: "30px",
                  height: "8px",
                  marginRight: "10px",
                  background: `linear-gradient(90deg, #1dbf73 ${sidebarData?.profile?.average_response_rate}%, #e8e8e8 0px)`,
                }}
              ></div>
              <span>{sidebarData?.profile?.average_response_rate}%</span>
            </div>
          </li>
          <li>
            <div className="title">Delivered on Time</div>
            <div className="rating">
              <div
                className="rate-bar"
                style={{
                  width: "60px",
                  borderRadius: "30px",
                  height: "8px",
                  marginRight: "10px",
                  background: `linear-gradient(90deg, #1dbf73 ${sidebarData?.profile?.work_percentage?.delivery_on_time}%, #e8e8e8 0px)`,
                }}
              ></div>
              <span>
                {sidebarData?.profile?.work_percentage?.delivery_on_time}%
              </span>
            </div>
          </li>
          <li>
            <div className="title">Order Completion</div>
            <div className="rating">
              <div
                className="rate-bar"
                style={{
                  width: "60px",
                  borderRadius: "30px",
                  height: "8px",
                  marginRight: "10px",
                  background: `linear-gradient(90deg, #1dbf73 ${sidebarData?.profile?.work_percentage?.order_completion}%, #e8e8e8 0px)`,
                }}
              ></div>
              <span>
                {sidebarData?.profile?.work_percentage?.order_completion}%
              </span>
            </div>
          </li>
        </ul>
        <div className="line-break"></div>
        <div className="other-info">
          <div className="title">
            Earned in {formatDate(moment.now(), "MMMM")}
          </div>
          <div className="value">
            ${sidebarData?.profile?.this_month_earning}
          </div>
        </div>
        <div className="other-info">
          <div className="title">Response Time</div>
          <div className="value">
            {sidebarData?.profile?.personal?.average_response_time}
          </div>
        </div>
      </div>
      <div className="link-section">
        <div className="title">
          Link your social Networks <i className="fa fa-info-circle"></i>
        </div>
        <ul>
          <li>
            <i
              className={`fab fa-google ${googleStatus ? "googleLogo" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`fab fa-dribbble ${
                dribbbleStatus ? "dribbbleLogo" : ""
              }`}
            ></i>
          </li>
          <li>
            <i
              className={`fab fa-github ${githubStatus ? "githubLogo" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`fab fa-facebook-f ${
                facebookStatus ? "facebookLogo" : ""
              }`}
            ></i>
          </li>
          <li>
            <i
              className={`fab fa-vimeo-v ${vimeoStatus ? "vimeoLogo" : ""}`}
            ></i>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
