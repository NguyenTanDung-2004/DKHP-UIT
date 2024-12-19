import React from "react";
import "./DieuChinhHocPhan.css";

const DieuChinhHocPhan = () => {
	return (
		<div className="container admin-study-section">
			<div className="main-section">
				<form className="admin-form">
					<h3>Ngày bắt đầu đăng ký</h3>
					<div className="form-group">
						<div class="form-group__item">
							<label for="startDate">Ngày bắt đầu:</label>
							<input type="date" id="startDate" name="startDate" />
						</div>
						<div class="form-group__item">
							<label for="endDate">Ngày kết thúc:</label>
							<input type="date" id="endDate" name="endDate" />
						</div>
					</div>
					<h3>Giờ bắt đầu đăng ký</h3>
					<div className="form-group">
						<div class="form-group__item">
							<label for="startTime">Giờ bắt đầu:</label>
							<input type="time" id="startTime" name="startTime" />
						</div>
						<div class="form-group__item">
							<label for="endTime">Giờ kết thúc:</label>
							<input type="time" id="endTime" name="endTime" />
						</div>
					</div>
					<h3>Các khóa được đăng ký hôm nay</h3>
					<ul className="course-list">
						<li>
							<input
								type="checkbox"
								id="course2020"
								name="courses[]"
								value="2020"
							/>{" "}
							Khóa 2020
						</li>
						<li>
							<input
								type="checkbox"
								id="course2021"
								name="courses[]"
								value="2021"
							/>{" "}
							Khóa 2021
						</li>
						<li>
							<input
								type="checkbox"
								id="course2022"
								name="courses[]"
								value="2022"
							/>{" "}
							Khóa 2022
						</li>
						<li>
							<input
								type="checkbox"
								id="course2023"
								name="courses[]"
								value="2023"
							/>{" "}
							Khóa 2023
						</li>
					</ul>
					<button type="submit">Xác nhận</button>
				</form>
			</div>
		</div>
	);
};

export default DieuChinhHocPhan;
