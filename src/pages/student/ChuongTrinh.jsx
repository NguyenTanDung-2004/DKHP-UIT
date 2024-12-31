import React, { useState, useEffect } from "react";
import './ChuongTrinh.css';
import ctdtService from "../../services/ctdtService";

const ChuongTrinh = () => {
  const [selectedNganh, setSelectedNganh] = useState("");
  const [ctdtData, setCtdtData] = useState({});

  const getCTDT1ky = (hocky) => {
    ctdtService.getCTDT(hocky).then((response) => {
      setCtdtData(response.data);
    }).catch((error) => {
      console.error("Failed to fetch curriculum data", error);
      alert("Failed to load curriculum data.");
    });
  }

  // Display courses by selected semester (1-8)
  const renderTable = (semester) => {
    getCTDT1ky(semester);
    return (
      <div key={semester} className="semester-table">
        <h3>Học kỳ {semester}</h3>
        <table>
          <thead>
            <tr>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Số TC</th>
              <th>LT</th>
              <th>TH</th>
            </tr>
          </thead>
          <tbody>
            {ctdtData.map((course, index) => (
              <tr key={index}>
                <td>{course.maMonHoc}</td>
                <td>{course.tenMonHoc}</td>
                <td>{course.soTinChi}</td>
                <td>{course.lyThuyet}</td>
                <td>{course.thucHanh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    if (selectedNganh) {
      // Fetch curriculum data when component is loaded or when selected industry changes
      ctdtService.getCTDT(selectedNganh).then((response) => {
        setCtdtData(response.data);
      }).catch((error) => {
        console.error("Failed to fetch curriculum data", error);
        alert("Failed to load curriculum data.");
      });
    }
  }, [selectedNganh]); // Re-fetch if the selected industry changes

  return (
    <div className="container">
      <div className="select-nganh">
        <select name="nganh-name select-data">
          <option value="">Chọn ngành cần tra cứu</option>
          <option value="SE">Ngành Kỹ thuật Phần mềm</option>
          <option value="IS">Ngành Hệ thống thông tin</option>
          <option value="CS">Ngành Khoa học máy tính</option>
          <option value="CE">Ngành Kỹ thuật máy tính</option>
        </select>
        <button className="nganh-btn">Xem</button>
      </div>

      <div className="title-nganh">
        <h2>Chương trình đào tạo</h2>
        <h3>{selectedNganh && `${selectedNganh} - ${selectedNganh === "SE" ? "Kỹ thuật Phần mềm" : selectedNganh === "IS" ? "Hệ thống thông tin" : selectedNganh === "CS" ? "Khoa học máy tính" : "Kỹ thuật máy tính"}`}</h3>
      </div>

      {/* Render tables for each semester (1 to 8) */}
      <div className="display-nganh">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => renderTable(semester))}
      </div>
    </div>
  );
};

export default ChuongTrinh;
