import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import ClassTable from "./ClassTable";
import { ClipLoader } from "react-spinners";
import { getAllClasses } from "../../../services/studentDKHPService";
import { getAllOpenSubjects } from "../../../services/subjectServices";
import FilterDropdown from "./FilterDropdown";
import { deleteClass } from "../../../services/classServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpenClassModal from "../monhocmo/OpenClassModal"; // Import the modal

const Main = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Track modal state
  const [selectedSubjectForModal, setSelectedSubjectForModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [classesData, subjectsData] = await Promise.all([
          getAllClasses(),
          getAllOpenSubjects(),
        ]);
        const formattedClasses = mapClasses(classesData);
        setClasses(formattedClasses);

        setSubjects(subjectsData);

        const formattedOptions = subjectsData.map((subject) => ({
          label: subject.maMonHoc,
          value: subject.maMonHoc,
          id: subject.id,
        }));
        setFilterOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapClasses = (classes) => {
    return classes.map((classData) => {
      return {
        className: classData.className,
        subject: classData.subject,
        siso: classData.siso,
        startDate: new Date(classData.startDate).toLocaleDateString("en-GB"),
        endDate: new Date(classData.endDate).toLocaleDateString("en-GB"),
        tietBatDau: classData.tietBatDau,
        tietKetThuc: classData.tietKetThuc,
        thu: mapThu(classData.thu),
        giangVien: classData.giangVien,
        id: classData.id,
        currentSiSo: classData.currentSiSo,
        credits:
          classData.flagTH === 0
            ? classData.subject?.soTinChiLT
            : classData.subject?.soTinChiTH,
        maMonHoc: classData.subject?.maMonHoc,
        subjectId: classData.subject?.id,
        flagTH: classData.flagTH,
        room: classData.room,
      };
    });
  };
  const mapThu = (thu) => {
    switch (thu) {
      case 2:
        return "Thứ hai";
      case 3:
        return "Thứ ba";
      case 4:
        return "Thứ tư";
      case 5:
        return "Thứ năm";
      case 6:
        return "Thứ sáu";
      case 7:
        return "Thứ bảy";
      case 8:
        return "Chủ nhật";
      default:
        return "";
    }
  };

  const handleToggleSelect = (classData) => {
    if (selectedClass && selectedClass.id === classData.id) {
      setSelectedClass(null);
    } else {
      setSelectedClass(classData);
    }
  };

  const handleDeleteClasses = async () => {
    if (!selectedClass) {
      return;
    }

    try {
      await deleteClass(selectedClass.id);
      toast.success(`Đã xóa thành công lớp học`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const classesData = await getAllClasses();
      const formattedClasses = mapClasses(classesData);
      setClasses(formattedClasses);
      setSelectedClass(null);
    } catch (error) {
      console.error("Error deleting classes:", error);
      toast.error(`Xóa lớp học thất bại !`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleFilterChange = (selectedOption) => {
    setFilterSubject(selectedOption);
  };

  const handleOpenClassForSubject = () => {
    const selectedSubject = subjects.find(
      (subject) => subject.maMonHoc === filterSubject
    );

    if (selectedSubject) {
      const hasPractice = selectedSubject.soTinChiTH > 0;
      setSelectedSubjectForModal(selectedSubject);
      setModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filteredClasses = filterSubject
    ? classes.filter(
        (classData) =>
          classData.subjectId ===
          subjects.find((subject) => subject.maMonHoc === filterSubject)?.id
      )
    : classes;
  const isDeleteButtonDisabled = !selectedClass;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
        </div>
      );
    }

    return (
      <div className="overflow-x-auto w-full">
        <ClassTable
          classes={filteredClasses}
          selectedClasses={
            selectedClass ? { [selectedClass.id]: selectedClass } : {}
          }
          onToggleSelect={handleToggleSelect}
        />
      </div>
    );
  };

  return (
    <Layout role="staff">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <span className="text-2xl text-black font-bold mr-10">
            DANH SÁCH CÁC LỚP HỌC MỞ
          </span>
          <div className="flex items-center gap-6">
            <FilterDropdown
              label="Tất cả môn học đang mở"
              options={filterOptions}
              value={filterSubject}
              onFilterChange={handleFilterChange}
            />
            <button
              disabled={isDeleteButtonDisabled}
              onClick={handleDeleteClasses}
              className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl ${
                isDeleteButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#E43D3D] hover:bg-opacity-90"
              }`}
            >
              XÓA LỚP HỌC
            </button>
          </div>
        </div>

        {renderContent()}
        {filterSubject && ( // Conditionally render the button
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={handleOpenClassForSubject}
              className="bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl"
            >
              MỞ LỚP CHO MÔN HỌC NÀY
            </button>
          </div>
        )}
        <ToastContainer />
        {/* Conditionally render the modal */}
        {modalOpen && (
          <OpenClassModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            subject={selectedSubjectForModal}
            hasPractice={selectedSubjectForModal.soTinChiTH > 0}
          />
        )}
      </div>
    </Layout>
  );
};

export default Main;
