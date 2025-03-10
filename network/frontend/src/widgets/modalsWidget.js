import { useRef, useState } from "react";
import "./modalsWidget.css";

export const Year = ({ dateOnChange }) => {
	function yearOptions() {
		var startYear = 1945;
		var endYear = new Date().getFullYear();

		var options = [];
		for (let year = endYear; year >= startYear; year--) {
			options.push(<option value={year}>{year}</option>);
		}
		return options;
	}
	return (
		<div className="year-input">
			<label className="date-label" htmlFor="year">
				Year
			</label>
			<br />
			<select onChange={dateOnChange} name="year" id="year">
				<option value=""></option>
				{yearOptions()}
			</select>
		</div>
	);
};

export const Month = ({ dateOnChange }) => {
	function MonthOptions() {
		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const options = [];
		for (let i = 0; i <= months.length; i++) {
			options.push(<option value={months[i]}>{months[i]}</option>);
		}
		return options;
	}
	return (
		<div className="month-input">
			<label className="date-label" htmlFor="month">
				Month
			</label>
			<br />
			<select onChange={dateOnChange} name="month" id="month">
				<option value=""></option>
				{MonthOptions()}
			</select>
		</div>
	);
};
export const Day = ({ dateOnChange }) => {
	function yearOptions() {
		var options = [];
		for (let day = 1; day <= 31; day++) {
			options.push(<option value={day}>{day}</option>);
		}
		return options;
	}
	return (
		<div className="day-input">
			<label className="date-label" ss htmlFor="day">
				day
			</label>
			<br />
			<select onChange={dateOnChange} name="day" id="day">
				<option value=""></option>
				{yearOptions()}
			</select>
		</div>
	);
};

export const TextInput = ({ handleData, handleFocus }) => {
	const [value, setValue] = useState("");
	const [rows, setRows] = useState(1);

	function handleInputChange(e) {
		setValue(e.target.value);
		handleNewLine();
	}

	function handleNewLine() {
		const textarea = document.querySelector("#text-input");
		textarea.style.height = "auto"; // Reset the height to auto

		if (value.includes("\n")) {
			setRows(rows + 1);
		}

		const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
		const lines = Math.ceil(textarea.style.scrollHeight / lineHeight);
		textarea.style.height = `${lineHeight * lines}px`;
	}

	return (
		<>
			<textarea
				onFocus={handleFocus}
				type="textarea"
				name="text"
				id="text-input"
				placeholder="What's hapenning?"
				maxLength="300"
				value={value}
				onChange={() => {
					handleInputChange();
					handleData();
				}}
				rows={rows}
			></textarea>
		</>
	);
};
