import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BreadCrumb.css";

function BreadCrumb({ data, gigs }) {
  const parentCategory = gigs?.category?.parent?.slug;
  return (
    <>
      <Breadcrumb className="OverrideBread">
        {/* {data?.map((item, index) => {
					return ( */}
        <>
          <Breadcrumb.Item>
            <Link to={`/categories/${parentCategory}`}>
              {gigs?.category?.parent?.title}
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to={`/categories/${parentCategory}/${gigs?.category?.slug}`}>
              {gigs?.category?.title}
            </Link>
          </Breadcrumb.Item>
        </>
        {/* );
				})} */}
      </Breadcrumb>
    </>
  );
}

export default BreadCrumb;
