import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "../../table/Table";
import { getCTDT } from "../../../services/studentDKHPService";
import { ClipLoader } from "react-spinners";

const Main = () => {
  const [selectedSemester, setSelectedSemester] = useState(2);
  const [curriculumData, setCurriculumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maKhoa, setMaKhoa] = useState("SE"); // Mặc định là SE

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        setLoading(true);
        const response = await getCTDT(selectedSemester);
        setCurriculumData(mapCurriculumData(response));
        setMaKhoa(response.maKhoa || "SE"); // Lấy mã khoa từ response, nếu không có thì dùng SE
      } catch (error) {
        console.error("Error fetching curriculum:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurriculum();
  }, [selectedSemester]);

  const handleSemesterChange = (e) => {
    setSelectedSemester(parseInt(e.target.value));
  };

  const mapCurriculumData = (data) => {
    if (!data || !data.listId || !data.listId.length) {
      return [];
    }
    return data.listId.map((id, index) => ({
      STT: index + 1,
      maMonHoc: data.listMaMonHoc[index],
      tenMonHoc: data.listName[index],
      tinChi: data.listTinChiLT[index] + data.listTinChiTH[index],
      tclt: data.listTinChiLT[index],
      tcth: data.listTinChiTH[index],
      id: id,
    }));
  };

  const columns = [
    { header: "STT", accessor: "STT", className: "px-4 py-3 border-r " },
    {
      header: "MÃ MÔN HỌC",
      accessor: "maMonHoc",
      className: "px-4 py-3 text-center border-r",
    },
    {
      header: "TÊN MÔN HỌC",
      accessor: "tenMonHoc",
      className: "px-4 py-3 hidden lg:table-cell border-r",
    },
    {
      header: "SỐ TIN CHỈ",
      accessor: "tinChi",
      className: "px-4 py-3 hidden lg:table-cell text-center border-r",
    },
    {
      header: "LT",
      accessor: "tclt",
      className: "px-4 py-3 hidden lg:table-cell text-center border-r",
    },
    {
      header: "TH",
      accessor: "tcth",
      className: "px-4 py-3 hidden lg:table-cell text-center ",
    },
  ];

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="text-[#202224] text-opacity-80 text-sm border-t bg-white"
    >
      <td className="px-4 py-5 border-r">{item.STT}</td>
      <td className="px-4 py-5 text-center border-r">{item.maMonHoc}</td>
      <td className="px-4 py-5 hidden lg:table-cell border-r">
        {item.tenMonHoc}
      </td>
      <td className="px-4 py-5 text-center hidden lg:table-cell border-r">
        {item.tinChi}
      </td>
      <td className="px-4 py-5 text-center hidden lg:table-cell border-r">
        {item.tclt}
      </td>
      <td className="px-4 py-5 text-center hidden lg:table-cell border-r">
        {item.tcth}
      </td>
    </tr>
  );

  return (
    <Layout role="student">
      <div className="flex flex-col gap-5 bg-[#F2F4F7] min-h-screen px-[150px] py-10">
        <div className="flex gap-4 items-center ">
          <select
            className=" p-2  outline-none rounded-lg border  border-black"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((semester) => (
              <option key={semester} value={semester}>
                Học kỳ {semester}
              </option>
            ))}
          </select>
        </div>

        <span className="text-2xl text-[#FF3B30] font-bold text-center w-full ">
          CHƯƠNG TRÌNH ĐÀO TẠO - MÃ KHOA : {maKhoa}
        </span>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <ClipLoader color={"#2F6BFF"} loading={loading} size={40} />
          </div>
        ) : (
          <div className="px-10">
            <Table
              columns={columns}
              renderRow={renderRow}
              data={curriculumData}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Main;
