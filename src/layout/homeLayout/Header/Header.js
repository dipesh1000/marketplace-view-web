import React, { useEffect, useState } from "react";
import Navbars from "../Navbar/Navbar";
import PrimaryCat from "../PrimaryCat/PrimaryCat";
import { useSelector } from "react-redux";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";

function Header() {
  // eslint-disable-next-line
  const [openLogin, setOpenLogin] = useState(false);
  // eslint-disable-next-line
  const [openRegister, setOpenRegister] = useState(false);

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };
  const handleRegisterOpen = () => {
    setOpenRegister(true);
  };
  let listener = null;
  const [scrollState, setScrollState] = useState("top");

  useEffect(() => {
    // eslint-disable-next-line
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 120) {
        if (scrollState !== "active") {
          setScrollState("active");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {auth.isAuthenticated || auth.token ? (
        <LoggedInNavbar auth={auth} />
      ) : (
        <Navbars
          handleOpenLogin={handleLoginOpen}
          handleOpenRegister={handleRegisterOpen}
          scrollState={scrollState}
        />
      )}

      <PrimaryCat scrollState={scrollState} />
    </>
  );
}

export default Header;
