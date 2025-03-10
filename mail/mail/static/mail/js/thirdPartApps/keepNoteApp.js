import { noteApp } from "../utils/DOMmanipulation.js";
import {
	loadNoteForm,
	loadListNoteForm,
	noteItemWidget,
} from "../utils/components.js";

export const KeepNoteApp = async () => {
	// Container Element
	const myAppsDIv = document.querySelector("#thirdPart-apps");
	const settingsContainer = document.querySelector(".settings-container");
	const emailsContent = document.querySelector(".emails-content");
	const emailContentDiv = document.querySelector(
		".content-settings-container"
	);
	// Load the note app
	var noteAppContainer = await noteApp();
	myAppsDIv.innerHTML = "";
	myAppsDIv.appendChild(noteAppContainer);

	// Note Divs element
	const noteAppHome = document.querySelector("#noteApp-home");
	const noteAppBody = document.querySelector("#noteApp-body");
	const addNoteWrapper = noteAppBody.querySelector("#addNote-wrapper");
	const noteListBtnDiv = document.querySelector("#newNote-newList");
	const noteAppWrapper = document.querySelector(".noteApp-wrapper");

	// Functional button
	const newNoteBtn = document.querySelector("#newNote");
	const listNoteBtn = document.querySelector("#newList");
	const searchNoteBtn = document.querySelector("#search-note");
	const closeMyAppsBtn = document.querySelector("#closeApp-btn");

	// Get emailContent current max width
	let maxWidth =
		parseFloat(getComputedStyle(emailContentDiv).maxWidth) /
		parseFloat(getComputedStyle(emailContentDiv).fontSize);

	// ADD EVENT LISTENER
	// Close the third Apps div
	closeMyAppsBtn.addEventListener("click", () => {
		console.log("close myapp btn is clicked");
		myAppsDIv.style.display = "none";
		noteAppWrapper.style.display = "none";
		emailContentDiv.style.maxWidth = `${maxWidth + 18.65}em`;

		const isSettingsDisplayed = settingsContainer.style.display;
		if (isSettingsDisplayed == "block") {
			emailsContent.style.maxWidth = "71%";
		}
	});

	var noteMap = {
		title: "",
		note: "",
	};

	// for new note
	newNoteBtn.addEventListener("click", () => {
		noteListBtnDiv.style.display = "none";

		//addNoteWrapper.innerHTML = "";
		noteAppBody.style.display = "block";

		var noteForm = loadNoteForm();

		const firstChild = addNoteWrapper.firstChild;
		if (firstChild) {
			addNoteWrapper.insertBefore(noteForm, firstChild);
		} else {
			addNoteWrapper.appendChild(noteForm);
		}

		const noteListDiv = document.querySelector(".noteList-div");
		const noteTitleInput = document.querySelector("#noteList-title");
		const noteInput = document.querySelector("#noteList-body");

		noteTitleInput.addEventListener("input", () => {
			noteMap.title = noteTitleInput.value;
		});

		noteInput.addEventListener("input", () => {
			noteMap.note = noteInput.value;
		});

		const addNoteBtn = document.querySelector("#add-note-list");
		const noteControlBtns = document.querySelector(".noteControl-Btns");
		addNoteBtn.addEventListener("click", () => {
			noteListBtnDiv.style.display = "flex";
			noteListDiv.classList.add("mynote-Item");

			addNoteBtn.classList.add("hide-it");
			noteControlBtns.classList.add("hide-it");

			console.log("New note title:", noteMap.title);
			console.log("New note body:", noteMap.note);

			const requestData = {
				title: noteMap.title,
				note: noteMap.note,
			};
			fetch("addNotes/note", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(requestData),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data); // Check the response from the server
				});
		});
	});

	var noteListMap = {
		title: "",
		notes: [],
	};

	// FOR ADDING A NEW NOTE LIST
	listNoteBtn.addEventListener("click", () => {
		noteListBtnDiv.style.display = "none";

		// Clean the wrapper content
		//addNoteWrapper.innerHTML = "";
		noteAppBody.style.display = "block";

		// Load add note list form
		var noteForm = loadListNoteForm("new note");

		const firstChild = addNoteWrapper.firstChild;
		if (firstChild) {
			addNoteWrapper.insertBefore(noteForm, firstChild);
		} else {
			addNoteWrapper.appendChild(noteForm);
		}

		// Containers and input element
		const noteListDiv = document.querySelector(".noteList-div");
		const noteListItemsDiv = document.querySelector("#note-list-items");
		const noteTitleInput = document.querySelector("#noteList-title");
		const listNoteInput = document.querySelector(".noteList-body2");

		// add event listener to the tilte input
		noteTitleInput.addEventListener("input", () => {
			noteListMap.title = noteTitleInput.value;
			console.log("title working :", noteMap.title);
		});

		// add event listener to the body input
		let itemIndex = 0;
		listNoteInput.addEventListener("input", () => {
			let tempInputValue = listNoteInput.value;
			if (tempInputValue.length >= 1 && tempInputValue.length != 0) {
				// remove focus
				listNoteInput.blur();

				// load the new note item widget
				++itemIndex;
				let noteItem = noteItemWidget(false, itemIndex);
				noteListItemsDiv.appendChild(noteItem);
				//  get the new note item input
				const currentNoteItem = noteListItemsDiv.querySelector(
					`#noteList-item${itemIndex}`
				);

				// fill the new note item input with the value inputed and put focus on it
				currentNoteItem.value = listNoteInput.value;
				listNoteInput.value = "";
				currentNoteItem.focus();
				currentNoteItem.addEventListener("change", () => {
					noteListMap.notes.push(currentNoteItem.value);
				});
			}
		});

		const checkedNotesDiv = document.querySelector(".checked-notes");
		const checkedNotesWrapper = document.querySelector(
			".checked-notes-wrapper"
		);
		const notesCountSpan = document.querySelector(".checked-count");

		// Note List items checked
		//let itemIndex2 = 0;
		let checkedCount = 0;
		noteListItemsDiv.addEventListener("click", (event) => {
			const target = event.target;
			const noteItem = target.closest(".note-Item");

			if (noteItem) {
				const noteInput = noteItem.querySelector("input");

				if (
					target.classList.contains("close-noteItem") ||
					target.classList.contains("close-icon")
				) {
					// Handle close button click
					noteItem.remove();
					const noteIndex = noteListMap.notes.indexOf(
						noteInput.value
					);
					if (noteIndex !== -1) {
						noteListMap.notes.splice(noteIndex, 1); // Remove the note from the array
					}
				} else if (
					target.classList.contains("item-checkbox") ||
					target.classList.contains("checkbox-icon")
				) {
					console.log("note input: ", noteInput);
					console.log("note input id: ", noteInput.id);
					console.log("note input value: ", noteInput.value);

					// Handle checkbox click
					const inputValue = noteInput.value;

					console.log("InputValue = ", inputValue);
					noteItem.remove();

					const noteIndex = noteListMap.notes.indexOf(
						noteInput.value
					);
					if (noteIndex !== -1) {
						noteListMap.notes.splice(noteIndex, 1); // Remove the note from the array
					}

					//++itemIndex2;
					++checkedCount;
					let noteItemChecked = noteItemWidget(
						true,
						null,
						noteInput.id
					);
					checkedNotesDiv.appendChild(noteItemChecked);

					notesCountSpan.textContent = `${checkedCount} completed item${
						checkedCount > 1 ? "s" : ""
					}`;
					checkedNotesWrapper.style.display = "block";

					const currentNoteItem = document.querySelector(
						`#${noteInput.id}`
					);
					currentNoteItem.value = inputValue;
				}
			}
		});

		checkedNotesWrapper.addEventListener("click", (event) => {
			const target = event.target;
			const noteItem = target.closest(".note-Item");

			if (noteItem) {
				const noteInput = noteItem.querySelector("input");

				if (
					target.classList.contains("close-noteItem") ||
					target.classList.contains("close-icon")
				) {
					// Handle close button click
					noteItem.remove();
					checkedCount--;
					notesCountSpan.textContent = `${checkedCount} completed item${
						checkedCount > 1 ? "s" : ""
					}`;

					if (checkedCount === 0) {
						notesCountSpan.textContent = "";
						checkedNotesWrapper.style.display = "none";
					}
				}
			}
		});

		const addNoteBtn = document.querySelector("#add-note-list");
		const noteControlBtns = document.querySelector(".noteControl-Btns");
		addNoteBtn.addEventListener("click", () => {
			noteListBtnDiv.style.display = "flex";
			noteListDiv.classList.add("mynote-Item");
			addNoteBtn.classList.add("hide-it");
			noteControlBtns.classList.add("hide-it");

			console.log("New note title:", noteListMap.title);
			console.log("New note body:", noteListMap.notes);
		});
	});

	// Note Items event listeners
	const noteItems = document.querySelectorAll(".mynote-Item");

	noteItems.forEach((noteItem) => {
		const noteControlBtns = noteItem.querySelector(".noteControl-Btns");
		const addNoteBtn = noteItem.querySelector("#add-note-list");
		const noteMenuDiv = noteItem.querySelector(".noteMenu-div");

		noteItem.addEventListener("mouseenter", () => {
			noteControlBtns.classList.remove("hide-it");
		});

		noteItem.addEventListener("mouseleave", () => {
			noteControlBtns.classList.add("hide-it");
		});

		noteMenuBtn.addEventListener("click", () => {
			noteMenuDiv.style.display = "block";
		});
	});

	//noteMenu.addEventListener("click", () => {});
};
