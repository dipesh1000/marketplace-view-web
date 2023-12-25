import React, { useState, useEffect } from "react";
// import { ProgressBar } from 'react-bootstrap'
import { useRouteMatch, Link } from "react-router-dom";
import "./style.scss";
import { MdKeyboardArrowRight } from "react-icons/md";

function SellerStep() {
  const { url } = useRouteMatch();
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
    return url.includes(`/${data}`);
  };

  const breadData = [
    {
      id: 1,
      title: "Personal Info",
      active: checkActive("personal_info"),
      completed: checkComplete(1),
      url: `personal_info`,
    },
    {
      id: 2,
      title: "Professional Info",
      active: checkActive("professional_info"),
      completed: checkComplete(2),
      url: `professional_info`,
    },
    {
      id: 3,
      title: "Linked Accounts",
      active: checkActive("linked_accounts"),
      completed: checkComplete(3),
      url: `linked_accounts`,
    },
    {
      id: 4,
      title: "Account Security",
      active: checkActive("account_security"),
      completed: checkComplete(4),
      url: `account_security`,
    },
  ];

  return (
    <>
      <div className="stepsNav">
        <div className="stepsNav_inner_one">
          {breadData.map((item, index) => (
            <Link to={item.url} key={index}>
              <div
                className={
                  item.active
                    ? "div-active"
                    : item.completed
                    ? "div-active"
                    : ""
                }
              >
                <span
                  className={
                    item.active
                      ? "span-active"
                      : item.completed
                      ? "span-active"
                      : null
                  }
                >
                  {item.id}
                </span>
                {item.title} {index !== 3 && <MdKeyboardArrowRight />}
              </div>
            </Link>
          ))}
        </div>
        {/* <div className={styles.stepsNav_inner_two}>
                    complection Rate: 60%
                    <ProgressBar className={styles.stepsNav_inner_two_inner} variant="warning" now={60} />
                </div> */}
      </div>
      {/* <div className={styles.stepsNav}>
				<div className={styles.stepsNav_inner_one}>
					{breadData.map((item, index) => (
						<Link to={item.url}>
							<div
								className={
									item.active
										? styles.active
										: item.completed
										? styles.active
										: console.log("s")
								}
							>
								<span
									className={
										item.active
											? styles.active
											: item.completed
											? styles.active
											: null
									}
								>
									{item.id}
								</span>
								{item.title} {index !== 3 && <MdKeyboardArrowRight />}
							</div>
						</Link>
					))}
				</div>
			</div> */}
    </>
  );
}

export default SellerStep;
