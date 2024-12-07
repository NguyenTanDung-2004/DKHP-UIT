import React, { useState } from "react";
import "./LopDangKy.css";
import SelectedClasses from "./Component/SelectedClasses";
import DataGridView from "./../../components/DataGridView";

const data = [
	{
		classCode: "IT001.P11",
		courseName: "Nhập môn lập trình",
		credits: 4,
		schedule: "Thứ 2, Tiết 6, 7, 8 (13:00 - 15:30)",
		lecturer: "Nguyễn Tấn Trần Minh Khang",
		capacity: "40/50",
	},
	{
		classCode: "IT001.P12",
		courseName: "Nhập môn lập trình",
		credits: 4,
		schedule: "Thứ 4, Tiết 1, 2, 3 (07:00 - 09:30)",
		lecturer: "Trần Văn B",
		capacity: "35/50",
	},
	{
		classCode: "IT002.P11",
		courseName: "Cấu trúc dữ liệu và giải thuật",
		credits: 4,
		schedule: "Thứ 5, Tiết 6, 7, 8 (13:00 - 15:30)",
		lecturer: "Lê Thị C",
		capacity: "30/40",
	},
	{
		classCode: "IT002.P12",
		courseName: "Cấu trúc dữ liệu và giải thuật",
		credits: 4,
		schedule: "Thứ 6, Tiết 1, 2, 3 (07:00 - 09:30)",
		lecturer: "Nguyễn Văn D",
		capacity: "25/40",
	},
	{
		classCode: "SE100.P11",
		courseName: "Phương pháp phát triển phần mềm",
		credits: 3,
		schedule: "Thứ 3, Tiết 3, 4, 5 (09:45 - 12:00)",
		lecturer: "Hoàng Thị E",
		capacity: "50/50",
	},
	{
		classCode: "SE100.P12",
		courseName: "Phương pháp phát triển phần mềm",
		credits: 3,
		schedule: "Thứ 4, Tiết 6, 7, 8 (13:00 - 15:30)",
		lecturer: "Phạm Văn F",
		capacity: "45/50",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
	{
		classCode: "IT003.P11",
		courseName: "Lập trình hướng đối tượng",
		credits: 3,
		schedule: "Thứ 7, Tiết 2, 3, 4 (07:45 - 10:15)",
		lecturer: "Nguyễn Văn G",
		capacity: "38/40",
	},
];

const LopDangKy = () => {
	const [displayData, setDisplayData] = useState(data);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedClasses, setSelectedClasses] = useState([]);
	const [disableClasses, setDisableClasses] = useState([]);

	// Hàm xử lý tìm kiếm
	const handleSearch = (value) => {
		setSearchTerm(value); // Cập nhật giá trị searchTerm
		// Lọc dữ liệu dựa trên searchTerm
		const filteredData = data.filter(
			(item) =>
				item.classCode.toLowerCase().includes(value.toLowerCase()) || // Tìm theo mã lớp
				item.courseName.toLowerCase().includes(value.toLowerCase()) // Tìm theo tên môn học
		);
		setDisplayData(filteredData); // Cập nhật danh sách hiển thị
	};

	const handleDeselectClass = (classCode) => {
		setSelectedClasses(
			selectedClasses.filter((item) => item.classCode !== classCode)
		);
	};

	const handleRegister = () => {
		if (selectedClasses.length === 0) {
			alert("Vui lòng chọn ít nhất một lớp để đăng ký!");
			return;
		}
		alert(`Đăng ký thành công các lớp: ${selectedClasses.join(", ")}`);
		setDisableClasses((prevDisableClasses) => [
			...prevDisableClasses,
			...selectedClasses,
		]);
		setSelectedClasses([]);
	};

	return (
		<div className="container row">
			<div className="left-panel">
				<div className="search-bar">
					<i className="fa-solid fa-magnifying-glass"></i>
					<input
						type="text"
						placeholder="Nhập vào Mã môn học hoặc Tên môn học để tìm kiếm"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)} // Gọi hàm handleSearch khi nhập
						className="search-input"
					/>
				</div>
				<DataGridView
					listData={displayData} // Sử dụng danh sách đã lọc
					disableData={disableClasses}
					canCheck={true}
					getCheckedRows={setSelectedClasses}
					selectedClasses={selectedClasses}
				/>
			</div>
			<div className="right-panel">
				<div style={{width: '100%', height: '100%'}}></div>
				<SelectedClasses
					selectedClasses={selectedClasses}
					handleDeselectClass={handleDeselectClass}
					type='cancel'
					handleFunct={handleRegister}
				/>
			</div>
		</div>
	);
};


export default LopDangKy;
