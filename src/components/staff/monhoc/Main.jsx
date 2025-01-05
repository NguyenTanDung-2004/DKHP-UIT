import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../layout/Layout";
import {
  getAllSubjects,
  getAllIdOpenSubjects,
  addListOpenSubject,
} from "../../../services/subjectServices";
import SubjectTable from "./SubjectTable";
import { ClipLoader } from "react-spinners";
import FilterDropdown from "./FilterDropdown";
import OpenSubjectResultModal from "./OpenSubjectResultModal";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [openSubjectIds, setOpenSubjectIds] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterMajor, setFilterMajor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectTypes = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "LT", value: "LT" },
    { label: "CN", value: "CN" },
    { label: "CSNN", value: "CSNN" },
    { label: "CĐTN", value: "CĐTN" },
    { label: "CSN", value: "CSN" },
    { label: "ĐC", value: "ĐC" },
    { label: "CNTC", value: "CNTC" },
    { label: "ĐA", value: "ĐA" },
    { label: "KLTN", value: "KLTN" },
    { label: "TTTN", value: "TTTN" },
  ];
  const subjectMajors = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "CS", value: "CS" },
    { label: "SE", value: "SE" },
    { label: "IS", value: "IS" },
    { label: "CE", value: "CE" },
    { label: "ENG", value: "ENG" },
    { label: "MA", value: "MA" },
    { label: "PDT", value: "PDT" },
    { label: "SS", value: "SS" },
    { label: "NC", value: "NC" },
  ];

  const subjectTypeValues = subjectTypes.map((type) => type.value);
  const subjectMajorValues = subjectMajors.map((major) => major.value);

  const fetchOpenSubjectIds = async () => {
    try {
      const openSubjectIdsData = await getAllIdOpenSubjects();
      setOpenSubjectIds(openSubjectIdsData);
    } catch (error) {
      console.error("Error fetching open subject IDs:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getAllSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenSubjectIds();
    fetchSubjects();
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

  const handleAddSubject = () => {
    if (Object.keys(selectedSubjects).length === 0) {
      alert("Please select at least one subject");
      return;
    }
    const selectedIds = Object.values(selectedSubjects).map(
      (subject) => subject.id
    );
    alert("Selected Subject IDs (Add Subject): " + selectedIds.join(", "));
  };

  const handleOpenSubject = async () => {
    if (Object.keys(selectedSubjects).length === 0) {
      alert("Please select at least one subject");
      return;
    }
    setIsSubmitting(true);
    const selectedIds = Object.values(selectedSubjects).map(
      (subject) => subject.id
    );
    try {
      const result = await addListOpenSubject(selectedIds);
      const listTrueSubjects = result.listTrue
        .map((id) => subjects.find((sub) => sub.id === id))
        .filter(Boolean);

      const listWrongSubjects = result.listWrong
        .map((id) => subjects.find((sub) => sub.id === id))
        .filter(Boolean);
      setModalResult({
        ...result,
        listTrue: listTrueSubjects,
        listWrong: listWrongSubjects,
      });
      setIsModalOpen(true);

      // Unselect successful subjects after opening
      const newSelectedSubjects = { ...selectedSubjects };
      result.listTrue.forEach((id) => {
        delete newSelectedSubjects[id];
      });
      setSelectedSubjects(newSelectedSubjects);
    } catch (error) {
      console.error("Error opening subjects:", error);
      setModalResult({
        listTrue: [],
        listWrong: selectedIds,
        responseCode: {
          code: 999,
          message: error.message || "Failed to open subject(s)",
        },
      });
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
    fetchOpenSubjectIds();
    fetchSubjects();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalResult(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSubjects = useMemo(() => {
    let filtered = subjects;
    if (filterType && filterType !== "Tất cả") {
      filtered = filtered.filter(
        (subject) => subject.loaiMonHoc === filterType
      );
    }
    if (filterMajor && filterMajor !== "Tất cả") {
      filtered = filtered.filter((subject) => subject.maKhoa === filterMajor);
    }
    if (searchTerm) {
      const searchTerms = searchTerm
        .toLowerCase()
        .split(/[,\s;;\n\r]+/)
        .filter(Boolean)
        .map((term) => term.trim());

      filtered = filtered.filter((subject) => {
        const classNameLower = subject.tenMonHoc.toLowerCase();
        return searchTerms.every((term) =>
          classNameLower.split(" ").some((word) => word.startsWith(term))
        );
      });
    }

    return filtered;
  }, [subjects, filterType, filterMajor, searchTerm]);

  return (
    <Layout role="staff">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <span className="text-2xl text-black font-bold mr-10">
              DANH SÁCH MÔN HỌC
            </span>
            <button
              onClick={handleAddSubject}
              className="min-w-[150px] bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            >
              THÊM MÔN HỌC
            </button>
            <button
              onClick={handleOpenSubject}
              className="min-w-[150px] bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
            >
              MỞ MÔN HỌC
            </button>
          </div>
          <div className="flex gap-4 justify-end">
            <FilterDropdown
              label="Loại môn học"
              options={subjectTypeValues}
              value={filterType}
              onFilterChange={(value) => setFilterType(value)}
            />
            <FilterDropdown
              label="Mã khoa"
              options={subjectMajorValues}
              value={filterMajor}
              onFilterChange={(value) => setFilterMajor(value)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            placeholder="Nhập tên môn học"
            className="border py-2 px-4 rounded w-full outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mt-6 flex items-center justify-center">
          {isSubmitting ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader color={"#2F6BFF"} loading={isSubmitting} size={40} />
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-96">
              <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <SubjectTable
                subjects={filteredSubjects}
                selectedSubjects={selectedSubjects}
                onToggleSelect={handleToggleSelect}
                openSubjectIds={openSubjectIds}
              />
            </div>
          )}
        </div>
        <OpenSubjectResultModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          result={modalResult}
        />
      </div>
    </Layout>
  );
};

export default SubjectPage;
