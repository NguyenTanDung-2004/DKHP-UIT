import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { getRegisteredClasses } from "../../../services/studentDKHPService";
import ScheduleTable from "./ScheduleTable";
import { ClipLoader } from "react-spinners";

const Main = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await getRegisteredClasses();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);
  if (loading)
    return (
      <Layout role="student">
        <div className="flex bg-white min-h-screen flex-col px-[100px] py-[40px] w-full">
          <div className="flex items-center justify-center h-96">
            <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
          </div>
        </div>
      </Layout>
    );
  return (
    <Layout role="student">
      <div className="flex bg-white min-h-screen flex-col px-[100px] py-[40px] w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <span className="w-full text-2xl text-black font-bold mr-10 text-center">
            THỜI KHOA BIỂU
          </span>
        </div>
        <ScheduleTable scheduleData={scheduleData} />
      </div>
    </Layout>
  );
};
export default Main;
