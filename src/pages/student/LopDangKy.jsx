import React, { useState, useEffect } from "react";
import studentService from './../../services/studentService';
import SelectedClasses from "./Component/SelectedClasses";
import DataGridView from "./../../components/DataGridView";
import LoadingSpinner from "./../../components/LoadingSpinner"; // Import LoadingSpinner

const LopDangKy = () => {
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [displayData, setDisplayData] = useState([]); // Dữ liệu hiển thị
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [selectedClasses, setSelectedClasses] = useState([]); // Lớp học đã chọn
  const [disableClasses, setDisableClasses] = useState([]); // Lớp học đã đăng ký thành công

  // Lấy dữ liệu lớp học từ API
  useEffect(() => {
    const fetchOpenSubjects = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      try {
				const allOpenSubjects = await studentService.getRegisteredClasses();
        const formattedData = allOpenSubjects.map((classItem) => ({
          "Mã môn học": classItem.className,
          "Tên môn học": classItem.subject.tenMonHoc,
          "Loại môn học": classItem.subject.loaiMonHoc,
          "Số tín chỉ": classItem.subject.loaiMonHoc === "LT" ? classItem.subject.soTinChiLT : classItem.subject.soTinChiTH,
          "Ngày học": `${new Date(classItem.startDate).toLocaleDateString("en-GB")} - ${new Date(classItem.endDate).toLocaleDateString("en-GB")}`,
          "Tiết học": `${classItem.tietBatDau} - ${classItem.tietKetThuc}`,
          "Giảng viên": classItem.giangVien.name,
          "Sỉ số": `${classItem.students.length}/${classItem.siso}`,
          "id": classItem.id,
        }));
        setDisplayData(formattedData);
      } catch (error) {
        console.error("Không thể lấy lớp học:", error);
        alert("Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };
    fetchOpenSubjects();
  }, []);

  // Hàm tìm kiếm
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = displayData.filter(
      (item) =>
        item["Mã môn học"].toLowerCase().includes(value.toLowerCase()) || 
        item["Tên môn học"].toLowerCase().includes(value.toLowerCase())
    );
    setDisplayData(filteredData);
  };

  // Hàm bỏ chọn lớp học
  const handleDeselectClass = (classCode) => {
    setSelectedClasses(selectedClasses.filter((item) => item["Mã môn học"] !== classCode));
  };

  // Hàm đăng ký học phần
  const handleUnRegister = async (selectedClasses) => {
    if (selectedClasses.length === 0) {
      alert("Vui lòng chọn ít nhất một lớp để hủy đăng ký!");
      return;
    }

    setLoading(true); // Bắt đầu quá trình đăng ký

    try {
      const response = await studentService.undkhpStudent(selectedClasses);
      if (response.code === 1000) {
        const { listTrue, listWrong, listProblem } = response;

        setDisableClasses((prevData) => [
          ...prevData,
          ...listTrue.map((classId) =>
            selectedClasses.find((cls) => cls.id === classId)
          ),
        ]);

        setDisplayData((prevData) =>
          prevData.filter((classItem) => !listTrue.includes(classItem.id))
        );

        setSelectedClasses([]);
        alert("Hủy đăng ký học phần thành công!");

        if (listWrong.length > 0) {
          alert(`Hủy đăng ký không thành công cho các lớp: ${listWrong.join(", ")}`);
        }
        if (listProblem.length > 0) {
          alert(`Lỗi gặp phải đối với các lớp: ${listProblem.join(", ")}`);
        }
      } else {
        alert("Đã xảy ra lỗi khi hủy đăng ký học phần. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Hủy đăng ký không thành công:", error);
      alert("Đã xảy ra lỗi trong quá trình hủy đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Kết thúc quá trình đăng ký
    }
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
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Hiển thị spinner khi loading */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataGridView
            listData={displayData}
            disableData={disableClasses}
            canCheck={true}
            selectedClasses={selectedClasses}
            getCheckedRows={setSelectedClasses}
          />
        )}
      </div>

      <div className="right-panel">
        <SelectedClasses
          selectedClasses={selectedClasses}
          handleDeselectClass={handleDeselectClass}
          type="submit"
          handleFunct={handleUnRegister}
        />
      </div>
    </div>
  );
};

export default LopDangKy;
