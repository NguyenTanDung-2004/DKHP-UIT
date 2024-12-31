import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm1 = ({ onChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

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

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);

    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
          setWards([]); // Reset wards when province changes
        })
        .catch((error) => {
          console.error("Lỗi khi tải danh sách huyện:", error);
        });
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

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

  useEffect(() => {
    // Send selected address to parent when any selection changes
    onChange({
      tinh_thanhPho1: selectedProvince,
      quan_huyen1: selectedDistrict,
      xa_phuong1: selectedWard,
    });
  }, [selectedProvince, selectedDistrict, selectedWard, onChange]);

  return (
    <>
      <div className="form-group__item">
        <label>Tỉnh/Tp hiện ở:</label>
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
        <label>Quận/Huyện hiện ở:</label>
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
        <label>Xã/Phường hiện ở:</label>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          disabled={!selectedDistrict}
        >
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

export default AddressForm1;
