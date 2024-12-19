import React, { useState } from "react";
import "./DanhSachTaiKhoan.css";

const DanhSachTaiKhoan = () => {
	// Mảng accounts mẫu với role là student hoặc staff
  const accounts = [
    {
      id: 1,
      mssv: "SV001",
      name: "Nguyễn Văn A",
      role: "student",
      cccd: "123456789012",
      dob: "2000-01-01",
      province: "Hà Nội",
      district: "Hoàn Kiếm",
      commune: "Phường 1",
      currentAddress: "Số 10, Phố 1, Hà Nội",
      faculty: "Khoa Công Nghệ Thông Tin",
      major: "Công nghệ phần mềm",
    },
    {
      id: 2,
      mssv: "SV002",
      name: "Trần Thị B",
      role: "student",
      cccd: "987654321098",
      dob: "1999-02-15",
      province: "Hải Phòng",
      district: "Lê Chân",
      commune: "Phường 2",
      currentAddress: "Số 15, Phố 2, Hải Phòng",
      faculty: "Khoa Kinh Tế",
      major: "Quản trị kinh doanh",
    },
    {
      id: 3,
      mssv: "SV003",
      name: "Lê Văn C",
      role: "staff",
      cccd: "111223344556",
      dob: "2001-03-20",
      province: "Đà Nẵng",
      district: "Hải Châu",
      commune: "Phường 3",
      currentAddress: "Số 20, Phố 3, Đà Nẵng",
      faculty: "Khoa Ngoại Ngữ",
      major: "Tiếng Anh",
    },
    {
      id: 4,
      mssv: "SV004",
      name: "Phạm Thị D",
      role: "staff",
      cccd: "223344556677",
      dob: "1988-07-10",
      province: "Hà Nội",
      district: "Ba Đình",
      commune: "Phường 4",
      currentAddress: "Số 30, Phố 4, Hà Nội",
      faculty: "Khoa Quản Trị Kinh Doanh",
      major: "Quản trị nhân lực",
    },
    {
      id: 5,
      mssv: "SV005",
      name: "Ngô Minh E",
      role: "student",
      cccd: "334455667788",
      dob: "2002-05-10",
      province: "Hồ Chí Minh",
      district: "Quận 1",
      commune: "Phường 5",
      currentAddress: "Số 50, Phố 5, TP Hồ Chí Minh",
      faculty: "Khoa Luật",
      major: "Luật Kinh Tế",
    },
    {
      id: 6,
      mssv: "SV006",
      name: "Lê Quang F",
      role: "staff",
      cccd: "667788990011",
      dob: "1995-09-20",
      province: "Bắc Ninh",
      district: "Từ Sơn",
      commune: "Phường 6",
      currentAddress: "Số 60, Phố 6, Bắc Ninh",
      faculty: "Khoa Kỹ Thuật",
      major: "Cơ khí",
    },
    {
      id: 7,
      mssv: "SV007",
      name: "Vũ Đức G",
      role: "student",
      cccd: "889900112233",
      dob: "2000-11-02",
      province: "Bắc Giang",
      district: "Sơn Động",
      commune: "Phường 7",
      currentAddress: "Số 70, Phố 7, Bắc Giang",
      faculty: "Khoa Điện Tử",
      major: "Kỹ thuật điện",
    },
    {
      id: 8,
      mssv: "SV008",
      name: "Trần Thị H",
      role: "staff",
      cccd: "998877665544",
      dob: "1989-03-25",
      province: "Quảng Ninh",
      district: "Hạ Long",
      commune: "Phường 8",
      currentAddress: "Số 80, Phố 8, Quảng Ninh",
      faculty: "Khoa Xã Hội",
      major: "Tâm lý học",
    },
    {
      id: 9,
      mssv: "SV009",
      name: "Nguyễn Thị I",
      role: "student",
      cccd: "556677889900",
      dob: "2001-08-18",
      province: "Nam Định",
      district: "Trực Ninh",
      commune: "Phường 9",
      currentAddress: "Số 90, Phố 9, Nam Định",
      faculty: "Khoa Y Dược",
      major: "Y học",
    },
    {
      id: 10,
      mssv: "SV010",
      name: "Hoàng Minh J",
      role: "staff",
      cccd: "445566778899",
      dob: "1987-06-30",
      province: "Thái Nguyên",
      district: "TP Thái Nguyên",
      commune: "Phường 10",
      currentAddress: "Số 100, Phố 10, Thái Nguyên",
      faculty: "Khoa Tài Chính",
      major: "Tài chính ngân hàng",
    },
  ];
  
  

	const [modeView, setModeView] = useState("account");
	const [listType, setListType] = useState("all"); // Lưu giá trị của list-type (tất cả, sinh viên, nhân viên)
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [formData, setFormData] = useState(null);

	const handleEditClick = (Account) => {
		setSelectedAccount(Account);
		setFormData({ ...Account });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		setSelectedAccount(formData);
		alert("Thông tin đã được cập nhật!");
	};

	const handleModeChange = (e) => {
		setModeView(e.target.value);
	};

	const handleListTypeChange = (e) => {
		setListType(e.target.value); // Cập nhật giá trị của listType khi thay đổi lựa chọn
	};

	// Lọc tài khoản dựa trên listType
	const filteredAccounts = accounts.filter((account) => {
		if (listType === "all") return true; // Hiển thị tất cả nếu chọn "Tất cả"
		return account.role === listType; // Lọc theo role nếu chọn Sinh viên hoặc Nhân viên
	});

	return (
		<div className="container admin-account">
			<div style={{ display: "flex", width: "80%", margin: "20px 0px", gap: "20px", alignItems: "center" }}>    
        <p>Chế độ xem</p>
				<select
					name="mode-view"
					id="mode-view"
					value={modeView}
					onChange={handleModeChange}
				>
					<option value="account">Xem tài khoản</option>
					<option value="permit">Xem quyền hạn</option>
				</select>
			</div>
			<div className="content" style={{ flexDirection: modeView === "account" ? "row" : "row-reverse" }}>
				<div className="list-accounts">
					<div className="list-actions">
						<select name="list-type" id="list-type" onChange={handleListTypeChange}>
							<option value="all">Tất cả</option>
							<option value="student">Sinh viên</option>
							<option value="staff">Nhân viên</option>
						</select>
						<div className="list-btns">
							<button className="delete">Xóa tài khoản</button>
							<button>Thêm tài khoản</button>
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th>
									<i className="fa-regular fa-square"></i>
								</th>
								<th>Tài Khoản</th>
								<th>Họ và Tên</th>
								<th>
									<i className="fa fa-edit"></i>
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredAccounts.map((account) => (
								<tr key={account.id}>
									<td>
										<input
											type="checkbox"
											name="user_checkbox"
											id={account.id}
										/>
									</td>
									<td>{account.mssv}</td>
									<td>{account.name}</td>
									<td>
										<button
											className="edit-button"
											onClick={() => handleEditClick(account)}
										>
											<i className="fa fa-edit"></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="permit-accounts" style={{ flex: 1 }}>
					<h3>Các quyền của tài khoản</h3>
					<form onSubmit={handleSubmit} className="admin-form">
						<div className="form-group">
							<p>Quyền quản lý môn học</p>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xem thông tin sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Thêm sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xóa sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Sửa thông tin sinh viên</label>
							</div>
						</div>
            <div className="form-group">
							<p>Quyền quản lý môn học</p>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xem thông tin sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Thêm sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xóa sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Sửa thông tin sinh viên</label>
							</div>
						</div>
            <div className="form-group">
							<p>Quyền quản lý môn học</p>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xem thông tin sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Thêm sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xóa sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Sửa thông tin sinh viên</label>
							</div>
						</div>
            <div className="form-group">
							<p>Quyền quản lý môn học</p>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xem thông tin sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Thêm sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Xóa sinh viên</label>
							</div>
							<div className="form-group__item">
								<input type="checkbox" onChange={handleInputChange} />
								<label>Sửa thông tin sinh viên</label>
							</div>
						</div>
						<div className="form-actions">
							<button type="submit">Xác nhận</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default DanhSachTaiKhoan;
