import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavLayout from "./NavLayout";
import { fetchFaqChild } from "./redux/Action";
const categoryLinks = [
  {
    name: "I'm having issues with my payment",
    link: "/:faq_slug",
  },
  {
    name: "Viewing your account balance",
    link: "/:faq_slug",
  },
  {
    name: "Available Payment Methods",
    link: "/:faq_slug",
  },
  {
    name: "Fiverr Refunds",
    link: "/:faq_slug",
  },
  {
    name: "Using your local currency on Fiverr",
    link: "/:faq_slug",
  },
  {
    name: "Using your Fiverr Balance and how it is applied",
    link: "/:faq_slug",
  },
];

const SupportCategorySingle = () => {
  const dispatch = useDispatch();
  const { category_slug } = useParams();

  useEffect(() => {
    category_slug && dispatch(fetchFaqChild(category_slug));
  }, [dispatch]);
  return (
    <NavLayout>
      <h2 className="help-center-header">Payments</h2>
      <ul className="help-center-category-links">
        {categoryLinks.map((category, index) => (
          <li key={category?.id}>
            <Link to="/support/:category_slug/:faq_slug">
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </NavLayout>
  );
};

export default SupportCategorySingle;
