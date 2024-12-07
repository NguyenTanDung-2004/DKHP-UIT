import React, { useState } from "react";
import './QuanLyLopHoc.css'
import DataGridView from "./../../components/DataGridView";
import AddClassModal from './Component/AddClassModal';


const QuanLyLopHoc = () => {
	const initialListData = [
		{
			MaLop: "SE100:P11:PMCLLL",
			SiSo: 200,
			NgayBatDau: "12/12/2024",
			NgayKetThuc: "31/05/2025",
			Thu: 5,
			Tiet: 5,
			Phong: "B314",
			GiangVien: "Nguyen Tran Thanh Minh",
			Loai: "LT",
		},
		{
			MaLop: "SE100:P11:PMCLLL",
			SiSo: 200,
			NgayBatDau: "12/12/2024",
			NgayKetThuc: "31/05/2025",
			Thu: 5,
			Tiet: 5,
			Phong: "B314",
			GiangVien: "Nguyen Tran Thanh Minh",
			Loai: "LT",
		},
		{
			MaLop: "SE100:P11:PMCLLL",
			SiSo: 200,
			NgayBatDau: "12/12/2024",
			NgayKetThuc: "31/05/2025",
			Thu: 5,
			Tiet: 5,
			Phong: "B314",
			GiangVien: "Nguyen Tran Thanh Minh",
			Loai: "LT",
		},
		{
			MaLop: "SE100:P11:PMCLLL",
			SiSo: 200,
			NgayBatDau: "12/12/2024",
			NgayKetThuc: "31/05/2025",
			Thu: 5,
			Tiet: 5,
			Phong: "B314",
			GiangVien: "Nguyen Tran Thanh Minh",
			Loai: "LT",
		},
		{
			MaLop: "SE100:P11:PMCLLL",
			SiSo: 200,
			NgayBatDau: "12/12/2024",
			NgayKetThuc: "31/05/2025",
			Thu: 5,
			Tiet: 5,
			Phong: "B314",
			GiangVien: "Nguyen Tran Thanh Minh",
			Loai: "LT",
		},
	];

	const [listData, setListData] = useState(initialListData);
	const [disableData] = useState([]);
	const [selectedClasses] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<div className="container">
			<AddClassModal isOpen={showModal} onClose={toggleModal}/>
			<div className="list-class">
				<h1 className="title">Danh sách lớp học mở</h1>
				<DataGridView
					listData={listData}
					disableData={disableData}
					canCheck={true}
					getCheckedRows={(rows) => console.log("Hàng được chọn:", rows)}
					selectedClasses={selectedClasses}
					canEdit={true}
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

