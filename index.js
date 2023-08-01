const addButton = document.querySelector("#add");  //getting reference of the button

 const updateLSData=()=>{
    const textAreaData =  document.querySelectorAll('textarea'); //getting reference of textarea (querySelectorAll is used because many note div with same class)
    const notesArray = []; //making an emply array where the text to be saved
    // console.log(textAreaData);
    textAreaData.forEach((note)=>{ //textAreaData is an array of lots of note div
        return notesArray.push(note.value); //pushing note values to empty notesArray one by one
    })
    // console.log(notesArray);

    localStorage.setItem('notesArray', JSON.stringify(notesArray))
    //in storage, if add-> use setItem, if want to get->getItem
    //make the objects to strings, and save to localStorage
     
 }


const addNewNote = (text = "") => {   //initially no text is there in note div
 
  const note = document.createElement("div"); //create a empty note div
  note.classList.add("note"); //assigne a class (class note) to that emplty div

  // the note div that is to be added dynamically when button is clicked
  const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;
    //>if already text is there, that mean that is main div,
    //then hide the  blinking cursor textarea(ie ask for typing)
    //>if text is not there, that mean that is textarea (cursor will ask for type)
    // then do hide the main div
    // ---------------------------------------------------------------------

  note.insertAdjacentHTML("afterbegin", htmlData); //insert the html items in the note div

  // getting the reference of edit and delete button
  //getting the references of main div and texarea
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main"); // the textarea after saving the note
  const textArea = note.querySelector("textarea"); //the area that is asking to type

  //deleting the node
  delButton.addEventListener("click", () => {
    note.remove(); //.remove() function directly remove a div
    updateLSData(); //update LS after delete also
  });

   //before toggle or after toggle, the text should be displayed
  textArea.value = text;
  mainDiv.innerHTML = text;

  //toggling using edit button : once click on edit button enables typing, 
  //2nd click on edit button save the text and disables the typing
  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  //getting the text of textarea in main div after cursor change
  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    
    // call a update local storage data, ie defined at top
    updateLSData();
  });

  document.body.appendChild(note); //apending the note div to the page after creating a new note div dynamically and add button is clicked
};


//getting data back from local localStorage
const notesArray = JSON.parse(localStorage.getItem('notesArray'));

if(notesArray){ notesArray.forEach((note)=>addNewNote(note)) };//add a new note for each note of the array notesArray

 addButton.addEventListener("click", () => addNewNote());//if the button is clicked, call a fuction to add new note
  
 