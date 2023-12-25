import React from "react";
import { shallowEqual, useSelector } from "react-redux";

function GigsFaq() {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);

  const Accordion = ({ title, children }) => {
    const [isOpen, setOpen] = React.useState(false);
    return (
      <div className="accordion-wrapper">
        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {title}
        </div>
        <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="faqTitle">
        <h4>FAQ</h4>
      </div>
      <div className="wrapper">
        {!gigs?.faqs?.length
          ? "Sorry, no FAQ's for this seller."
          : gigs?.faqs?.map((faq, index) => (
              <Accordion key={index} title={faq.title}>
                {faq.description}
              </Accordion>
            ))}
      </div>
    </>
  );
}

export default GigsFaq;
