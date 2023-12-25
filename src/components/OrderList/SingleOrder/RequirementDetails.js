import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { HiOutlineClipboardList } from "react-icons/hi";
import AccordionSection from "./AccordionSection";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";

function RequirementDetails({ requirements, status, buyer, orderId }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="RequirementDetails">
      <Card>
        <div className="cards-group">
          <div className="single-card item pl-30">
            <div className="title_box">
              <HiOutlineClipboardList className="single-icons" />
              <div className="title_contains">
                {status?.slug === "incomplete" ? (
                  <>
                    <h6 className="text-heading">
                      Order Requirements Not Submitted Yet{" "}
                    </h6>
                    <div className="text-subheading">
                      Your buyer has not filled the requirements
                      <p className="skip-link">
                        Do you want to skip requirements?
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="text-heading">Order Requirements</h6>
                    <p className="text-subheading">
                      Your buyer has filled all the requirements
                      <span onClick={handleToggle}>
                        {open ? "Hide" : "Show"} requirements{" "}
                        {open ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          {open ? (
            <div className="single-card item">
              <div className="dark_contain_box">
                <AccordionSection
                  requirements={requirements}
                  buyer={buyer}
                  orderId={orderId}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Card>
    </div>
  );
}

export default RequirementDetails;
