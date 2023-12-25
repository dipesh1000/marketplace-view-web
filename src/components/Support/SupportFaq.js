import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavLayout from "./NavLayout";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { fetchFaqSingle } from "./redux/Action";
import { useParams } from "react-router";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import { Link } from "react-router-dom";

const SupportFaq = () => {
  const dispatch = useDispatch();
  const { faq, isLoading } = useSelector((state) => state.faq);
  const [id, setId] = useState(faq?.question?.id);
  const [parentId, setParentId] = useState(faq?.question?.category?.id);
  const { category_slug, faq_slug } = useParams();

  useEffect(() => {
    faq_slug && dispatch(fetchFaqSingle(faq_slug));
  }, [dispatch, faq_slug]);
  return (
    <>
      {isLoading ? (
        <ContainerSpinner backgroundColor="#fff" />
      ) : (
        <NavLayout faq={faq}>
          <div className="faq-section">
            <div className="sidebar">
              {faq?.subCategories?.map((item) => (
                <Accord
                  key={item?.id}
                  items={item}
                  id={id}
                  faq={faq}
                  faq_slug={faq_slug}
                  parentId={parentId}
                  setId={setId}
                  setParentId={setParentId}
                  category_slug={category_slug}
                />
              ))}
            </div>
            <div className="content">
              <h2 className="help-center-header">{faq?.question?.question}</h2>
              <div className="help-center-article">
                {/* <h3 className="help-center-title">{faq?.question?.question}</h3> */}
                {/* <ul class="help-center-list"> */}
                <div
                  dangerouslySetInnerHTML={{ __html: faq?.question?.answer }}
                />
                {/* </ul> */}
              </div>
            </div>
          </div>
        </NavLayout>
      )}
    </>
  );
};

export default SupportFaq;

const Accord = ({
  items,
  category_slug,
  faq_slug,
  id,
  faq,
  parentId,
  setId,
  setParentId,
}) => {
  const [show, setShow] = useState(
    faq_slug &&
      (items?.id?.toString() === parentId?.toString() ||
        items?.id?.toString() === faq?.question?.category?.id?.toString())
      ? true
      : false
  );

  const handleClick = (itemId, itemParentId) => {
    setId(itemId);
    setParentId(itemParentId);
  };

  return (
    <div className="sidebar-links">
      <div onClick={() => setShow(!show)} className="sidebar-name">
        {items?.title}
        {items?.questions?.length ? (
          show ? (
            <RiArrowUpSLine />
          ) : (
            <RiArrowDownSLine />
          )
        ) : (
          ""
        )}
      </div>
      {show &&
        items?.questions?.map((item) => (
          <Link to={`/support/${category_slug}/${item?.slug}`} key={item?.id}>
            <div
              className={`sidebar-children ${
                (item?.id?.toString() === id?.toString() ||
                  item?.id?.toString() === faq?.question?.id?.toString()) &&
                "activeFaq"
              }`}
              onClick={() => handleClick(item?.id, items?.id)}
            >
              {item?.question}
            </div>
          </Link>
        ))}
    </div>
  );
};
