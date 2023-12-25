import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import NavLayout from "./NavLayout";
import { fetchFaqChild } from "./redux/Action";

const SupportCategory = () => {
  const dispatch = useDispatch();
  const { category_slug } = useParams();
  const { faq, isLoading } = useSelector((state) => state.faq);
  useEffect(() => {
    category_slug && dispatch(fetchFaqChild(category_slug));
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <ContainerSpinner backgroundColor="#fff" />
      ) : (
        <NavLayout faq={faq}>
          <>
            <h2 className="help-center-header">
              {faq?.parent_category?.title}
            </h2>
            <ul className="help-center-category-links">
              <div className="row">
                {faq?.sub_categories?.map((category) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 pb-4 mb-4"
                    key={category?.id}
                  >
                    <div>
                      <li>
                        <Link to={`/support/${category_slug}`}>
                          <h5>{category?.title}</h5>
                        </Link>
                      </li>
                      <div className="child-questions">
                        {category?.questions?.map((question) => (
                          <Link
                            to={`/support/${category_slug}/${question?.slug}`}
                            key={question?.id}
                          >
                            <span>{question?.question}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ul>
          </>
        </NavLayout>
      )}
    </>
  );
};

export default SupportCategory;
