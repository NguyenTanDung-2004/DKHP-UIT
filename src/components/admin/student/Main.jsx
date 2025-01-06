import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout/Layout";
import {
  getAllStudent,
  createAccount,
} from "../../../services/studentServices";
import StudentTable from "./StudentTable";
import Pagination from "./Pagination";
import FilterDropdown from "./FilterDropdown";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [creatingAccounts, setCreatingAccounts] = useState(false);
  const [creatingAccountsLoading, setCreatingAccountsLoading] = useState(false);
  const studentsPerPage = 10;
  const eventSourceRef = useRef(null);
  const [sseEventSource, setSseEventSource] = useState(null);

  const facultyOptions = [
    { label: "Công nghệ phần mềm", value: "Công nghệ phần mềm" },
    { label: "Công nghệ thông tin", value: "Công nghệ thông tin" },
    { label: "Kỹ thuật máy tính", value: "Kỹ thuật máy tính" },
    { label: "Khoa học máy tính", value: "Khoa học máy tính" },
  ];

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
    return () => {
      if (sseEventSource) {
        sseEventSource.close();
      }
    };
  }, []);

  const closeEventSource = () => {
    if (sseEventSource) {
      sseEventSource.close();
      setSseEventSource(null);
    }
  };

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

  const handleCreateAccounts = async () => {
    if (Object.keys(selectedStudents).length === 0) {
      return;
    }
    setCreatingAccounts(true);
    setCreatingAccountsLoading(true);
    const selectedMssvs = Object.keys(selectedStudents);

    try {
      closeEventSource();
      const sseEmitter = await createAccount(selectedMssvs);
      const eventSource = new EventSource(sseEmitter.url);
      setSseEventSource(eventSource);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("SSE Response:", data); // Log individual responses
          toast.success(`Tạo tài khoản thành công cho ${data.email}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          console.error("Error parsing SSE data:", error);
          toast.error("Lỗi phân tích cú pháp json", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };

      eventSource.onerror = async (error) => {
        console.error("SSE error:", error);
        toast.success(`Tạo tài khoản thành công`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        closeEventSource();
        setCreatingAccountsLoading(false);
        setCreatingAccounts(false);
        await fetchData();
      };
      eventSource.onopen = () => {
        console.log("sse connection opend");
      };
      eventSource.addEventListener("close", async (event) => {
        console.log("sse connection closed:", event);
        setCreatingAccountsLoading(false);
        setCreatingAccounts(false);
        await fetchData();
      });
    } catch (error) {
      console.error("Error creating accounts:", error);
      toast.error(`Tạo tài khoản thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      closeEventSource();
      setCreatingAccountsLoading(false);
      setCreatingAccounts(false);
      await fetchData();
    }
    setSelectedStudents({});
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
      <Layout role="admin">
        <div className="flex items-center justify-center h-96">
          <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="admin">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <span className="w-full text-2xl text-black font-bold mr-10 text-center">
            DANH SÁCH SINH VIÊN
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
              onClick={handleCreateAccounts}
              disabled={
                Object.keys(selectedStudents).length === 0 ||
                creatingAccountsLoading
              }
              className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl relative ${
                Object.keys(selectedStudents).length === 0 ||
                creatingAccountsLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2F6BFF] hover:bg-opacity-90"
              }`}
            >
              {creatingAccountsLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipLoader
                    color={"#fff"}
                    loading={creatingAccountsLoading}
                    size={20}
                  />
                </div>
              )}
              {!creatingAccountsLoading &&
                (creatingAccounts ? "Đang tạo..." : "TẠO TÀI KHOẢN")}
            </button>
          </div>
        </div>
        <StudentTable
          students={currentStudents}
          selectedStudents={selectedStudents}
          onSelectStudent={handleToggleSelect}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredStudents.length}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Main;
