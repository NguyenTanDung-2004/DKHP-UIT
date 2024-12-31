import React, { useState, useEffect } from "react";
import "./QuanLyLopHoc.css";
import DataGridView from "./../../components/DataGridView";
import AddClassModal from "./Component/AddClassModal";
import AlterClassModal from "./Component/AlterClassModal";
import classService from "./../../services/classService";

const QuanLyLopHoc = () => {
  const [listData, setListData] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // Gọi API khi component mount
    const fetchClasses = async () => {
      const classes = await getAllClasses();
      setListData(classes);
    };

    fetchClasses();
  }, []);

  const getAllClasses = async () => {
    try {
      // Gọi API lấy danh sách lớp học
      const rawClasses = await classService.getAllClasses();

      // Hàm chuyển đổi ngày thành "Thứ"
      const getDayOfWeek = (dateString) => {
        const days = [
          "Chủ nhật",
          "Thứ hai",
          "Thứ ba",
          "Thứ tư",
          "Thứ năm",
          "Thứ sáu",
          "Thứ bảy",
        ];
        const date = new Date(dateString);
        return days[date.getDay()];
      };

      // Lọc và định dạng dữ liệu
      const formattedClasses = rawClasses.map((item) => ({
        "Mã lớp": item.className || "Không xác định",
        "Sĩ số": `${item.students.length} / ${item.siso}` || "Không xác định",
        "Ngày bắt đầu": item.startDate?.split("T")[0] || "Không xác định",
        "Ngày kết thúc": item.endDate?.split("T")[0] || "Không xác định",
        "Thứ": item.startDate ? getDayOfWeek(item.startDate) : "Không xác định", // Lấy "Thứ" từ ngày bắt đầu
        "Tiết": `${item.tietBatDau || 0}-${item.tietKetThuc || 0}`, // Kết hợp tiết bắt đầu - kết thúc
        "Phòng": item.room?.roomName || "Không xác định",
        "Giảng viên": item.giangVien?.name || "Không xác định",
        "Loại": item.flagTH === 0 ? "LT" : "TH", // Chuyển flagTH thành "LT" hoặc "TH"
      }));

      return formattedClasses;
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const addClassNonTH = async (data) => {
    try {
      await classService.addClassNonTH(data);
      // Sau khi thêm lớp, gọi lại API để cập nhật danh sách lớp
      const updatedClasses = await getAllClasses();
      setListData(updatedClasses);
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const addClassTH = async (data) => {
    try {
      await classService.addClassWithInPractice(data);
      // Cập nhật lại danh sách lớp sau khi thêm lớp
      const updatedClasses = await getAllClasses();
      setListData(updatedClasses);
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const delClass = async (classId) => {
    try {
      await classService.deleteClass(classId);
      // Cập nhật lại danh sách lớp sau khi xóa lớp
      const updatedClasses = await getAllClasses();
      setListData(updatedClasses);
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  // Hàm để toggle trạng thái modal
  const toggleAddModal = () => {
    setAddModalOpen((prev) => !prev);
  };

  const toggleEditModal = () => {
    setEditModalOpen((prev) => !prev);
  };

  return (
    <div className="container qllh">
      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={toggleAddModal}
        addClassNonTH={addClassNonTH}
        addClassTH={addClassTH}
      />
      <AlterClassModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        data={editItem}
        editClass={setEditItem}
      />
      <div className="list-class">
        <h1 className="title">Danh sách lớp học mở</h1>
        <DataGridView
          listData={listData}
					canCheck={true}
          selectedClasses={selectedClasses}
          canEdit={true}
          showEditModal={toggleEditModal}
          getEditItem={setEditItem}
        />
        <div className="list-class__actions">
          <button onClick={toggleAddModal}>Thêm Lớp</button>
          <button
            className="cancel"
            onClick={() => {
              selectedClasses.forEach((classId) => delClass(classId));
            }}
          >
            Xóa Lớp
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuanLyLopHoc;
