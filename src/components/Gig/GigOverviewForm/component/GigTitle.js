import React, { useEffect, useRef } from "react";

function GigTitle({ CustomTextarea, field }) {
  const will = useRef();
  const handleoverflow = (height) => {
    will.current.style.transform = `translateY(${height}px)`;
  };

  useEffect(() => {
    const elem = document.getElementById("customtext");
    if (elem.clientHeight < elem.scrollHeight)
      handleoverflow(115 - elem.scrollHeight);
    else handleoverflow(0);
  }, [field.value.title]);

  return (
    <div className="textarea-container">
      <CustomTextarea
        maxLength="80"
        counter
        max="80"
        maxText="max"
        id="customtext"
        className="custom-text"
        name="title"
        placeholder="do something I'm really good at"
      />
      <div className="i-will" ref={will}>
        I will
      </div>
    </div>
  );
}

export default GigTitle;
