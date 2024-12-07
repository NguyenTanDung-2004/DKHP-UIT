import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = () => {
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);

	const [selectedProvince, setSelectedProvince] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");

	// Lấy danh sách tỉnh khi load trang
	useEffect(() => {
		axios
			.get("https://provinces.open-api.vn/api/p")
			.then((response) => {
				setProvinces(response.data);
			})
			.catch((error) => {
				console.error("Lỗi khi tải danh sách tỉnh:", error);
			});
	}, []);

	// Khi chọn tỉnh, lấy danh sách huyện
	const handleProvinceChange = (e) => {
		const provinceCode = e.target.value;
		setSelectedProvince(provinceCode);

		if (provinceCode) {
			axios
				.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
				.then((response) => {
					setDistricts(response.data.districts);
					setWards([]); // Xóa danh sách xã/phường nếu tỉnh thay đổi
				})
				.catch((error) => {
					console.error("Lỗi khi tải danh sách huyện:", error);
				});
		} else {
			setDistricts([]);
			setWards([]);
		}
	};

	// Khi chọn huyện, lấy danh sách xã/phường
	const handleDistrictChange = (e) => {
		const districtCode = e.target.value;
		setSelectedDistrict(districtCode);

		if (districtCode) {
			axios
				.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
				.then((response) => {
					setWards(response.data.wards);
				})
				.catch((error) => {
					console.error("Lỗi khi tải danh sách xã:", error);
				});
		} else {
			setWards([]);
		}
	};

	return (
		<>
			<div className="form-group__item">
				<label>Tỉnh/Tp:</label>
				<select value={selectedProvince} onChange={handleProvinceChange}>
					<option value="">Chọn tỉnh</option>
					{provinces.map((province) => (
						<option key={province.code} value={province.code}>
							{province.name}
						</option>
					))}
				</select>
			</div>
			<div className="form-group__item">
				<label>Quận/Huyện:</label>
				<select
					value={selectedDistrict}
					onChange={handleDistrictChange}
					disabled={!selectedProvince}
				>
					<option value="">Chọn huyện</option>
					{districts.map((district) => (
						<option key={district.code} value={district.code}>
							{district.name}
						</option>
					))}
				</select>
			</div>
			<div className="form-group__item">
				<label>Xã/Phường:</label>
				<select disabled={!selectedDistrict}>
					<option value="">Chọn xã</option>
					{wards.map((ward) => (
						<option key={ward.code} value={ward.code}>
							{ward.name}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default AddressForm;
