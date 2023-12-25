import React from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/styles.scss";

const NavLayout = ({ children, faq }) => {
  const { category_slug } = useParams();
  return (
    <div className="category-section">
      <nav className="help-center-breadcrumbs">
        <ul className="help-center-breadcrumbs-links">
          <li>
            <span>
              <Link to="/support">
                <span className="help-center-breadcrumbs-title">
                  Help Center
                </span>
              </Link>
              <span className="arrow">&gt;</span>
            </span>
          </li>
          <li>
            <span>
              <Link to="/support">
                <span className="help-center-breadcrumbs-title">
                  {faq?.parentCategory?.segment === "for_buyer"
                    ? "Buyer"
                    : "Seller"}
                </span>
              </Link>
              <span className="arrow">&gt;</span>
            </span>
          </li>
          <li>
            <span>
              <Link to={`/support/${category_slug}`}>
                <span className="help-center-breadcrumbs-title">
                  {faq?.parentCategory?.title}
                </span>
              </Link>
              <span className="arrow">&gt;</span>
            </span>
          </li>
          {faq?.question?.category?.title && (
            <li>
              <span>
                {/* <Link to={nav.link}> */}
                <span className="help-center-breadcrumbs-title">
                  {faq?.question?.category?.title}
                </span>
                {/* </Link> */}
                <span className="arrow">&gt;</span>
              </span>
            </li>
          )}
          {faq?.question?.question && (
            <li>
              <span>
                <span className="help-center-breadcrumbs-title">
                  {faq?.question?.question}
                </span>
                <span className="arrow">&gt;</span>
              </span>
            </li>
          )}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default NavLayout;
