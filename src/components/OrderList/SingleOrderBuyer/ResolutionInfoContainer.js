import React from "react";
import ResolutionShow from "./ResolutionShow";

function ResolutionInfoContainer({ item }) {
  return (
    <>
      {item?.approved_at ? (
        <ResolutionShow
          status="approved"
          date={item?.approved_at}
          type={item?.type}
        />
      ) : item?.rejected_at ? (
        <ResolutionShow
          status="rejected"
          date={item?.rejected_at}
          type={item?.type}
        />
      ) : null}
    </>
  );
}

export default ResolutionInfoContainer;
