import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const DribbbleLogin = () => {
  const [hostName, setHostName] = useState();
  useEffect(() => {
    setHostName(window.location.origin);
  }, []);
  const client_id =
    "e3313765859917a2be311b9234226ded5a100f2020a0a596559301f3c98515d2";
  const { user } = useParams();
  return (
    <div>
      <Link
        to={{
          pathname: `https://dribbble.com/oauth/authorize?client_id=${client_id}&redirect_uri=${hostName}&state=${user}`,
        }}
        target="_top"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default DribbbleLogin;
