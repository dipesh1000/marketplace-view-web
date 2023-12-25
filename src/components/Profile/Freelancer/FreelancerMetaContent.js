import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

function FreelancerMetaContent({ data }) {
  return (
    <div className="meta-content">
      <div className="meta-content-head">
        <h5>Description</h5>
      </div>
      <div className="meta-content-body">
        <p>{data?.profile?.personal?.description}</p>
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Language</h5>
      </div>
      <div className="meta-content-body">
        {data?.profile?.personal?.language?.map((item, index) => (
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
        {data?.profile?.linked_accounts?.map((item, index) => (
          <Button className="conent-item" key={item?.id}>
            <FaPlus />
            {item.provider_name.charAt(0).toUpperCase() +
              item.provider_name.slice(1)}
          </Button>
        ))}
      </div>
      <hr />
      <div className="meta-content-head">
        <h5>Skills</h5>
      </div>
      <div className="meta-content-body">
        <div className="content-skills">
          {data?.profile?.professional?.skills?.map((skill, index) => (
            <React.Fragment key={index}>
              <Link to="#">{skill.name}</Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default FreelancerMetaContent;
