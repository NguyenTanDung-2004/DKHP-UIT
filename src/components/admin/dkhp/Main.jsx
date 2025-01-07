import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { get, create } from "../../../services/registrationPeriodServices";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationPeriodDisplay from "./RegistrationPeriodDisplay";
import RegistrationPeriodForm from "./RegistrationPeriodForm";
import moment from "moment";

const Main = () => {
  const [registrationPeriod, setRegistrationPeriod] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [allowedBatches, setAllowedBatches] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(false);

  // new state to track if this is form create or edit
  const [isCreateForm, setIsCreateForm] = useState(false);

  useEffect(() => {
    fetchRegistrationPeriod();
  }, []);

  const fetchRegistrationPeriod = async () => {
    setLoading(true);
    try {
      const data = await get();
      setRegistrationPeriod(data);
      if (data) {
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setAllowedBatches(data.allowedBatches);
        calculateTotalDays(new Date(data.startDate), new Date(data.endDate));
      }
    } catch (error) {
      console.error("Error fetching registration period:", error);
      setRegistrationPeriod(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalDays = (start, end) => {
    if (start && end) {
      const diffInTime = end.getTime() - start.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      setTotalDays(diffInDays + 1);
    } else {
      setTotalDays(0);
    }
  };

  useEffect(() => {
    calculateTotalDays(startDate, endDate);
  }, [startDate, endDate]);

  const handleAddRegistrationPeriod = () => {
    setIsEditing(true);
    setStartDate(null);
    setEndDate(null);
    setStartTime("00:00");
    setEndTime("00:00");
    setAllowedBatches({});
    setRegistrationPeriod(null);
    setIsCreateForm(true); // set is create flag to true
  };

  const handleEditRegistrationPeriod = () => {
    setIsEditing(true);
    setIsCreateForm(false); // set is create flag to false
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        startTime,
        endTime,
        allowedBatches: allowedBatches,
      };
      const response = await create(data);
      if (response) {
        toast.success(`Điều chỉnh đăng ký học phần thành công`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        fetchRegistrationPeriod();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error creating/updating registration period:", error);
      toast.error(`Điều chỉnh đăng ký học phần thất bại`, {
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
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleBatchChange = (batch, days) => {
    const day = parseInt(days, 10) || 1;
    if (day <= totalDays) {
      setAllowedBatches((prev) => ({
        ...prev,
        [batch]: day,
      }));
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchRegistrationPeriod(); // Reload data to reset the form
  };

  return (
    <Layout role="admin">
      <div className="flex bg-[#F2F4F7] min-h-screen flex-col px-[100px] py-[40px] w-full items-center">
        <ToastContainer />
        <div className="flex justify-between items-center w-full mb-4">
          <span className="w-full text-2xl text-black font-bold text-center mb-8">
            ĐIỀU CHỈNH ĐĂNG KÝ HỌC PHẦN
          </span>
        </div>
        {console.log("isEditing", isEditing)}
        {console.log("registrationPeriod", registrationPeriod)}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#2F6BFF" loading={true} size={40} />
          </div>
        ) : (
          <div className="flex flex-col w-[600px] ">
            {isEditing ? (
              <RegistrationPeriodForm
                startDate={startDate}
                endDate={endDate}
                startTime={startTime}
                endTime={endTime}
                allowedBatches={allowedBatches}
                totalDays={totalDays}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                handleBatchChange={handleBatchChange}
                handleSubmit={handleSubmit}
                handleCancelEdit={handleCancelEdit}
                isCreateForm={isCreateForm} // pass new prop to form
              />
            ) : registrationPeriod ? ( // render this if registrationPeriod is not null, and not editing
              <RegistrationPeriodDisplay
                registrationPeriod={registrationPeriod}
                handleEditRegistrationPeriod={handleEditRegistrationPeriod}
              />
            ) : (
              <div className="flex justify-center items-center h-64">
                <button
                  onClick={handleAddRegistrationPeriod}
                  className="text-white py-2 px-4 rounded shadow-xl bg-[#2F6BFF] hover:bg-opacity-90"
                >
                  TẠO THỜI GIAN ĐĂNG KÝ HỌC PHẦN
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Main;
