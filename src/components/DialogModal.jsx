import React, { useState, useRef } from "react";
import "./DialogModal.css";

const DialogModal = ({ typeDialog, dialogFunction, closeDialog }) => {
  const inputRef = useRef(null); // Ref để thao tác với input
  const dialogText =
    typeDialog === "getCode"
      ? {
          title: "Quên mật khẩu?",
          label: "Vui lòng nhập mã số sinh viên ",
          placeholder: "Mã số sinh viên",
          button: "Gửi mã xác thực",
        }
      : typeDialog === "submitCode"
      ? {
          title: "Xác nhận",
          label: "Vui lòng nhập mã xác nhận được gửi qua email sinh viên",
          placeholder: "Mã xác nhận",
          button: "Xác Nhận",
        }
      : "";

  const [showError, setShowError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChangeValue = (event) => setInputValue(event.target.value);

  const handleSubmit = () => {
    if (!dialogFunction(inputValue)) {
      setShowError(true);
      setInputValue(""); // Xóa giá trị input
      inputRef.current?.focus(); // Tự động focus lại input
    } else {
      setShowError(false);
			setInputValue(""); // Xóa giá trị input
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <span className="modal-close" onClick={closeDialog}>
          <i className="fa-solid fa-xmark fa-lg"></i>
        </span>
        <span className="modal-title">
          {dialogText.title || ""}
          <div className="blanket-space"></div>
          {!showError ? (
            <span className="modal-label">{dialogText.label}</span>
          ) : (
            <div className="error-notification">
              {`${dialogText.placeholder} lỗi!`}
            </div>
          )}
        </span>
        <input
          ref={inputRef} // Gán tham chiếu input
          type="text"
          className="input-data"
          name="input-value"
          value={inputValue} // Giá trị điều khiển bởi state
          placeholder={dialogText.placeholder}
          onChange={handleChangeValue}
        />
        <button onClick={handleSubmit} className="modal-submit">
          {dialogText.button}
        </button>
      </div>
    </div>
  );
};

export default DialogModal;
