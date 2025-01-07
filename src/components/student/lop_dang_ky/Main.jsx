import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../layout/Layout";
import ProgressList from "./ProgressList";
import ClassTable from "./ClassTable";
import {
  getRegisteredClasses,
  undkhp,
} from "../../../services/studentDKHPService";
import { ClipLoader } from "react-spinners";
import UnregisterResultModal from "../modal/UnregisterResultModal"; // Import modal mới

const Main = () => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false); // Xóa state này
  const [showUnregisterModal, setShowUnregisterModal] = useState(false); // Thêm state cho modal hủy đăng ký
  const [unregisterResult, setUnregisterResult] = useState(null);
  const [classesForModal, setClassesForModal] = useState([]); // State for modal class names
  const [flagDKHP, setFlagDKHP] = useState(null);

  useEffect(() => {
    const fetchRegisteredClasses = async () => {
      try {
        setLoading(true);
        const registeredClassesData = await getRegisteredClasses();
        setRegisteredClasses(mapRegisteredClasses(registeredClassesData));
      } catch (error) {
        console.error("Error fetching registered classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredClasses();
    const storedFlagDKHP = localStorage.getItem("flagDKHP");
    console.log("dkhp: " + storedFlagDKHP);
    if (storedFlagDKHP) {
      setFlagDKHP(Number(storedFlagDKHP));
    }
  }, []);

  const mapRegisteredClasses = (classes) => {
    return classes.map((classData) => {
      return {
        className: classData.className,
        subject:
          classData.subject?.maMonHoc + " - " + classData.subject?.tenMonHoc,
        siso: classData.siso,
        startDate: new Date(classData.startDate).toLocaleDateString("en-GB"),
        endDate: new Date(classData.endDate).toLocaleDateString("en-GB"),
        tietBatDau: classData.tietBatDau,
        tietKetThuc: classData.tietKetThuc,
        thu: mapThu(classData.thu),
        giangVien: classData.giangVien?.name,
        id: classData.id,
        currentSiSo: classData.currentSiSo,
        credits:
          classData.flagTH === 0
            ? classData.subject?.soTinChiLT
            : classData.subject?.soTinChiTH,
        maMonHoc: classData.subject?.maMonHoc,
        flagTH: classData.flagTH,
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
    return Object.values(registeredClasses).reduce(
      (total, classData) => total + (classData.credits || 0),
      0
    );
  };
  const calculateTotalSelectedCredits = () => {
    return Object.values(selectedClasses).reduce(
      (total, classData) => total + (classData.credits || 0),
      0
    );
  };

  const handleUnregister = async () => {
    setLoading(true);
    // Capture class names before unregistering
    const classesForModal = Object.values(selectedClasses).map((classData) => ({
      id: classData.id,
      className: classData.className,
    }));
    setClassesForModal(classesForModal);
    const selectedIds = Object.values(selectedClasses).map(
      (classData) => classData.id
    );
    try {
      const result = await undkhp(selectedIds);
      setUnregisterResult(result);
      setShowUnregisterModal(true); // Mở modal hủy đăng ký
      setSelectedClasses({});
      // After unregistering classes, you might want to refresh the list:
      const registeredClassesData = await getRegisteredClasses();
      setRegisteredClasses(mapRegisteredClasses(registeredClassesData));
    } catch (error) {
      console.error(error);
      // Handle the error
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    // setShowModal(false); // Xóa dòng này
    setShowUnregisterModal(false);
    setUnregisterResult(null);
  };
  const closeUnregisterModal = () => {
    setShowUnregisterModal(false);
    setUnregisterResult(null);
  };
  const modifiedClasses = useMemo(() => {
    return registeredClasses.map((classData) => {
      return {
        ...classData,
        isSelected: !!selectedClasses[classData.id],
      };
    });
  }, [registeredClasses, selectedClasses]);
  const problemText = (problem) => {
    switch (problem) {
      case "NotRegistered":
        return "Lớp không tồn tại trong danh sách đăng ký";
      case "NonTheory":
        return "Không thể hủy lớp lý thuyết";
      default:
        return "Lỗi không xác định";
    }
  };
  return (
    <Layout role="student">
      {flagDKHP === 1 ? (
        <div className="flex bg-[#F2F4F7] min-h-screen">
          <div className="flex-1 p-8 overflow-auto">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-2xl font-bold mb-3 text-[#2F6BFF]">
                Đã đăng ký:
              </h2>
              <span className="text-xl font-semibold mb-2">
                {Object.keys(registeredClasses).length} lớp,
                {calculateTotalCredits()} tín chỉ
              </span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-96">
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
              onRegister={handleUnregister}
              totalCredits={calculateTotalSelectedCredits()}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 text-2xl font-bold">
          Chưa tới thời gian đăng ký của bạn
        </div>
      )}
      <UnregisterResultModal
        isOpen={showUnregisterModal}
        onClose={closeUnregisterModal}
        result={unregisterResult}
        allClasses={classesForModal}
      />
    </Layout>
  );
};
export default Main;
