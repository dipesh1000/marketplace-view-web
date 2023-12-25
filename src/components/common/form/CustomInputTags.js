import React, { useEffect, useRef, useState } from "react";
import { getIn } from "formik";
import "./CustomInput.css";

function CustomInputTags({
  field,
  form,
  helperText,
  suggestion,
  search_tags,
  placeholder,
  setData,
}) {
  const [inputVal, setInputVal] = useState(
    search_tags ? search_tags?.map((item) => item.tag) : []
  );
  const [count, setCount] = useState(0);
  const hiddenInput = useRef(null);
  const inputRef = useRef(null);
  const suggestList = useRef(null);
  const [suggestionList, setSuggestionList] = useState([]);
  // eslint-disable-next-line
  const [inputWidth, setInputWidth] = useState(15);

  const addForm = (val) => {
    let formVal = form.values[`${field.name}`];
    formVal.push(val);
    form.setFieldValue(field.name, formVal);
  };
  const removeForm = (val) => {
    let formVal = form.values[`${field.name}`];
    let newFormVal = [];
    if (formVal.includes(val)) {
      newFormVal = formVal.filter((elm) => elm !== val);
    } else {
      let id;
      // eslint-disable-next-line
      suggestion.map((elm) => {
        if (elm.value === val) id = elm.id;
      });
      newFormVal = formVal.filter((elm) => elm !== id);
    }

    form.setFieldValue(field.name, newFormVal);
  };
  const check = (val) => {
    setSuggestionList([]);
    setFocusCount(0);
    setInputWidth(15);
    return inputVal.includes(val);
  };
  const [focusCount, setFocusCount] = useState(0);
  const keyCheck = (e) => {
    if (e.keyCode === "40" && focusCount < suggestionList.length) {
      setFocusCount(focusCount + 1);

      suggestList.current.children[focusCount].classList.add("active");
      if (focusCount > 0) {
        suggestList.current.children[focusCount - 1].classList.remove("active");
      }
    }
    if (e.keyCode === "38") {
      if (focusCount > 1) {
        setFocusCount(focusCount - 1);

        suggestList.current.children[focusCount - 2].classList.add("active");
        suggestList.current.children[focusCount - 1].classList.remove("active");
      }
    }
    if (e.keyCode === "13") {
      let selectVal = suggestList.current?.children[focusCount - 1]?.innerHTML;
      let key =
        suggestList.current?.children[focusCount - 1]?.getAttribute("value");

      if (selectVal) {
        if (!check(selectVal)) {
          let tempInput = inputVal;
          tempInput.push(selectVal);
          setInputVal(tempInput);
          addForm(key);
        }

        setCount(count + 1);
        e.target.value = "";
      }
    }
  };

  const handleSuggestion = (data) => {
    if (data.length >= 2) {
      setInputWidth(data.length * 12);
      const newArr =
        suggestion &&
        suggestion.filter((val) =>
          val.value
            .toLowerCase()
            .includes(data ? data.toLowerCase() : undefined)
        );
      setSuggestionList(newArr);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    handleSuggestion(e.target.value);
    setFocusCount(0);
    if (e.nativeEvent.data === ",") {
      let val = e.target.value.slice(0, -1);

      if (!check(val)) {
        let tempInput = inputVal;
        tempInput.push(val);
        setInputVal(tempInput);
        addForm(val);
      }

      setCount(count + 1);
      e.target.value = "";
    }
  };
  const handleRemove = (index, item) => {
    let tempInput = inputVal.filter((elm, i) => i !== index);
    setInputVal(tempInput);
    removeForm(item);
    setCount(count + 1);
  };
  const addList = (e) => {
    let val = e.target.innerHTML;
    let key = e.target.getAttribute("value");
    if (!check(val)) {
      let tempInput = inputVal;
      tempInput.push(val);
      setInputVal(tempInput);
      addForm(key);
    }
    inputRef.current.value = "";
  };

  const handleWrap = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    if (inputVal.length === 0) {
      form.values[field.name] = [];
    }
    // eslint-disable-next-line
  }, [count]);

  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      <input type="text" ref={hiddenInput} className="form-control input-tag" />
      <div className="input-tag-wrapper" onClick={handleWrap}>
        {inputVal &&
          inputVal.map((item, index) => (
            <span className="input-tag-span" key={index}>
              {item}
              <span
                className="input-remove"
                onClick={() => handleRemove(index, item)}
              >
                <i className="fa fa-times"></i>
              </span>
            </span>
          ))}
        <div className="input-wrap">
          <input
            onKeyUp={keyCheck}
            onChange={handleChange}
            ref={inputRef}
            // style={{width: `${inputWidth}px`}}
            style={{ width: "100%" }}
            type="text"
            className="hidden-input"
            placeholder={placeholder || ""}
          />
          {suggestionList.length !== 0 && (
            <ul tabIndex="1" ref={suggestList}>
              {suggestionList &&
                suggestionList.map(
                  (item, index) =>
                    index < 6 && (
                      <li
                        tabIndex="1"
                        onClick={addList}
                        value={item.id}
                        key={item.id}
                      >
                        {item.value}
                      </li>
                    )
                )}
            </ul>
          )}
        </div>
      </div>
      <div className="helpertext">{helperText}</div>
      <div
        className="errors"
        style={{
          color: "#f53e3e",
          fontSize: "12px",
          transform: "translateY(-15px)",
        }}
      >
        {errorText}
      </div>
    </>
  );
}

export default CustomInputTags;
