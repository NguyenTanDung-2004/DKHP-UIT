import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import SubjectTable from "./SubjectTable";
import { ClipLoader } from "react-spinners";
import {
  getAllOpenSubjects,
  deleteOpenSubject,
} from "../../../services/subjectServices";
import DeleteResultModal from "./DeleteResultModal";

const Main = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);
  const [modalSubjects, setModalSubjects] = useState([]);

  useEffect(() => {
    const fetchOpenSubjects = async () => {
      try {
        const openSubjectsData = await getAllOpenSubjects();
        setSubjects(openSubjectsData);
      } catch (error) {
        console.error("Error fetching open subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpenSubjects();
  }, []);

  const handleToggleSelect = (subject) => {
    setSelectedSubjects((prevSelectedSubjects) => {
      if (prevSelectedSubjects[subject.id]) {
        const { [subject.id]: removed, ...rest } = prevSelectedSubjects;
        return rest;
      } else {
        return { ...prevSelectedSubjects, [subject.id]: subject };
      }
    });
  };

  const handleDeleteOpenSubject = async () => {
    if (Object.keys(selectedSubjects).length === 0) {
      return; // Không làm gì nếu không có môn học nào được chọn
    }
    const selectedIds = Object.values(selectedSubjects).map(
      (subject) => subject.id
    );
    try {
      //1. call API và set deleteResult
      const result = await deleteOpenSubject(selectedIds);
      setDeleteResult(result);
      // 2. get current subjects for modal
      setModalSubjects(subjects);
      //3. Mở modal
      setModalOpen(true);

      setSelectedSubjects({});
    } catch (error) {
      console.error("Error deleting open subjects:", error);
      setDeleteResult({
        code: 500,
        message: "Đã có lỗi xảy ra!",
      });
      // Set modalOpen to true *after* the result has been obtained
      setModalSubjects(subjects);
      setModalOpen(true);
    } finally {
      const openSubjectsData = await getAllOpenSubjects();
      setSubjects(openSubjectsData);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDeleteResult(null);
    setModalSubjects([]);
  };
  const handleOpenClass = (subject) => {
    alert(
      "Open class for subject: " + subject.tenMonHoc + " " + subject.maMonHoc
    );
    // Open class logic here
  };
  const problemText = (problem) => {
    if (problem === "class") {
      return "Môn học đã có lớp học phần";
    }
    return "Lỗi không xác định";
  };

  const isDeleteButtonDisabled = Object.keys(selectedSubjects).length === 0;

  return (
    <Layout role="staff">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-2xl text-black font-bold mr-10">
            DANH SÁCH MÔN HỌC ĐANG MỞ
          </span>
          <button
            disabled={isDeleteButtonDisabled}
            onClick={handleDeleteOpenSubject}
            className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl ${
              isDeleteButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E43D3D] hover:bg-opacity-90"
            }`}
          >
            XÓA MÔN HỌC MỞ
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <SubjectTable
                subjects={subjects}
                selectedSubjects={selectedSubjects}
                onToggleSelect={handleToggleSelect}
                onOpenClass={handleOpenClass}
              />
            </div>
          )}
        </div>
        {modalOpen && (
          <DeleteResultModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            result={deleteResult}
            allClasses={modalSubjects}
            problemText={problemText}
          />
        )}
      </div>
    </Layout>
  );
};

export default Main;
