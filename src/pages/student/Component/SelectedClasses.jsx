import React from "react";
import "./SelectedClasses.css";

const SelectedClasses = ({
	selectedClasses,
	handleDeselectClass,
	type,
	handleFunct,
}) => {
	// Tính tổng số lớp học và tín chỉ
	const totalClasses = selectedClasses.length;
	const totalCredits = selectedClasses.reduce(
		(sum, item) => sum + item.credits,
		0
	);

	return (
		<div className="selected-classes">
			<div className="selected-classes__view">
        <h4>Đã chọn</h4>
        <p>
          {totalClasses} lớp, {totalCredits} tín chỉ
        </p>
        <ul className="view-list">
          {selectedClasses.map((item) => (
            <li key={item.classCode} className="view-list__tag">
              {item.classCode}
              <div
                onClick={() => handleDeselectClass(item.classCode)}
                className="remove-icon"
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
			<div className="selected-classes__action">
				<button onClick={handleFunct} className={`register-btn ${type}`}>
				{type === 'cancel' ? 'Hủy đăng ký' : ( type === 'submit' ? 'Đăng ký' : '')}
				</button>
			</div>
		</div>
	);
};

export default SelectedClasses;
