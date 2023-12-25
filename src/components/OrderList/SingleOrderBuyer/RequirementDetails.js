import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { HiOutlineClipboardList } from "react-icons/hi";
import AccordionSection from "./AccordionSection";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import RequirementForm from "./RequirementForm";

function RequirementDetails({ requirements, seller, orderId, status, slug }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="RequirementDetails" id="requirement">
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
                      Your buyer has not filled out the requirements
                      <p className="skip-link">Do you wanna Skip it?</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="text-heading">Order Requirements</h6>
                    <p className="text-subheading">
                      Your buyer has filled out the requirements
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
          {status?.slug === "incomplete" ? (
            <RequirementForm
              orderRequirement={requirements}
              orderId={orderId}
              slug={slug}
            />
          ) : open ? (
            <div className="single-card item ">
              <div className="dark_contain_box">
                <AccordionSection
                  requirements={requirements}
                  seller={seller}
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
