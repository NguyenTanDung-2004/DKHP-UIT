import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "./Sinhvien.css";
import studentService from './../../services/studentService';

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

	const fetchStudentDetails = async (mssv) => {
		try {
			const response = await studentService.getStudentDetails(mssv); // Gọi service

			// Cập nhật thông tin sinh viên từ kết quả trả về
			const studentData = response.data; // Giả sử dữ liệu trả về là response.data

			setSelectedStudent(studentData); // Lưu sinh viên đã chọn
			setFormData({
				mssv: studentData.mssv,
				name: studentData.tenDayDu,
				cccd: studentData.cmnd,
				dob: studentData.ngaySinh, // Ngày sinh
				province: studentData.tinh_thanhPho,
				district: studentData.quan_huyen,
				commune: studentData.xa_phuong,
				currentAddress: studentData.diaChiChiTiet,
				faculty: studentData.tenKhoa,
				major: studentData.tenNganh,
				phone: studentData.phone, // Thêm trường phone
				gender: studentData.gioiTinh, // Thêm trường giới tính
				placeOfBirth: studentData.noiSinh, // Thêm nơi sinh
				address2: studentData.diaChiChiTiet1, // Địa chỉ 2
				province2: studentData.tinh_thanhPho1, // Tỉnh/thành phố 2
				district2: studentData.quan_huyen1, // Quận/huyện 2
				commune2: studentData.phuong1, // Phường/xã 2
				email: studentData.emailCaNhan, // Email
		});
		} catch (error) {
			console.error("Lỗi khi lấy thông tin sinh viên:", error);
			alert("Không thể lấy thông tin sinh viên. Vui lòng thử lại sau.");
		}
	};

	const handleEditClick = (student) => {
		fetchStudentDetails(student.mssv); // Gọi API khi bấm sửa
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async () => {
			try {
					const updatedStudentData = {
							mssv: formData.mssv,
							tenDayDu: formData.name,
							tenKhoa: formData.faculty,
							tenNganh: formData.major,
							diaChiChiTiet: formData.currentAddress,
							tinh_thanhPho: formData.province,
							quan_huyen: formData.district,
							xa_phuong: formData.commune,
							phone: formData.phone,
							gioiTinh: formData.gender,
							noiSinh: formData.placeOfBirth,
							diaChiChiTiet1: formData.address2,
							tinh_thanhPho1: formData.province2,
							quan_huyen1: formData.district2,
							phuong1: formData.commune2,
							ngaySinh: formData.dob,
							cmnd: formData.cccd,
							emailCaNhan: formData.email,
							password: formData.password || '', // Nếu password không thay đổi, để trống
							code: formData.code || '', // Nếu có mã, cập nhật
					};
	
					// Gọi service để cập nhật thông tin sinh viên
					const response = await studentService.getStudentDetails(updatedStudentData);
	
					if (response.code === 1000) {
							toast.success("Thông tin sinh viên đã được cập nhật thành công!"); // Thông báo thành công
							setSelectedStudent(formData); // Cập nhật lại thông tin đã chỉnh sửa
					} else {
							toast.error("Cập nhật thông tin sinh viên không thành công. Vui lòng thử lại."); // Thông báo lỗi
					}
			} catch (error) {
					console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
					toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
			}
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
