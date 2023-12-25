import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import styles from "./style/BreadCrumb.module.scss";
function GigBreadCrumb() {
  const { gigSteps } = useSelector((state) => state.gig);
  let { url, params } = useRouteMatch();
  const [currentId, setCurrentId] = useState(1);

  const checkComplete = (id) => {
    if (id < currentId) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    breadData.map(
      (list, index) => list.active === true && setCurrentId(index + 1)
    );
    // eslint-disable-next-line
  }, []);
  const checkActive = (data) => {
    return url.includes(`${params?.slug}/${data}`);
  };
  const checkValid = (slug) => {
    return gigSteps && gigSteps[slug];
  };
  const breadData = [
    {
      id: 1,
      title: "Overview",
      active: checkActive("edit_gigs"),
      completed: checkComplete(1),
      valid: checkValid("overview"),
      slug: "overview",
      url: `edit_gigs`,
    },
    {
      id: 2,
      title: "Pricing",
      slug: "pricing",
      active: checkActive("gigs_pricing"),
      completed: checkComplete(2),
      valid: checkValid("pricing"),
      url: `gigs_pricing`,
    },
    {
      id: 3,
      title: "Description & FAQ",
      slug: "description_faqs",
      active: checkActive("gigs_description_faq"),
      completed: checkComplete(3),
      valid: checkValid("description_faqs"),
      url: `gigs_description_faq`,
    },
    {
      id: 4,
      slug: "requirements",
      title: "Requirements",
      active: checkActive("gigs_requirement"),
      completed: checkComplete(4),
      valid: checkValid("requirements"),
      url: `gigs_requirement`,
    },
    {
      id: 5,
      title: "Gallery",
      slug: "gallery",
      active: checkActive("gigs_gallery"),
      completed: checkComplete(5),
      valid: checkValid("gallery"),
      url: `gigs_gallery`,
    },
    {
      id: 6,
      title: "Publish",
      active:
        checkActive("gigs_publish") ||
        url.includes(`${params?.slug}/${"gigs_complete"}`),
      completed: checkComplete(6),
    },
  ];
  return (
    <div className={styles.breadcrumb}>
      <ul>
        {breadData.map((item, index) => (
          <li key={item?.id}>
            <Link
              to={item.valid ? item.url : "#"}
              className={
                item.active
                  ? styles.active
                  : item.complete
                  ? styles.complete
                  : null
              }
            >
              {item.active ? (
                <span className={styles.active_icons}>
                  <i className="fa fa-map-marker-alt"></i>
                </span>
              ) : item.completed ? (
                <span className={styles.active_icons}>
                  <i className="fa fa-check"></i>
                </span>
              ) : (
                <span className={styles.icons}>{index + 1}</span>
              )}

              {item.title}

              <span className={styles.arrow}>{">"}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <div className={styles.save_preview}>
				<div className={styles.save}>Save</div>|
				<div className={styles.save}>Save & Preview</div>
			</div> */}
    </div>
  );
}

export default GigBreadCrumb;
