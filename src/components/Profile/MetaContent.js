import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function MetaContent() {
  const { data } = useSelector((state) => state.profile);

  return (
    <div className="meta-content">
      <div className="meta-content-head">
        <h5>Description</h5>
        {/* <Link to="/">Edit Descrition</Link> */}
      </div>
      <div className="meta-content-body">
        <p>{data?.personal?.description}</p>
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Language</h5>
        {/* <Link to="/">Add New </Link> */}
      </div>
      <div className="meta-content-body">
        {data?.personal?.language?.map((item, index) => (
          <div className="content-level" key={index}>
            <p>{item.value}</p>
            &nbsp;&nbsp; -<span>{item.proficiency}</span>
          </div>
        ))}
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Linked Accounts</h5>
      </div>
      <div className="meta-content-body">
        <Button className="conent-item">
          {data?.linked_accounts?.provider_name === "facebook" ? (
            <FaCheck />
          ) : (
            <FaPlus />
          )}
          Facebook
        </Button>
        <Button className="conent-item">
          {data?.linked_accounts?.provider_name === "facebook" ? (
            <FaCheck />
          ) : (
            <FaPlus />
          )}
          Facebook
        </Button>
        <Button className="conent-item">
          <FaPlus /> Dribbble
        </Button>
        <Button className="conent-item">
          <FaPlus /> Stack Overflow
        </Button>
        <Button className="conent-item">
          <FaPlus /> Git Hub
        </Button>
        <Button className="conent-item">
          <FaPlus /> Vimeo
        </Button>
        <Button className="conent-item">
          <FaPlus /> Twitter
        </Button>
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Skills</h5>
        {/* <Link to="/">Add New </Link> */}
      </div>
      <div className="meta-content-body">
        <div className="content-skills">
          {data?.professional?.skills?.map((skill, index) => (
            <React.Fragment key={index}>
              <Link to="#">{skill.name}</Link>
            </React.Fragment>
          ))}
        </div>
        {/* <span>Suggestions:</span>
            <div className="content-suggestion">
                <Link to="/">illustration</Link>
                <Link to="/">digital artwork</Link>
                <Link to="/">drawing</Link>
                <Link to="/">character design</Link>
            </div> */}
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Education</h5>
        {/* <Link to="/">Add New </Link> */}
      </div>
      <div className="meta-content-body">
        {data?.professional?.education?.map((item, index) => (
          <React.Fragment>
            <div className="content-level">
              <p className="level-text">{item.title}</p>
              &nbsp;&nbsp;-
              <span>{item.major}</span>
            </div>
            <div className="baseLevel">
              <span>
                {item.college}, {item.country}, Graduated {item.year}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Certification</h5>
        {/* <Link to="/">Add New </Link> */}
      </div>
      <div className="meta-content-body">
        {data?.professional?.certifications?.map((item, index) => (
          <div className="content-level" key={index}>
            <p>{item.award}</p>
            <br />
            <span>
              {item.award_from}, {item.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetaContent;
