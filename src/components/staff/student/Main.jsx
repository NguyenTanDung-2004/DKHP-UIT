import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import {
  getAllStudent,
  deleteListStudent,
  createStudent,
  editStudent,
} from "../../../services/studentServices";
import StudentTable from "./StudentTable";
import Pagination from "./Pagination";
import FilterDropdown from "./FilterDropdown";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
const Main = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const studentsPerPage = 10;

  const facultyOptions = [
    { label: "Công nghệ phần mềm", value: "Công nghệ phần mềm" },
    { label: "Công nghệ thông tin", value: "Công nghệ thông tin" },
    { label: "Kỹ thuật máy tính", value: "Kỹ thuật máy tính" },
    { label: "Khoa học máy tính", value: "Khoa học máy tính" },
  ];
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentData = await getAllStudent();
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleToggleSelect = (mssv) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected[mssv]) {
        const { [mssv]: removed, ...rest } = prevSelected;
        return rest;
      } else {
        return { ...prevSelected, [mssv]: true };
      }
    });
  };

  const handleDeleteStudents = async () => {
    if (Object.keys(selectedStudents).length === 0) {
      return;
    }
    const selectedMssvs = Object.keys(selectedStudents);
    try {
      await deleteListStudent(selectedMssvs);
      toast.success("Xóa sinh viên thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Clear selected students and fetch data to refresh table
      setSelectedStudents({});
      const studentData = await getAllStudent();
      setStudents(studentData);
    } catch (error) {
      toast.error(`Xóa sinh viên thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error deleting students", error);
    }
  };

  const handleAddStudent = () => {
    setIsAddModalOpen(true);
  };
  const handleCreateStudent = async (newStudent) => {
    try {
      await createStudent(newStudent);
      toast.success("Thêm sinh viên thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsAddModalOpen(false);
      const studentData = await getAllStudent();
      setStudents(studentData);
    } catch (error) {
      toast.error(`Thêm sinh viên thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error creating student", error);
    }
  };
  const handleEditStudent = async (editedStudent) => {
    try {
      await editStudent(editedStudent);
      toast.success("Sửa sinh viên thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsEditModalOpen(false);
      const studentData = await getAllStudent();
      setStudents(studentData);
    } catch (error) {
      toast.error(`Sửa sinh viên thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error editing student", error);
    }
  };
  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1);
  };
  const handleFilterFacultyChange = (selectedOption) => {
    setFilterFaculty(selectedOption);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter((student) => {
    const searchMatch =
      !searchName ||
      (student.tenDayDu &&
        student.tenDayDu.toLowerCase().includes(searchName.toLowerCase()));
    let facultyMatch = true;
    if (filterFaculty && filterFaculty !== "all") {
      facultyMatch =
        student.tenKhoa &&
        student.tenKhoa.toLowerCase() === filterFaculty.toLowerCase();
      console.log(student.tenKhoa + " - " + filterFaculty);
    }
    return searchMatch && facultyMatch;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <Layout role="staff">
        <div className="flex items-center justify-center h-96">
          <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
        </div>
      </Layout>
    );
  }
  return (
    <Layout role="staff">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <span className="w-full text-2xl text-black font-bold mr-10 text-center">
            QUẢN LÝ SINH VIÊN
          </span>
        </div>
        <div className="flex gap-10">
          <input
            type="text"
            placeholder="Nhập vào tên sinh viên"
            className="border px-4 rounded h-10 w-[900px] outline-none"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <div className="flex justify-end items-center w-full mb-4 gap-4">
            <FilterDropdown
              label="Tất cả"
              options={facultyOptions}
              value={filterFaculty}
              onFilterChange={handleFilterFacultyChange}
            />
            <button
              onClick={handleAddStudent}
              className="text-white py-2 px-4 rounded shadow-xl bg-[#2F6BFF] hover:bg-opacity-90"
            >
              THÊM SINH VIÊN
            </button>
            <button
              onClick={handleDeleteStudents}
              disabled={Object.keys(selectedStudents).length === 0}
              className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl ${
                Object.keys(selectedStudents).length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#E43D3D] hover:bg-opacity-90"
              }`}
            >
              XÓA SINH VIÊN
            </button>
          </div>
        </div>

        <StudentTable
          students={currentStudents}
          selectedStudents={selectedStudents}
          onSelectStudent={handleToggleSelect}
          onEditStudent={handleOpenEditModal}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredStudents.length}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onCreateStudent={handleCreateStudent}
        />
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onEditStudent={handleEditStudent}
          student={selectedStudent}
        />
        <ToastContainer />
      </div>
    </Layout>
  );
};
export default Main;
