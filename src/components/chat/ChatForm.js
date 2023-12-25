import React, { useEffect } from "react";
import { BsPaperclip } from "react-icons/bs";
import * as yup from "yup";
import { Field } from "formik";
import { useDispatch } from "react-redux";
import { serialize } from "object-to-formdata";
import { useForm } from "../common/form/useForm";
import { changeSeen, sendChatMessage } from "./redux/Action";
import { openModal } from "../../redux/Modal/Modal.action";

function ChatForm({ username, chatList, user }) {
  const dispatch = useDispatch();

  const initialValues = {
    file: "",
    chat_room_id: username,
    message: "",
  };
  const validationSchema = yup.object({
    file: yup.object().nullable(),
    message: yup.string(),
  });

  const handleCreateOffer = () => {
    dispatch(openModal("selectGig", username));
  };

  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      values,
      options // optional
    );
    (values?.message?.length > 1 ||
      (values?.message?.length <= 1 && values?.file?.name)) &&
      dispatch(sendChatMessage(formData, username));
  };
  const { CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <CustomForm>
        <Field
          component={MessageBox}
          dispatch={dispatch}
          username={username}
          chatList={chatList}
          user={user}
        />
        <div className="action-buttons">
          <div className="actions">
            <Field component={Attachment} />
            {user?.role !== "buyer" && (
              <span className="create-offer-btn" onClick={handleCreateOffer}>
                Create an Offer
              </span>
            )}
          </div>
          <Field component={FileView} />
          <button className="send">Send</button>
        </div>
      </CustomForm>
    </>
  );
}

export default ChatForm;

const MessageBox = ({
  form,
  dispatch,
  username,
  chatList,
  user,
  focusInput,
}) => {
  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };
  const handleEnter = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      const options = {
        indices: true,
      };
      const formData = serialize(
        form.values,
        options // optional
      );
      (form?.values?.message?.length > 1 ||
        (form?.values?.message?.length <= 1 && form?.values?.file?.name)) &&
        dispatch(sendChatMessage(formData, username));
    }
  };
  const handleFocus = (e) => {
    const currentChat = chatList?.filter((item) => item.id === username)[0];
    if (currentChat) {
      if (
        currentChat?.latestMessage?.read_at == null &&
        currentChat?.latestMessage?.sender?.id !== user?.id
      ) {
        dispatch(changeSeen(username));
      }
    }
  };

  return (
    <textarea
      id=""
      cols="30"
      rows="1"
      autoFocus
      name="message"
      ref={focusInput}
      onFocus={handleFocus}
      value={form?.values?.message.trimStart()}
      onKeyPress={(e) => handleEnter(e)}
      onChange={handleChange}
    ></textarea>
  );
};

const FileView = ({ form }) => {
  const handleDelete = () => {
    form.setFieldValue(`file`, "");
  };
  useEffect(() => {}, [form.values]);
  return form.values?.file?.name ? (
    <div className="chat-upload-container chat-solid">
      <div className="chat-name">
        <i className="far fa-check-circle chat-box-icon"></i>"
        <span className="chat-file-name">{form.values?.file?.name}</span>"
      </div>
      <div className="chat-delete">
        <i className="fa fa-trash" onClick={handleDelete}></i>
      </div>
    </div>
  ) : null;
};

const Attachment = ({ form }) => {
  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.files[0]);
  };
  return (
    <label className="custom-file-upload">
      <input type="file" name="file" onChange={handleChange} />
      <BsPaperclip />
    </label>
  );
};
