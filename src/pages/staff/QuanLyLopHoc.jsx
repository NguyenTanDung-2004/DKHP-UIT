import React, { useState } from "react";
import "./QuanLyLopHoc.css";
import DataGridView from "./../../components/DataGridView";
import AddClassModal from "./Component/AddClassModal";
import AlterClassModal from "./Component/AlterClassModal";

const QuanLyLopHoc = () => {
	const initialListData = [
		{
			"Mã lớp": "SE100:P11:PMCLLL",
			"Sĩ số": 200,
			"Ngày bắt đầu": "12/12/2024",
			"Ngày kết thúc": "31/05/2025",
			Thứ: 5,
			Tiết: 5,
			Phòng: "B314",
			"Giảng viên": "Nguyen Tran Thanh Minh",
			Loại: "LT",
		},
		{
			"Mã lớp": "SE100:P11:PMCLLL",
			"Sĩ số": 200,
			"Ngày bắt đầu": "12/12/2024",
			"Ngày kết thúc": "31/05/2025",
			Thứ: 5,
			Tiết: 5,
			Phòng: "B314",
			"Giảng viên": "Nguyen Tran Thanh Minh",
			Loại: "LT",
		},
		{
			"Mã lớp": "SE100:P11:PMCLLL",
			"Sĩ số": 200,
			"Ngày bắt đầu": "12/12/2024",
			"Ngày kết thúc": "31/05/2025",
			Thứ: 5,
			Tiết: 5,
			Phòng: "B314",
			"Giảng viên": "Nguyen Tran Thanh Minh",
			Loại: "LT",
		},
		{
			"Mã lớp": "SE100:P11:PMCLLL",
			"Sĩ số": 200,
			"Ngày bắt đầu": "12/12/2024",
			"Ngày kết thúc": "31/05/2025",
			Thứ: 5,
			Tiết: 5,
			Phòng: "B314",
			"Giảng viên": "Nguyen Tran Thanh Minh",
			Loại: "LT",
		},
		{
			"Mã lớp": "SE100:P11:PMCLLL",
			"Sĩ số": 200,
			"Ngày bắt đầu": "12/12/2024",
			"Ngày kết thúc": "31/05/2025",
			Thứ: 5,
			Tiết: 5,
			Phòng: "B314",
			"Giảng viên": "Nguyen Tran Thanh Minh",
			Loại: "LT",
		},
	];

	const [listData, setListData] = useState(initialListData);
	const [disableData] = useState([]);
	const [selectedClasses] = useState([]);

	const [modalStates, setModalStates] = useState({
		addClass: false,
		editClass: false,
		deleteSubject: false,
	});

	// Hàm để toggle trạng thái modal
	const toggleModal = (modalName) => {
		setModalStates((prev) => ({
			...prev,
			[modalName]: !prev[modalName],
		}));
	};

	const [editItem, setEditItem] = useState(null);

	return (
		<div className="container qllh">
			<AddClassModal isOpen={modalStates.addClass} onClose={() => toggleModal('addClass')} />
			<AlterClassModal isOpen={modalStates.editClass} onClose={() => toggleModal('editClass')} data={editItem} />
			<div className="list-class">
				<h1 className="title">Danh sách lớp học mở</h1>
				<DataGridView
					listData={listData}
					disableData={disableData}
					canCheck={true}
					getCheckedRows={(rows) => console.log("Hàng được chọn:", rows)}
					selectedClasses={selectedClasses}
					canEdit={true}
					showEditModal={() => toggleModal("editClass")}
					getEditItem={setEditItem}
				/>
				<div className="list-class__actions">
					<button onClick={toggleModal}>Thêm Lớp</button>
					<button className="cancel">Xóa Lớp</button>
				</div>
			</div>
		</div>
	);
};

export default QuanLyLopHoc;
