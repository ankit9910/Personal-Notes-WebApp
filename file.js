showNotes();

notesObj = [];
let addBtn = document.querySelector('#addBtn');
addBtn.addEventListener("click", function(e) {
	let addText = document.querySelector('#addText');
	let notes = localStorage.getItem("notes");
	if(notes == null) {
		notesObj = [];
		//notesObj.push(addtext.value);
	} else {
		notesObj = JSON.parse(notes);
		//notesObj.push(addtext.value);
	}
	let myObj = {
		title: addTitle.value,
		text: addText.value
	}
	notesObj.push(myObj);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addText.value = "";
	addTitle.value = "";
	//console.log(notesObj);
	showNotes();
});

//for displaying the localstorage data
function showNotes() {
	let notes = localStorage.getItem("notes");
	if(notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	let html = "";
	notesObj.forEach(function(element, index) {
		html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
  			<div class="card-body">
    			<h5 class="card-title">${element.title}</h5>
    			<p class="card-text">${element.text}</p>
    			<button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
    		</div>
  		</div>`;
	});
	let notesElm = document.getElementById("notes");
	if(notesObj.length != 0)
	{
		notesElm.innerHTML = html;
	} else {
		notesElm.innerHTML = `Add Some Notes`;
	}
}

//for delete the note
function deleteNote(index){
	let notes = localStorage.getItem("notes");
	if(notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	showNotes();
}

//for searching the note
let search = document.querySelector('#searchText');
search.addEventListener("input", function(){
	let inputVal = search.value.toLowerCase();

	let noteCards = document.getElementsByClassName('noteCard');
	Array.from(noteCards).forEach(function(element){
		let cardText = element.getElementsByTagName("p")[0].innerText;
		if(cardText.includes(inputVal)){
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	})

})
