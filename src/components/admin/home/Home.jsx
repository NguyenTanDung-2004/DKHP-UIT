import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Card from "./Card";
import ChartComponent from "./ChartComponent";
import { getStatisticsAdmin } from "../../../services/statisticServices";
import { ClipLoader } from "react-spinners";

const AdminHome = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const data = await getStatisticsAdmin();
        setStatistics(data);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu thống kê.");
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#36d7b7" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <Layout role="admin">
        <div className="flex justify-center items-center min-h-screen text-red-500">
          {error}
        </div>
      </Layout>
    );
  }

  if (!statistics) {
    return (
      <Layout role="admin">
        <div className="flex justify-center items-center min-h-screen text-red-500">
          Không có dữ liệu thống kê.
        </div>
      </Layout>
    );
  }
  const {
    totalStudents,
    totalStaffs,
    totalClasses,
    totalFullClasses,
    totalNotFullClasses,
    totalRooms,
    totalTeachers,
  } = statistics;

  return (
    <Layout role="admin">
      <div className="bg-[#F2F4F7] min-h-screen flex flex-col gap-4 px-20 py-[50px]">
        <h1 className="text-2xl font-bold mb-4 w-full text-center">
          THỐNG KÊ CHUNG
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-8">
            <Card
              title="Tổng số lớp học"
              value={totalClasses}
              icon={<i className="fas fa-layer-group"></i>}
            />
            <Card
              title="Tổng số lớp đầy"
              value={totalFullClasses}
              icon={<i className="fas fa-university"></i>}
            />
            <Card
              title="Tổng số lớp chưa đầy"
              value={totalNotFullClasses}
              icon={<i className="fas fa-building"></i>}
            />
            <Card
              title="Tổng số phòng học"
              value={totalRooms}
              icon={<i className="fas fa-building"></i>}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Card
              title="Tổng số sinh viên"
              value={totalStudents}
              icon={<i className="fas fa-user-graduate"></i>}
            />
            <Card
              title="Tổng số nhân viên"
              value={totalStaffs}
              icon={<i className="fas fa-user-tie"></i>}
            />
            <Card
              title="Tổng số giáo viên"
              value={totalTeachers}
              icon={<i className="fas fa-chalkboard-teacher"></i>}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-3">
          <ChartComponent
            title="Thống kê lớp học"
            data={{
              "Tổng số lớp học": totalClasses,
              "Tổng số lớp đầy": totalFullClasses,
              "Tổng số lớp chưa đầy": totalNotFullClasses,
            }}
          />
          <ChartComponent
            title="Thống kê nhân sự"
            data={{
              "Tổng số sinh viên": totalStudents,
              "Tổng số nhân viên": totalStaffs,
              "Tổng số giáo viên": totalTeachers,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
