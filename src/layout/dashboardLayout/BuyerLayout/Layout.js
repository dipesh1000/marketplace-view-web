import React from "react";
import Footer from "../../../components/Footer/Footer";
import LoggedInNavbar from "../../homeLayout/Navbar/LoggedInNavbar";
// import "./DashboardLayout.css";

const BuyerLayout = ({ children }) => {
  return (
    <>
      <LoggedInNavbar orderStatus={true} />
      {children}
      <Footer />
    </>
  );
};
export default BuyerLayout;
