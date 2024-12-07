import React, { useState } from "react";
import './ChuongTrinh.css'

const ChuongTrinh = () => {
	const [selectedNganh, setSelectedNganh] = useState("");
	const handleNganhChange = (event) => {
		setSelectedNganh(event.target.value);
	};

	return (
		<div className="container">
			<div className="select-nganh">
				<select name="nganh-name select-data" onChange={handleNganhChange}>
        <option value="">
						Chọn ngành cần tra cứu
					</option>
					<option value="Ngành Kỹ thuật Phần mềm">
						Ngành Kỹ thuật Phần mềm
					</option>
					<option value="Ngành Khoa học máy tính">
						Ngành Khoa học máy tính
					</option>
					<option value="Ngành Kỹ thuật máy tính">
						Ngành Kỹ thuật máy tính
					</option>
					<option value="Ngành Hệ thống thông tin">
						Ngành Hệ thống thông tin
					</option>
				</select>
				<button className="nganh-btn">Xem</button>
			</div>
			<div className="title-nganh">
				<h2>Chương trình đào tạo</h2>
				<h3>{selectedNganh}</h3>
			</div>
			<div className="display-nganh">
        <table>
          <thead>
            <tr>
              <th>Học kỳ</th>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Số TC</th>
              <th>LT</th>
              <th>TH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>CS101</td>
              <td>Nhập môn lập trình</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>MTH101</td>
              <td>Toán cao cấp A1</td>
              <td>4</td>
              <td>4</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>ENG101</td>
              <td>Tiếng Anh cơ bản</td>
              <td>2</td>
              <td>2</td>
              <td>0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>CS102</td>
              <td>Cấu trúc dữ liệu</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>MTH102</td>
              <td>Toán cao cấp A2</td>
              <td>4</td>
              <td>4</td>
              <td>0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>PHY101</td>
              <td>Vật lý đại cương</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CS201</td>
              <td>Lập trình hướng đối tượng</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CS202</td>
              <td>Hệ điều hành</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CS203</td>
              <td>Mạng máy tính</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
		</div>
	);
};

export default ChuongTrinh;
