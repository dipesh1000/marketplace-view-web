import React from "react";
import FrontBannerComponent from "../../../../../components/userHome/FrontBannerComponent";
import useTitle from "../../../../../utils/useTitle";
import "./FrontBanner.css";

const slides = [
  {
    id: 1,
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto/attachments/generic_asset/asset/5000bfd1ed312e59af85d2c34fda8280-1567435825397/Store3%20-%20headerX2.jpg",
    text: "Referred your friends yet?",
    refer: "Refer a friend and earn up to $100.",
  },
  {
    id: 2,
    url: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/a90eb10cd310d5d0bfec6cce70bc3f36-1592992992210/Find_The_Right_Freelancer_Desktop.jpg",
    text: "Build buzz with verified influencers",
    refer: "Work with an influencer to bring your brand to the masses.",
  },
  {
    id: 3,
    url: "https://fiverr-res.cloudinary.com/attachments/generic_asset/asset/73b2daae5427dd8750ab5c9ffa656dac-1586860986936/Dropshipping_LIHP_Banner-desktop-988x233.jpg",
    text: "Less moving. More followers.",
    refer: "Grow your YouTube without leaving home.",
  },
];

function FrontBanner() {
  useTitle("Fuchas - Freelance Services Marketplace for Businesses");
  return <FrontBannerComponent slides={slides} />;
}

export default FrontBanner;
