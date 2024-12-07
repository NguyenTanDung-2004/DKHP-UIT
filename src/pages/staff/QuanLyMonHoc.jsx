import React, { useState } from "react";
import DataGridView from "./../../components/DataGridView";
import './QuanLyMonHoc.css'
import AddSubjectModal from './Component/AddSubjectModal';

const QuanLyMonHoc = () => {
	const rawDatas = [
		{
			MaMonHoc: "MTH101",
			TenMonHoc: "Toán cơ bản",
			LoaiMonHoc: "Bắt buộc",
			MaKhoa: "KHOA01",
			MaMonHocTruoc: null,
			SoTCLT: 3,
			SoTCTH: 1,
		},
		{
			MaMonHoc: "PHY102",
			TenMonHoc: "Vật lý đại cương",
			LoaiMonHoc: "Bắt buộc",
			MaKhoa: "KHOA02",
			MaMonHocTruoc: "PHY101",
			SoTCLT: 3,
			SoTCTH: 1,
		},
		{
			MaMonHoc: "ENG103",
			TenMonHoc: "Tiếng Anh A1",
			LoaiMonHoc: "Tự chọn",
			MaKhoa: "KHOA03",
			MaMonHocTruoc: null,
			SoTCLT: 2,
			SoTCTH: 0,
		},
		{
			MaMonHoc: "CS104",
			TenMonHoc: "Lập trình cơ bản",
			LoaiMonHoc: "Bắt buộc",
			MaKhoa: "KHOA04",
			MaMonHocTruoc: null,
			SoTCLT: 3,
			SoTCTH: 2,
		},
		{
			MaMonHoc: "CHM105",
			TenMonHoc: "Hóa học cơ sở",
			LoaiMonHoc: "Bắt buộc",
			MaKhoa: "KHOA05",
			MaMonHocTruoc: null,
			SoTCLT: 3,
			SoTCTH: 1,
		},
		{
			MaMonHoc: "BIO106",
			TenMonHoc: "Sinh học đại cương",
			LoaiMonHoc: "Tự chọn",
			MaKhoa: "KHOA06",
			MaMonHocTruoc: null,
			SoTCLT: 2,
			SoTCTH: 1,
		},
		{
			MaMonHoc: "HIS107",
			TenMonHoc: "Lịch sử Việt Nam",
			LoaiMonHoc: "Tự chọn",
			MaKhoa: "KHOA07",
			MaMonHocTruoc: null,
			SoTCLT: 2,
			SoTCTH: 0,
		},
		{
			MaMonHoc: "GEO108",
			TenMonHoc: "Địa lý tự nhiên",
			LoaiMonHoc: "Tự chọn",
			MaKhoa: "KHOA08",
			MaMonHocTruoc: null,
			SoTCLT: 2,
			SoTCTH: 0,
		},
		{
			MaMonHoc: "ART109",
			TenMonHoc: "Mỹ thuật cơ bản",
			LoaiMonHoc: "Tự chọn",
			MaKhoa: "KHOA09",
			MaMonHocTruoc: null,
			SoTCLT: 1,
			SoTCTH: 2,
		},
		{
			MaMonHoc: "PE110",
			TenMonHoc: "Thể dục thể thao",
			LoaiMonHoc: "Bắt buộc",
			MaKhoa: "KHOA10",
			MaMonHocTruoc: null,
			SoTCLT: 1,
			SoTCTH: 2,
		},
	];

	const [listData, setListData] = useState(rawDatas);
	const [disableData] = useState([]);
	const [selectedClasses] = useState([]);

  const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<div className="container">
      <AddSubjectModal isOpen={showModal} onClose={toggleModal}/>
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
              
            />
          </div>
        </div>
        <div className="right-panels">
          <button onClick={toggleModal}>Thêm môn học</button>
          <button>Mở môn học</button>
          <button className="delete">Xóa môn học</button>
        </div>
      </div>
		</div>
	);
};

export default QuanLyMonHoc;
