import React from "react";
import './DashboardLayout.css'
import Footer from "../../components/Footer/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <>
     
      {children}
      <Footer />
    </>
  );
};
export default DashboardLayout;
