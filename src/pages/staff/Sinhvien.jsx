import React, { useState, useRef } from "react";
import "./Sinhvien.css";

const Sinhvien = () => {
	const students = [
		{
			id: 1,
			mssv: "SV001",
			name: "Nguyễn Văn A",
			cccd: "123456789012",
			dob: "2000-01-01",
			province: "Hà Nội",
			district: "Hoàn Kiếm",
			commune: "Phường 1",
			currentAddress: "Số 10, Phố 1, Hà Nội",
			faculty: "Khoa Công Nghệ Thông Tin",
			major: "Công nghệ phần mềm",
		},
		{
			id: 2,
			mssv: "SV002",
			name: "Trần Thị B",
			cccd: "987654321098",
			dob: "1999-02-15",
			province: "Hải Phòng",
			district: "Lê Chân",
			commune: "Phường 2",
			currentAddress: "Số 15, Phố 2, Hải Phòng",
			faculty: "Khoa Kinh Tế",
			major: "Quản trị kinh doanh",
		},
		{
			id: 3,
			mssv: "SV003",
			name: "Lê Văn C",
			cccd: "111223344556",
			dob: "2001-03-20",
			province: "Đà Nẵng",
			district: "Hải Châu",
			commune: "Phường 3",
			currentAddress: "Số 20, Phố 3, Đà Nẵng",
			faculty: "Khoa Ngoại Ngữ",
			major: "Tiếng Anh",
		},
	];

	const [listStudentWidth, setListStudentWidth] = useState(300);
	const containerRef = useRef(null);

	const handleMouseDown = (e) => {
		const startX = e.clientX;
		const startWidth = listStudentWidth;

		const handleMouseMove = (moveEvent) => {
			if (!containerRef.current) return;

			const delta = moveEvent.clientX - startX;
			const containerWidth = containerRef.current.offsetWidth;

			const newWidth = Math.max(
				100,
				Math.min(startWidth + delta, containerWidth - 100)
			);
			setListStudentWidth(newWidth);
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const [selectedStudent, setSelectedStudent] = useState(null);
	const [formData, setFormData] = useState(null);

	const handleEditClick = (student) => {
		setSelectedStudent(student); // Lưu sinh viên được chọn
		setFormData({ ...student }); // Cập nhật formData với thông tin của sinh viên mới
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		setSelectedStudent(formData); // Cập nhật lại thông tin của sinh viên đã sửa
		alert("Thông tin đã được cập nhật!");
	};

	return (
		<div className="container staff" ref={containerRef}>
			<h1 className="title">Quản lý sinh viên</h1>
			<div className="content">
				<div className="list-student" style={{ width: listStudentWidth }}>
					<table>
						<thead>
							<tr>
								<th>
									<i className="fa fa-edit"></i>
								</th>
								<th>MSSV</th>
								<th>Tên Sinh Viên</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student) => (
								<tr key={student.id}>
									<td>
										<button
											className="edit-button"
											onClick={() => handleEditClick(student)}
										>
											<i className="fa fa-edit"></i>
										</button>
									</td>
									<td>{student.mssv}</td>
									<td>{student.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="resizer" onMouseDown={handleMouseDown}></div>
				<div className="info-student" style={{ flex: 1 }}>
					<h3>Thông Tin Chi Tiết</h3>
					{selectedStudent ? (
						<div className="staff-form">
							<div className="form-group">
								<div className="form-group__item">
									<label>
										MSSV <span className="required">*</span>
									</label>
									<input
										type="text"
										name="mssv"
										value={formData.mssv}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group__item">
									<label>
										Họ Tên <span className="required">*</span>
									</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="form-group__item">
									<label>
										Số CCCD <span className="required">*</span>
									</label>
									<input
										type="text"
										name="cccd"
										value={formData.cccd}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group__item">
									<label>
										Ngày Sinh <span className="required">*</span>
									</label>
									<input
										type="text"
										name="dob"
										value={formData.dob}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="form-group__item">
									<label>
										Tỉnh/Thành Phố <span className="required">*</span>
									</label>
									<input
										type="text"
										name="province"
										value={formData.province}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group__item">
									<label>
										Quận/Huyện <span className="required">*</span>
									</label>
									<input
										type="text"
										name="district"
										value={formData.district}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="form-group__item">
									<label>
										Xã/Phường <span className="required">*</span>
									</label>
									<input
										type="text"
										name="commune"
										value={formData.commune}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group__item">
									<label>
										Hiện trú <span className="required">*</span>
									</label>
									<input
										type="text"
										name="currentAddress"
										value={formData.currentAddress}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="form-group__item">
									<label>
										Khoa <span className="required">*</span>
									</label>
									<input
										type="text"
										name="faculty"
										value={formData.faculty}
										onChange={handleInputChange}
									/>
								</div>
								<div className="form-group__item">
									<label>
										Ngành <span className="required">*</span>
									</label>
									<input
										type="text"
										name="major"
										value={formData.major}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="form-group" style={{ justifyContent: "flex-end", gap: "20px" }}>
								<button onClick={handleSubmit} style={{ width: "100px" }}>
									Xác Nhận
								</button>
							</div>
						</div>
					) : (
						<p
							style={{
								textAlign: "center",
								fontWeight: "700",
								fontSize: "20px",
							}}
						>
							Chọn sinh viên để hiển thị thông tin.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Sinhvien;
