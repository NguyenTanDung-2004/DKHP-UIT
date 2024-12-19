import React, { useState } from "react";
import "./QuanLyChuongTrinh.css";
import DataGridView from "./../../components/DataGridView";
import AddSubjectCTDTModal from './Component/AddSubjectCTDTModal';

const QuanLyChuongTrinh = () => {
	const sampleData = [
		{
			"Học kỳ": 1,
			"Mã môn học": "MTH101",
			"Tên môn học": "Toán cao cấp A1",
			"Số TC": 4,
			LT: 3,
			TH: 1,
		},
		{
			"Học kỳ": 1,
			"Mã môn học": "PHY102",
			"Tên môn học": "Vật lý đại cương",
			"Số TC": 3,
			LT: 2,
			TH: 1,
		},
		{
			"Học kỳ": 2,
			"Mã môn học": "ENG103",
			"Tên môn học": "Tiếng Anh giao tiếp A1",
			"Số TC": 3,
			LT: 3,
			TH: 0,
		},
		{
			"Học kỳ": 2,
			"Mã môn học": "CS104",
			"Tên môn học": "Nhập môn lập trình",
			"Số TC": 4,
			LT: 3,
			TH: 1,
		},
		{
			"Học kỳ": 3,
			"Mã môn học": "BIO105",
			"Tên môn học": "Sinh học đại cương",
			"Số TC": 2,
			LT: 2,
			TH: 0,
		},
		{
			"Học kỳ": 3,
			"Mã môn học": "HIS106",
			"Tên môn học": "Lịch sử văn minh thế giới",
			"Số TC": 3,
			LT: 3,
			TH: 0,
		},
	];

	const [listData, setListData] = useState(sampleData);
	const [disableData] = useState([]);
	const [selectedClasses] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal(!showModal);

	return (
		<div className="container ctdt">
      <AddSubjectCTDTModal isOpen={showModal} onClose={() => setShowModal(false)}/>
			<section className="main-section">
				<DataGridView
					listData={listData}
					disableData={disableData}
					canCheck={true}
					selectedClasses={selectedClasses}
				/>
				<div className="data-actions">
          <button className="btn-add-class" onClick={toggleModal}>Thêm môn học</button>
					<button className="btn-del-class delete" onClick={toggleModal}>Xóa môn học</button>
				</div>
			</section>
		</div>
	);
};

export default QuanLyChuongTrinh;
