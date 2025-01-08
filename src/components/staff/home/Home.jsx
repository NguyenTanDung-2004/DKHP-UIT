import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Card from "./Card";
import ChartComponent from "./ChartComponent";
import { getStatisticsStaff } from "../../../services/statisticServices";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const data = await getStatisticsStaff();
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
    totalSubjects,
    totalOpenSubjects,
    totalFullClasses,
    totalNotFullClasses,
    totalClasses,
    totalTeachers,
    totalRooms,
    totalStudents,
  } = statistics;

  return (
    <Layout role="staff">
      <div className="bg-[#F2F4F7] min-h-screen flex flex-col gap-4 px-20 py-[50px]">
        <h1 className="text-2xl font-bold mb-4 w-full text-center">
          THỐNG KÊ CHUNG
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-8">
            <Card
              title="Tổng số môn học"
              value={totalSubjects}
              icon={<i className="fas fa-book"></i>}
            />
            <Card
              title="Tổng số môn đang mở"
              value={totalOpenSubjects}
              icon={<i className="fas fa-door-open"></i>}
            />
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
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Card
              title="Tổng số lớp chưa đầy"
              value={totalNotFullClasses}
              icon={<i className="fas fa-building"></i>}
            />
            <Card
              title="Tổng số giáo viên"
              value={totalTeachers}
              icon={<i className="fas fa-chalkboard-teacher"></i>}
            />
            <Card
              title="Tổng số phòng học"
              value={totalRooms}
              icon={<i className="fas fa-building"></i>}
            />
            <Card
              title="Tổng số học sinh"
              value={totalStudents}
              icon={<i className="fas fa-user-graduate"></i>}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-3">
          <ChartComponent
            title="Thống kê môn học"
            data={{
              "Tổng số môn học": totalSubjects,
              "Tổng số môn đang mở": totalOpenSubjects,
            }}
          />
          <ChartComponent
            title="Thống kê lớp học"
            data={{
              "Số lớp đầy": totalFullClasses,
              "Số lớp chưa đầy": totalNotFullClasses,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
