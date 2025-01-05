import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import SubjectTable from "./SubjectTable";
import { ClipLoader } from "react-spinners";
import { getAllOpenSubjects } from "../../../services/subjectServices";

const Main = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [loading, setLoading] = useState(true);

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

  const handleDeleteOpenSubject = () => {
    if (Object.keys(selectedSubjects).length === 0) {
      alert("Please select at least one subject to delete.");
      return;
    }
    const selectedIds = Object.values(selectedSubjects).map(
      (subject) => subject.id
    );
    alert(
      "Selected Subject IDs (Delete Open Subject): " + selectedIds.join(", ")
    );
    // Delete logic here
  };

  const handleOpenClass = (subject) => {
    alert(
      "Open class for subject: " + subject.tenMonHoc + " " + subject.maMonHoc
    );
    // Open class logic here
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
            className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90 ${
              isDeleteButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E43D3D]"
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
      </div>
    </Layout>
  );
};

export default Main;
