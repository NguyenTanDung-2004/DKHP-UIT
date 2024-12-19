import React, { useState } from "react";
import DataGridView from "./../../components/DataGridView";
import './QuanLyMonHoc.css'
import AddSubjectModal from './Component/AddSubjectModal';
import AlterSubjectModal from './Component/AlterSubjectModal';

const QuanLyMonHoc = () => {
	const rawDatas = [
		{
			"Mã môn học": "MTH101",
			"Tên môn học": "Toán cơ bản",
			"Loại môn học": "Bắt buộc",
			"Mã khoa": "KHOA01",
			"Mã môn trước": null,
			"TCLT": 3,
			"TCTH": 1,
		},
		{
			"Mã môn học": "PHY102",
			"Tên môn học": "Vật lý đại cương",
			"Loại môn học": "Bắt buộc",
			"Mã khoa": "KHOA02",
			"Mã môn trước": "PHY101",
			"TCLT": 3,
			"TCTH": 1,
		},
		{
			"Mã môn học": "ENG103",
			"Tên môn học": "Tiếng Anh A1",
			"Loại môn học": "Tự chọn",
			"Mã khoa": "KHOA03",
			"Mã môn trước": null,
			"TCLT": 2,
			"TCTH": 0,
		},
		{
			"Mã môn học": "CS104",
			"Tên môn học": "Lập trình cơ bản",
			"Loại môn học": "Bắt buộc",
			"Mã khoa": "KHOA04",
			"Mã môn trước": null,
			"TCLT": 3,
			"TCTH": 2,
		},
		{
			"Mã môn học": "CHM105",
			"Tên môn học": "Hóa học cơ sở",
			"Loại môn học": "Bắt buộc",
			"Mã khoa": "KHOA05",
			"Mã môn trước": null,
			"TCLT": 3,
			"TCTH": 1,
		},
		{
			"Mã môn học": "BIO106",
			"Tên môn học": "Sinh học đại cương",
			"Loại môn học": "Tự chọn",
			"Mã khoa": "KHOA06",
			"Mã môn trước": null,
			"TCLT": 2,
			"TCTH": 1,
		},
		{
			"Mã môn học": "HIS107",
			"Tên môn học": "Lịch sử Việt Nam",
			"Loại môn học": "Tự chọn",
			"Mã khoa": "KHOA07",
			"Mã môn trước": null,
			"TCLT": 2,
			"TCTH": 0,
		},
		{
			"Mã môn học": "GEO108",
			"Tên môn học": "Địa lý tự nhiên",
			"Loại môn học": "Tự chọn",
			"Mã khoa": "KHOA08",
			"Mã môn trước": null,
			"TCLT": 2,
			"TCTH": 0,
		},
		{
			"Mã môn học": "ART109",
			"Tên môn học": "Mỹ thuật cơ bản",
			"Loại môn học": "Tự chọn",
			"Mã khoa": "KHOA09",
			"Mã môn trước": null,
			"TCLT": 1,
			"TCTH": 2,
		},
		{
			"Mã môn học": "PE110",
			"Tên môn học": "Thể dục thể thao",
			"Loại môn học": "Bắt buộc",
			"Mã khoa": "KHOA10",
			"Mã môn trước": null,
			"TCLT": 1,
			"TCTH": 2,
		},
	];

	const [listData, setListData] = useState(rawDatas);
	const [disableData] = useState([]);
	const [selectedClasses] = useState([]);

	const [modalStates, setModalStates] = useState({
		addSubject: false,
		editSubject: false,
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
		<div className="container qlmh">
      <AddSubjectModal isOpen={modalStates.addSubject} onClose={() => toggleModal("addSubject")}/>
			<AlterSubjectModal isOpen={modalStates.editSubject}
				onClose={() => toggleModal("editSubject")} data={editItem} />
			<div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
        <div className="left-panels">
          <div className="list-subjects">
            <h1 className="title">Danh sách môn học</h1>
            <DataGridView
              listData={rawDatas}
              disableData={disableData}
              canCheck={true}
              getCheckedRows={(rows) => console.log("Hàng được chọn:", rows)}
              selectedClasses={selectedClasses}
              canEdit={true}
							showEditModal={() => toggleModal("editSubject")}
              getEditItem={setEditItem}
            />
          </div>
        </div>
        <div className="right-panels">
          <button onClick={() => toggleModal("addSubject")}>Thêm môn học</button>
          <button>Mở môn học</button>
          <button className="delete">Xóa môn học</button>
        </div>
      </div>
		</div>
	);
};

export default QuanLyMonHoc;
