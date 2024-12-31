import React, { useState, useEffect } from "react";
import './QuanLyMonHoc.css';
import classService from './../../services/classService'; // Đảm bảo bạn có service này
import DataGridView from "./../../components/DataGridView";
import AddSubjectModal from './Component/AddSubjectModal';
import AlterSubjectModal from './Component/AlterSubjectModal';

const QuanLyMonHoc = () => {
  const [listData, setListData] = useState([]);
  const [disableData] = useState([]);
  const [selectedClasses] = useState([]);
  const [modalStates, setModalStates] = useState({
    addSubject: false,
    editSubject: false,
    deleteSubject: false,
  });

  useEffect(() => {
    // Gọi API lấy danh sách môn học mở và xử lý dữ liệu
    const fetchOpenSubjects = async () => {
      try {
        const response = await classService.getAllOpenSubjects(); // Thay bằng phương thức API phù hợp
        const formattedData = response.map((subject) => ({
          "Mã môn học": subject.maMonHoc,
          "Tên môn học": subject.tenMonHoc,
          "Loại môn học": subject.loaiMonHoc === 'LT' ? "Lý thuyết" : "Thực hành", // Có thể thay đổi tùy theo giá trị
          "Mã khoa": subject.maKhoa,
          "Mã môn trước": subject.dsMaMonHocTruoc ? subject.dsMaMonHocTruoc.join(", ") : null,
          "TCLT": subject.soTinChiLT,
          "TCTH": subject.soTinChiTH,
        }));
        setListData(formattedData);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchOpenSubjects();
  }, []); // Fetch when the component mounts

  const toggleModal = (modalName) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const [editItem, setEditItem] = useState(null);

  return (
    <div className="container qlmh">
      <AddSubjectModal 
        isOpen={modalStates.addSubject} 
        onClose={() => toggleModal("addSubject")} 
        addsubject = 
      />
      <AlterSubjectModal 
        isOpen={modalStates.editSubject} 
        onClose={() => toggleModal("editSubject")} 
        data={editItem} 
      />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div className="left-panels">
          <div className="list-subjects">
            <h1 className="title">Danh sách môn học</h1>
            <DataGridView
              listData={listData} // Dữ liệu đã được lọc
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
