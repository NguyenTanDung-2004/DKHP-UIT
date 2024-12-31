import React, { useState, useEffect } from "react";
import "./QuanLyMonHoc.css";
import { toast } from "react-toastify";
import classService from "./../../services/classService"; // Đảm bảo bạn có service này
import DataGridView from "./../../components/DataGridView";
import AddSubjectModal from "./Component/AddSubjectModal";
import AlterSubjectModal from "./Component/AlterSubjectModal";
import openSubjectService from "./../../services/openSubjectService";

const QuanLyMonHoc = () => {
	const [listData, setListData] = useState([]);
	const [disableData] = useState([]);
	const [selectedSubjects, setSelectedSubjects] = useState([]);
	const [modalStates, setModalStates] = useState({
		addSubject: false,
		editSubject: false,
		deleteSubject: false,
	});

	useEffect(() => {
		// Gọi API lấy danh sách môn học mở và xử lý dữ liệu
		const fetchOpenSubjects = async () => {
			try {
				const response = await classService.getAllOpenSubjects(); // Thay bằng phương thức API phù hợp
				const formattedData = response.map((subject) => ({
					"Mã môn học": subject.maMonHoc,
					"Tên môn học": subject.tenMonHoc,
					"Loại môn học":
						subject.loaiMonHoc === "LT" ? "Lý thuyết" : "Thực hành", // Có thể thay đổi tùy theo giá trị
					"Mã khoa": subject.maKhoa,
					"Mã môn trước": subject.dsMaMonHocTruoc
						? subject.dsMaMonHocTruoc.join(", ")
						: null,
					TCLT: subject.soTinChiLT,
					TCTH: subject.soTinChiTH,
					id: subject.id,
				}));
				setListData(formattedData);
			} catch (error) {
				console.error("Failed to fetch subjects:", error);
			}
		};

		fetchOpenSubjects();
	}, []); // Fetch when the component mounts

	const toggleModal = (modalName) => {
		setModalStates((prev) => ({
			...prev,
			[modalName]: !prev[modalName],
		}));
	};

	const [editItem, setEditItem] = useState(null);

	const openSubject = async (listSubjectId) => {
		try {
			// Gửi danh sách listSubjectId đến API
			const response = await openSubjectService.addListOpenSubject({
				listSubjectId,
			});

			// Lấy dữ liệu trả về từ API
			const { listTrue = [], listWrong = [], listProblem = [] } = response;

			// Mở môn học thành công
			if (listTrue.length > 0) {
				toast.success(`Mở thành công ${listTrue.length} môn học!`);
				// Có thể cập nhật dữ liệu sau khi mở môn học thành công nếu cần
			}

			// Không thể mở do lỗi
			if (listWrong.length > 0) {
				toast.error(`Không thể mở ${listWrong.length} môn học do lỗi!`);
			}

			// Gặp vấn đề khác
			if (listProblem.length > 0) {
				toast.warning(
					`Có ${listProblem.length} môn học gặp vấn đề. Kiểm tra lại dữ liệu hoặc ràng buộc!`
				);
			}
		} catch (error) {
			toast.error("Đã xảy ra lỗi khi gọi API mở môn học.");
			console.error("Lỗi:", error);
		}
	};

	const delSubject = async (listSubjectId) => {
		try {
			const response = await openSubjectService.deleteOpenSubjects({
				listSubjectId,
			});
			const { listTrue, listWrong, listProblem } = response;

			// Xóa thành công
			if (listTrue.length > 0) {
				toast.success(`Xóa thành công ${listTrue.length} môn học!`);
				// Cập nhật danh sách sau khi xóa
				setListData((prevData) =>
					prevData.filter((item) => !listTrue.includes(item.id))
				);
				setSelectedSubjects([]);
			}

			// Không thể xóa do lỗi
			if (listWrong.length > 0) {
				toast.error(`Không thể xóa ${listWrong.length} môn học do lỗi!`);
			}

			// Gặp vấn đề khác
			if (listProblem.length > 0) {
				toast.warning(
					`Có ${listProblem.length} môn học gặp vấn đề. Kiểm tra lại dữ liệu hoặc ràng buộc!`
				);
			}
		} catch (error) {
			console.error("Lỗi khi xóa môn học:", error);
			toast.error("Xóa môn học thất bại! Vui lòng thử lại.");
		}
	};

	return (
		<div className="container qlmh">
			<AddSubjectModal
				isOpen={modalStates.addSubject}
				onClose={() => toggleModal("addSubject")}
			/>
			<AlterSubjectModal
				isOpen={modalStates.editSubject}
				onClose={() => toggleModal("editSubject")}
				data={editItem}
			/>
			<div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
				<div className="left-panels">
					<div className="list-subjects">
						<h1 className="title">Danh sách môn học</h1>
						<DataGridView
							listData={listData} // Dữ liệu đã được lọc
							canCheck={true}
							getCheckedRows={setSelectedSubjects}
							selectedClasses={selectedSubjects}
							canEdit={true}
							showEditModal={() => toggleModal("editSubject")}
							getEditItem={setEditItem}
						/>
					</div>
				</div>
				<div className="right-panels">
					<button onClick={() => toggleModal("addSubject")}>
						Thêm môn học
					</button>
					<button
						onClick={() => {
							const selectedIds = selectedSubjects.map((subject) => subject.id);
							openSubject(selectedIds);
							setSelectedSubjects([]);
						}}
					>
						Mở môn học
					</button>
					<button
						className="delete"
						onClick={() => {
							const subjectIdsToDelete = selectedSubjects.map(
								(subject) => subject.id
							);
							delSubject(subjectIdsToDelete);
							setSelectedSubjects([]);
						}}
					>
						Xóa môn học
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuanLyMonHoc;
