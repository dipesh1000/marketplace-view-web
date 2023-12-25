import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getTempGigList } from "../../../../components/userHome/redux/Action";
import HomeLayout from "../../../../layout/homeLayout/HomeLayout";
import FrontBanner from "./FrontBanner/FrontBanner";
import FrontBoxBanner from "./FrontBanner/FrontBoxBanner";
import EditorPicksLists from "./Gigs/EditorPicksList";
import GigLists from "./Gigs/GigLists";
import axios from "axios";

function UserHome() {
  const [hostName, setHostName] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTempGigList());
    setHostName(window.location.origin);
  }, [dispatch]);

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");
  const user = new URLSearchParams(search).get("state");
  const authorization_code =
    "ZjNkNTA2MjY1MTY5NzZlMGUyZmQ3YTg0MWYyOTI5YjBkMjFiZWY4YTpUYUVHMFZYTWRudUVRMEJqU0hUTzh3MTY5dU5BeTFVUExqaEY3UUtscGNYNm5sOEJzK1FSd2l2d1g0a0Q4ejhxbFc0K1o4RmExODZiZkkwZitYNEVUZzZTV2Vvb2ZuVFZWbVFlWGQvUU0zNkh2TkxsQUhuRVVDSE1QZVk1MlNJNA==";

  let config = {
    headers: {
      Authorization: authorization_code,
      Accept: "application/vnd.vimeo.*+json;version=3.4",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  useEffect(() => {
    code &&
      (code?.length < 50
        ? axios
            .post(
              "https://api.vimeo.com/oauth/access_token",
              {
                grant_type: authorization_code,
                code: code,
                redirect_uri: hostName,
              },
              config
            )
            .then((res) => {
              console.log(res, "VIMEO");
              history.push(`/${user}`);
            })
            .catch((err) => console.log(err))
        : axios
            .post(
              "https://dribbble.com/oauth/token",
              {
                client_id:
                  "e3313765859917a2be311b9234226ded5a100f2020a0a596559301f3c98515d2",
                client_secret:
                  "6f9d6fc0303dbe04e0712ac2feee7351ef7bb126e1852ab4efe123ff7b08cf93",
                code: code,
                redirect_uri: hostName,
              },
              {
                headers: {
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                },
              }
            )
            .then((res) => {
              console.log(res, "DRIBBLE");
              history.push(`/${user}`);
            })
            .catch((error) => console.log(error)));
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   code &&
  //     (code?.length < 50
  //       ? dispatch(
  //           addPersonalInfo({
  //             step: "linked_accounts",
  //             provider: "vimeo",
  //             access_token: code,
  //           })
  //         )
  //       : dispatch(
  //           addPersonalInfo({
  //             step: "linked_accounts",
  //             provider: "dribbble",
  //             access_token: code,
  //           })
  //         ));
  //   // eslint-disable-next-line
  // }, []);

  return (
    <>
      <HomeLayout>
        <FrontBanner />
        <GigLists />
        <FrontBoxBanner />
        <EditorPicksLists />
      </HomeLayout>
    </>
  );
}

export default UserHome;
