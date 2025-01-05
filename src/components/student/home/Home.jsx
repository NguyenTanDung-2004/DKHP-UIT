import React, { useMemo, useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import ClassTable from "./ClassTable";
import ProgressList from "./ProgressList";
import {
  getAllClasses,
  getRegisteredClasses,
} from "../../../services/studentDKHPService";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      setLoading(true);
      try {
        const allClassesData = await getAllClasses();
        const registeredClassesData = await getRegisteredClasses();
        setAllClasses(mapAllClasses(allClassesData));
        setRegisteredClasses(mapRegisteredClasses(registeredClassesData));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassData();
  }, []);

  const mapAllClasses = (classes) => {
    return classes.map((classData) => {
      return {
        className:
          classData.subject?.maMonHoc + "." + classData.className.split(".")[1],
        subject: classData.subject?.tenMonHoc,
        siso: classData.siso,
        startDate: new Date(classData.startDate).toLocaleDateString("en-GB"),
        endDate: new Date(classData.endDate).toLocaleDateString("en-GB"),
        tietBatDau: classData.tietBatDau,
        tietKetThuc: classData.tietKetThuc,
        thu: mapThu(classData.thu),
        giangVien: classData.giangVien?.name,
        id: classData.id,
        currentSiSo: classData.currentSiSo,
        credits: classData.subject?.soTinChiLT,
      };
    });
  };

  const mapRegisteredClasses = (classes) => {
    return classes.map((classData) => {
      return {
        className:
          classData.subject?.maMonHoc + "." + classData.className.split(".")[1],
        subject: classData.subject?.tenMonHoc,
        siso: classData.siso,
        startDate: new Date(classData.startDate).toLocaleDateString("en-GB"),
        endDate: new Date(classData.endDate).toLocaleDateString("en-GB"),
        tietBatDau: classData.tietBatDau,
        tietKetThuc: classData.tietKetThuc,
        thu: mapThu(classData.thu),
        giangVien: classData.giangVien?.name,
        id: classData.id,
        currentSiSo: classData.currentSiSo,
        credits: classData.subject?.soTinChiLT,
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
    setSelectedClasses((prevSelectedClasses) => {
      if (prevSelectedClasses[classData.id]) {
        const { [classData.id]: removed, ...rest } = prevSelectedClasses;
        return rest;
      } else {
        return { ...prevSelectedClasses, [classData.id]: classData };
      }
    });
  };

  const handleRemoveSelectedClass = (classId) => {
    setSelectedClasses((prevSelectedClasses) => {
      const { [classId]: removed, ...rest } = prevSelectedClasses;
      return rest;
    });
  };

  const calculateTotalCredits = () => {
    return Object.values(selectedClasses).reduce(
      (total, classData) => total + (classData.credits || 0),
      0
    );
  };

  const handleRegister = () => {
    // Handle register logic here
    const selectedIds = Object.values(selectedClasses).map(
      (classData) => classData.id
    );
    alert(`Các id môn học đã đăng ký: ${selectedIds.join(", ")}`);
  };

  // search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const uniqueClasses = useMemo(() => {
    const seen = new Set();
    return allClasses.filter((classData) => {
      if (seen.has(classData.id)) {
        return false;
      }
      seen.add(classData.id);
      return true;
    });
  }, [allClasses]);

  const filteredClasses = useMemo(() => {
    if (!searchTerm) {
      return uniqueClasses;
    }
    const searchTerms = searchTerm
      .toLowerCase()
      .split(/[,\s;;\n\r]+/)
      .filter(Boolean)
      .map((term) => term.trim());

    return uniqueClasses.filter((classData) => {
      const classNameLower = classData.className.toLowerCase();
      return searchTerms.some((term) => classNameLower.includes(term)); // Kiểm tra term có trong className
    });
  }, [searchTerm, uniqueClasses]);

  // Kiểm tra xem lớp đã đăng ký chưa
  const isClassRegistered = (classId) => {
    return registeredClasses.some(
      (registeredClass) => registeredClass.id === classId
    );
  };

  // Kiểm tra trùng lịch
  const isClassConflict = (classData) => {
    return registeredClasses.some((registeredClass) => {
      if (registeredClass.thu !== classData.thu) return false;
      return (
        classData.tietBatDau < registeredClass.tietKetThuc &&
        classData.tietKetThuc > registeredClass.tietBatDau
      );
    });
  };

  // Kiểm tra lớp đầy chưa
  const isClassFull = (classData) => {
    return classData.currentSiSo >= classData.siso;
  };

  const modifiedClasses = useMemo(() => {
    return filteredClasses.map((classData) => {
      return {
        ...classData,
        disabled:
          isClassRegistered(classData.id) ||
          isClassConflict(classData) ||
          isClassFull(classData),
        isSelected: !!selectedClasses[classData.id],
      };
    });
  }, [filteredClasses, registeredClasses, selectedClasses]);

  return (
    <Layout role="student">
      <div className="flex bg-[#F2F4F7]">
        <div className="flex-1 p-8 overflow-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nhập vào mã lớp để tìm kiếm, nhiều lớp cách nhau dấu phẩy, khoảng trắng, xuống dòng hoặc dấu chấm phẩy (;; \n\r)"
              className="border p-2 rounded w-full outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
            </div>
          ) : (
            <ClassTable
              classes={modifiedClasses}
              selectedClasses={selectedClasses}
              onToggleSelect={handleToggleSelect}
            />
          )}
        </div>
        <div className="w-60">
          <ProgressList
            selectedClasses={selectedClasses}
            onRemove={handleRemoveSelectedClass}
            onRegister={handleRegister}
            totalCredits={calculateTotalCredits()}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
