import React from "react";
import { useDispatch } from "react-redux";
import { fetchGigByCategory } from "./redux/Action";

function Pagination({ slug, data, filter_data }) {
  const dispatch = useDispatch();
  const handlePagination = (page_no) => {
    dispatch(fetchGigByCategory(slug, filter_data, page_no));
  };
  return (
    <>
      <div className="pagination-wrapper">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            {[...Array(data?.total_pages).keys()].map((index) => (
              <li
                key={index}
                className={`page-item ${
                  data?.current_page === index + 1 && "active"
                }`}
              >
                {/* eslint-disable-next-line */}
                <a
                  className="page-link"
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" href="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
