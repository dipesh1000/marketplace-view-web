import React, { useRef, useEffect } from "react";
import { FaMagic } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchSearch } from "./redux/Action";
import styles from "../../layout/homeLayout/Navbar/Navbar.module.css";
import { AiFillClockCircle } from "react-icons/ai";

const SearchResults = ({
  searchDiv,
  setSearchDiv,
  searchWord,
  setSearchWord,
  mainSearch,
}) => {
  const dispatch = useDispatch();
  const showRef = useRef();
  const history = useHistory();
  const { searchResults, searchLoading } = useSelector((state) => state.search);

  const makeBold = (item, keyword) => {
    var reg = new RegExp(keyword, "g");
    return item.replace(reg, `<b style="color: #282828;">` + keyword + "</b>");
  };

  const handleSearchClick = (item, search) => {
    setSearchWord(item);
    history.push(`/search/${item}`);
    search === "user" && history.push(`/${item}`);
    var existing = localStorage.getItem("search");
    existing = existing ? existing.split(",") : [];
    search !== "user" && existing.push(item);
    localStorage.setItem("search", existing);
    setSearchDiv(false);
  };

  const handleClear = () => {
    localStorage.clear();
    setSearchDiv(false);
  };

  const recentSearches = localStorage.getItem("search");
  function replaceCommaLine(data) {
    let dataToArray = data?.split(",")?.map((item) => item.trim());
    return dataToArray;
  }

  let previousSearches = replaceCommaLine(recentSearches);
  const unique = previousSearches?.filter((v, i, a) => a.indexOf(v) === i);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchWord.length > 2 && dispatch(fetchSearch(searchWord));
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchWord, dispatch]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showRef?.current?.contains(e.target)) {
        setSearchDiv(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line
  }, [searchDiv]);

  return (
    <div ref={showRef}>
      {searchDiv && (
        <div className={mainSearch ? styles.mainSearchDiv : styles.searchDiv}>
          <ul>
            {searchWord && searchWord.length > 2 ? (
              <>
                <li>
                  <div className={styles.searchGigs}>
                    <div>
                      <FaMagic />
                      <span>Services</span>
                      {searchLoading ? (
                        // <ContainerSpinner
                        // 	height='100px'
                        // 	backgroundColor='#fff'
                        // />
                        ""
                      ) : (
                        <ul>
                          {searchResults?.data?.tags?.length ? (
                            searchResults?.data?.tags
                              ?.slice(0, 6)
                              ?.map((item) => (
                                <li
                                  key={item?.id}
                                  onClick={() => handleSearchClick(item?.tag)}
                                  dangerouslySetInnerHTML={{
                                    __html: makeBold(
                                      item?.tag?.toLowerCase(),
                                      searchWord
                                    ),
                                  }}
                                ></li>
                              ))
                          ) : (
                            <li style={{ color: "#1dbf73 " }}>
                              Sorry, no results with that keyword.
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.searchUser}>
                    <div>
                      <IoPerson />
                      <span>Users</span>
                      <ul>
                        {searchResults?.data?.sellers
                          ?.slice(0, 3)
                          ?.map((item) => (
                            <li
                              key={item?.id}
                              onClick={() =>
                                handleSearchClick(item?.username, "user")
                              }
                              dangerouslySetInnerHTML={{
                                __html: makeBold(
                                  item?.username?.toLowerCase(),
                                  searchWord
                                ),
                              }}
                            ></li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <div className={styles.searchUser}>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <AiFillClockCircle />
                        <span>Recent Searches</span>
                      </div>
                      <div style={{ cursor: "pointer" }} onClick={handleClear}>
                        Clear
                      </div>
                    </div>
                    {unique?.length ? (
                      <ul>
                        {unique?.map((data) => (
                          <li onClick={() => handleSearchClick(data)}>
                            {data}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul>
                        <li>No Recent Searches.</li>
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
