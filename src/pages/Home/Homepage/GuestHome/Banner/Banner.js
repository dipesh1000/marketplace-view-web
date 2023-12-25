// import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MainSearch from "../../../../../components/MainSearch/MainSearch";
import MainSider from "../../../../../components/MainSider/MainSider";
import styles from "./Banner.module.css";
import "../../../main.css";
// import { testApi } from "../../../../../api/testApi";
// import { axiosInstance } from "../../../../../utils/AxiosInstance";
// import axios from "axios";

function Banner() {
  // const [testData, setTestData] = useState();
  // useEffect(() => {
  //   axios
  //     .get("http://192.168.10.69:8000/api/seller/gig/media/download", {

  //       responseType: 'arraybuffer'
  //     })

  //     //   .then((response) => response.blob())
  //     .then((response) => {
  //       const blob = response.data;
  //       // Create blob link to download
  //       // const url = window.URL.createObjectURL(new Blob([response.data]));
  //       // setTestData(url)
  //       // const data = response.data;
  //       //   if (!(response.data instanceof Blob)) return console.log("not a blob");
  //       const blobb = new Blob([blob], {
  //         type: response?.headers["content-type"],
  //       });
  //       // // Append to html link element page
  //       const fileUrl = URL.createObjectURL(blobb);
  //       const w = window.open(fileUrl, "_blank");
  //       w && w.focus();
  //     });
  // }, []);
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className="header-navbar-wrapper">
          <MainSider />
          {/* <a href={testData} target="_blank" download={testData}>
            download
          </a> */}
          <Container>
            <MainSearch />
          </Container>
        </div>
      </div>
    </>
  );
}

export default Banner;
