import React, { useState } from "react";
import "./QuanLyChuongTrinh.css";
import { toast } from "react-toastify";
import DataGridView from "./../../components/DataGridView";
import ctdtService from "./../../services/ctdtService";

const QuanLyChuongTrinh = () => {
	const sampleData = [
		{
			"Học kỳ": 1,
			"Mã môn học": "MTH101",
			"Tên môn học": "Toán cao cấp A1",
			"Số TC": 4,
			LT: 3,
			TH: 1,
		},
		{
			"Học kỳ": 1,
			"Mã môn học": "PHY102",
			"Tên môn học": "Vật lý đại cương",
			"Số TC": 3,
			LT: 2,
			TH: 1,
		},
		{
			"Học kỳ": 2,
			"Mã môn học": "ENG103",
			"Tên môn học": "Tiếng Anh giao tiếp A1",
			"Số TC": 3,
			LT: 3,
			TH: 0,
		},
		{
			"Học kỳ": 2,
			"Mã môn học": "CS104",
			"Tên môn học": "Nhập môn lập trình",
			"Số TC": 4,
			LT: 3,
			TH: 1,
		},
		{
			"Học kỳ": 3,
			"Mã môn học": "BIO105",
			"Tên môn học": "Sinh học đại cương",
			"Số TC": 2,
			LT: 2,
			TH: 0,
		},
		{
			"Học kỳ": 3,
			"Mã môn học": "HIS106",
			"Tên môn học": "Lịch sử văn minh thế giới",
			"Số TC": 3,
			LT: 3,
			TH: 0,
		},
	];

	const [listData, setListData] = useState(sampleData);
	const [disableData] = useState([]);
	const [selectedCTDT, setSelectedCTDT] = useState([]);

	const handleAddSubjects = async () => {
		if (selectedCTDT.length === 0) {
			toast.warning("Vui lòng chọn ít nhất một môn học để thêm.");
			return;
		}

		// Chuẩn bị dữ liệu gửi lên API
		const subjectsToAdd = selectedCTDT.map((subjectId) => {
			const subject = listData.find((item) => item["Mã môn học"] === subjectId);
			return {
				maKhoa: subject["Mã khoa"],
				maMonHoc: subject["Mã môn học"],
				hocKy: subject["Học kỳ"],
			};
		});

		try {
			const response = await ctdtService.addSubjectsToCTDT(subjectsToAdd);

			if (response.code === 1000) {
				const { listMaMonHocTrue, listMaMonHocWrong } = response;

				// Thông báo các môn học thêm thành công
				if (listMaMonHocTrue.length > 0) {
					toast.success(
						`Thêm thành công ${
							listMaMonHocTrue.length
						} môn học: ${listMaMonHocTrue.join(", ")}`
					);
				}

				// Thông báo các môn học không thêm được
				if (listMaMonHocWrong.length > 0) {
					toast.error(
						`Không thể thêm ${
							listMaMonHocWrong.length
						} môn học: ${listMaMonHocWrong.join(", ")}`
					);
				}
			} else {
				toast.error("Có lỗi xảy ra khi thêm môn học.");
			}
		} catch (error) {
			console.error("Lỗi khi thêm môn học:", error);
			toast.error("Lỗi kết nối đến server. Vui lòng thử lại.");
		}
	};

	const handleDeleteSubjects = async () => {
		if (selectedCTDT.length === 0) {
			toast.warning("Vui lòng chọn ít nhất một môn học để xóa.");
			return;
		}
	
		// Chuẩn bị dữ liệu gửi lên API
		const subjectsToDelete = selectedCTDT.map((subjectId) => {
			const subject = listData.find((item) => item["Mã môn học"] === subjectId);
			return subject ? subject["Mã môn học"] : null;
		}).filter(Boolean); // Loại bỏ các giá trị null (nếu có)
	
		try {
			const response = await ctdtService.deleteSubjectsFromCTDT(subjectsToDelete);
	
			if (response.code === 1000) {
				const { listMaMonHocTrue, listMaMonHocWrong } = response;
	
				// Cập nhật danh sách sau khi xóa
				if (listMaMonHocTrue.length > 0) {
					setListData((prevData) =>
						prevData.filter(
							(item) => !listMaMonHocTrue.includes(item["Mã môn học"])
						)
					);
					toast.success(
						`Xóa thành công ${listMaMonHocTrue.length} môn học: ${listMaMonHocTrue.join(", ")}`
					);
				}
	
				// Thông báo các môn học không thể xóa
				if (listMaMonHocWrong.length > 0) {
					toast.error(
						`Không thể xóa ${listMaMonHocWrong.length} môn học: ${listMaMonHocWrong.join(", ")}`
					);
				}
			} else {
				toast.error("Có lỗi xảy ra khi xóa môn học.");
			}
		} catch (error) {
			console.error("Lỗi khi xóa môn học:", error);
			toast.error("Lỗi kết nối đến server. Vui lòng thử lại.");
		}
	};
	

	return (
		<div className="container ctdt">
			<section className="main-section">
				<DataGridView
					listData={listData}
					disableData={disableData}
					canCheck={true}
					selectedClasses={selectedCTDT}
					getCheckedRows={setSelectedCTDT}
				/>
				<div className="data-actions">
					<button className="btn-add-class" onClick={handleAddSubjects}>
						Thêm môn học
					</button>
					<button
						className="btn-del-class delete"
						onClick={handleDeleteSubjects}
					>
						Xóa môn học
					</button>
				</div>
			</section>
		</div>
	);
};

export default QuanLyChuongTrinh;
