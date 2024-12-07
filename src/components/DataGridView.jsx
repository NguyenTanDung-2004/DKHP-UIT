import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import "./DataGridView.css";

const DataGridView = ({
	listData = [],
	disableData = [],
	canCheck,
	getCheckedRows,
	selectedClasses,
	canEdit, 
	showEditModal
}) => {
	const [selectedRows, setSelectedRows] = useState([]);

	const debounceCallback = useCallback(
		debounce((updatedSelectedRows) => {
			getCheckedRows(updatedSelectedRows.map((index) => listData[index]));
		}, 500),
		[listData, getCheckedRows]
	);

	const isDisabled = useCallback(
		(item) => {
			return disableData.some((disabledItem) =>
				Object.keys(disabledItem).every(
					(key) => disabledItem[key] === item[key]
				)
			);
		},
		[disableData]
	);

	const handleCheckedRows = (index) => {
		setSelectedRows((prevSelectedRows) => {
			const updatedSelectedRows = prevSelectedRows.includes(index)
				? prevSelectedRows.filter((i) => i !== index)
				: [...prevSelectedRows, index];

			debounceCallback(updatedSelectedRows);
			return updatedSelectedRows;
		});
	};

	useEffect(() => {
		const selectedIndexes = listData
			.map((item, index) =>
				selectedClasses.some(
					(selectedClass) => selectedClass.classCode === item.classCode
				)
					? index
					: null
			)
			.filter((index) => index !== null);
		setSelectedRows(selectedIndexes);
	}, [selectedClasses, listData]);

	useEffect(() => {
		setSelectedRows((prevSelectedRows) =>
			prevSelectedRows.filter((index) => !isDisabled(listData[index]))
		);
	}, [listData, disableData, isDisabled]);

	const headerNames = listData.length > 0 ? Object.keys(listData[0]) : null;

	return (
		<div className="grid-view">
			<table>
				<thead>
					{headerNames ? (
						<tr>
							{canCheck && (
								<th>
									<i className="fa-solid fa-square-minus"></i>
								</th>
							)}
							{headerNames.map((headerName) => (
								<th key={headerName}>{headerName}</th>
							))}
							{canEdit && <th></th>}
						</tr>
					) : <><h2 style={{textAlign: 'center', padding:'40px'}}>Không có dữ liệu phù hợp</h2></>}
				</thead>
				<tbody>
					{listData.map((item, index) => (
						<tr key={index} className={isDisabled(item) ? "disabled-row" : ""}>
							{canCheck && (
								<td>
									<input
										type="checkbox"
										onChange={() => handleCheckedRows(index)}
										checked={selectedRows.includes(index)}
										disabled={isDisabled(item)}
									/>
								</td>
							)}
							{headerNames.map((headerName) => (
								<td key={headerName}>{item[headerName]}</td>
							))}
							{canEdit && (
								<td>
									<button
										className="edit-button"
										onClick={() => showEditModal(item)} // Gọi modal chỉnh sửa
									>
										<i className="fa-regular fa-pen-to-square"></i>
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataGridView;
