import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import StaffTable from "./StaffTable";
import {
  createStaff,
  deleteList,
  getAllStaff,
  editStaff,
} from "../../../services/staffServices";
import CreateStaffModal from "./CreateStaffModal";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
const Main = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaffIds, setSelectedStaffIds] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [staffToEdit, setStaffToEdit] = useState(null);
  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const data = await getAllStaff();
      setStaffs(data);
    } catch (error) {
      console.error("Failed to fetch staffs:", error);
      toast.error(`Failed to fetch staffs`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  const handleOpenEditModal = (staff) => {
    setStaffToEdit(staff);
  };

  const handleCreateStaff = async (staffData) => {
    try {
      setLoading(true); // Set loading before making API call
      const newStaff = await createStaff(staffData);
      setStaffs([...staffs, newStaff]);
      toast.success(`Tạo nhân viên thành công`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: async () => {
          await fetchStaffs();
          handleCloseCreateModal();
        },
      });
    } catch (error) {
      toast.error(`Tạo nhân viên thất bại`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelect = (staff) => {
    const { id } = staff;
    setSelectedStaffIds((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = true;
      }
      return newSelected;
    });
  };
  useEffect(() => {}, [selectedStaffIds]);

  const handleDeleteStaffs = async () => {
    const ids = Object.keys(selectedStaffIds);
    if (ids.length === 0) {
      alert("Please select at least one staff to delete.");
      return;
    }
    try {
      await deleteList(ids);
      setStaffs(staffs.filter((staff) => !selectedStaffIds[staff.id]));
      setSelectedStaffIds({});
      toast.success(`Xóa nhân viên thành công`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Failed to delete staffs:", error);
      toast.error(`Xóa nhân viên thất bại`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleEditStaff = async (staffId, updateStaff) => {
    try {
      setLoading(true);
      const updatedStaff = await editStaff({ ...updateStaff, id: staffId });
      setStaffs(
        staffs.map((staff) => {
          if (staff.id === staffId) {
            return {
              ...staff,
              fullName: updatedStaff.fullName,
              email: updatedStaff.email,
              account: updatedStaff.account,
              role: updatedStaff.flagAdmin === 1 ? "admin" : "staff",
            };
          }
          return staff;
        })
      );
      toast.success(`Sửa nhân viên thành công`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: async () => {
          await fetchStaffs();
          setStaffToEdit(null);
        },
      });
    } catch (error) {
      console.error("Failed to edit staff:", error);
      toast.error(`Sửa nhân viên thất bại: ${error.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const isDeleteButtonDisabled = Object.keys(selectedStaffIds).length === 0;

  return (
    <Layout role="admin">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <span className="w-full text-2xl text-black font-bold mr-10 text-center">
            QUẢN LÝ NHÂN VIÊN
          </span>
        </div>
        <div className="flex justify-end gap-6 items-center mb-8">
          <button
            onClick={handleOpenCreateModal}
            className="min-w-[150px] bg-[#2F6BFF] text-white py-2 px-4 rounded shadow-xl hover:bg-opacity-90"
          >
            THÊM NHÂN VIÊN
          </button>
          <button
            disabled={isDeleteButtonDisabled}
            onClick={handleDeleteStaffs}
            className={`min-w-[150px]  text-white py-2 px-4 rounded shadow-xl ${
              isDeleteButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E43D3D] hover:bg-opacity-90"
            }`}
          >
            XÓA NHÂN VIÊN
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#2F6BFF" loading={loading} size={50} />
          </div>
        ) : (
          <StaffTable
            staffs={staffs}
            selectedStaffIds={selectedStaffIds}
            onToggleSelect={handleToggleSelect}
            onEditStaff={handleEditStaff}
          />
        )}

        <CreateStaffModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onCreateStaff={handleCreateStaff}
        />

        <ToastContainer />
      </div>
    </Layout>
  );
};
export default Main;
