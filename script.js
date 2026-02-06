const myLibrary = [
    {title: "Slaughterhouse Five", author: "Kurt Vonnegut, Jr.", pages: "190 pages", read:"read", id: "1"},
    {title: "Leviathan Wakes", author: "James S.A. Corey", pages: "561 pages", read:"read", id: "2"},
    {title: "Project Hail Mary", author: "Andy Weir", pages: "496 pages", read:"not read yet", id: "3"},
];

const cardContainer = document.querySelector("#card-container")
let bookCard = document.querySelectorAll(".book-card");
let bookTitle = document.querySelectorAll(".book-title");
let bookAuthor = document.querySelectorAll(".author");
let bookPages = document.querySelectorAll(".pages");
let bookRead = document.querySelectorAll(".read");
const newBookBtn = document.querySelector("#add-new-btn")
const dialog = document.querySelector('#bookDialog');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('#closeModal');

// set initial text content
for (let i = 0; i < myLibrary.length; i++) {
    bookTitle[i].textContent = myLibrary[i].title;
    bookAuthor[i].textContent = myLibrary[i].author;
    bookPages[i].textContent = myLibrary[i].pages;
    bookRead[i].textContent = myLibrary[i].read;
}

// Show the pop-up
openBtn.addEventListener('click', () => {
  dialog.showModal(); 
});

// Close the pop-up
closeBtn.addEventListener('click', () => {
  dialog.close();
});

// get form data, call addBookToLibrary()
const bookDialog = document.querySelector("#bookDialog");

bookDialog.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const allValues = Object.fromEntries(formData.entries());
    new Book(allValues);
    console.log(allValues)
    dialog.close();
})

// new Book constructor
function Book({title, author, pages, read}) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`;    
    }
    addBookToLibrary(this);
    console.log(this)
}
// add book to library and create new .book-card for it
function addBookToLibrary(object) {
    
    myLibrary.push(object);
    

        // check if new book is added
    if (bookCard.length != myLibrary.length) {
        // add card div with title, author, pages, read divs
        const newCard = document.createElement("div");
        const newTitle = document.createElement("div");
        const newInfo = document.createElement("div");
        const newAuthor = document.createElement("p");
        const newPages = document.createElement("p");
        const newRead = document.createElement("p");

        // set class
        newCard.setAttribute("class", "book-card");
        newInfo.setAttribute("class", "book-info");
        newTitle.setAttribute("class", "book-title");
        newAuthor.setAttribute("class", "book-author");
        newPages.setAttribute("class", "book-pages");
        newRead.setAttribute("class", "book-read");

        // set text content
        newTitle.textContent = object.title;
        newAuthor.textContent = object.author;
        newPages.textContent = object.pages;
        newRead.textContent = object.read;
        console.log(object.title)

        // append
        cardContainer.appendChild(newCard);
        newCard.appendChild(newTitle);
        newCard.appendChild(newInfo);
        newInfo.appendChild(newAuthor);
        newInfo.appendChild(newPages);
        newInfo.appendChild(newRead);
    }
    console.log(object.pages)

}

function removeFromLibrary(object) {
    myLibrary.slice(object);
}
