const cardContainer = document.querySelector("#card-container")
const bookCard = document.querySelectorAll(".book-card");
const bookTitle = document.querySelectorAll(".book-title");
const bookAuthor = document.querySelectorAll(".author");
const bookPages = document.querySelectorAll(".pages");
const bookRead = document.querySelectorAll(".read");
const newBookBtn = document.querySelector("#add-new-btn")
const dialog = document.querySelector('#bookDialog');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('#closeModal');
const bookRemovalBtn = document.querySelectorAll(".book-card-btn");

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
}

// set prototype for Book
Book.prototype.toggleRead = function() {
    this.read = this.read == "read" ? "not read yet" : "read";
    
}

myLibrary = [];

const initialBooks = [
    new Book({title: "Slaughterhouse Five", author: "Kurt Vonnegut, Jr.", pages: "190 pages", read:"read", id: ""}),
    new Book({title: "Leviathan Wakes", author: "James S.A. Corey", pages: "561 pages", read:"read", id: ""}),
    new Book({title: "Project Hail Mary", author: "Andy Weir", pages: "496 pages", read:"not read yet", id: ""}),
];

initialBooks.forEach(book => myLibrary.push(book));

// add books to library and create new .book-card for it
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.table(myLibrary);
}



// set initial text content
for (let i = 0; i < myLibrary.length; i++) {
    bookTitle[i].textContent = myLibrary[i].title;
    bookAuthor[i].textContent = myLibrary[i].author;
    bookPages[i].textContent = myLibrary[i].pages;
    bookRead[i].textContent = myLibrary[i].read;
    bookCard[i].dataset.id = myLibrary[i].id;
}

// event listeners
// Show the pop-up
openBtn.addEventListener('click', () => {
    dialog.showModal(); 
});

// Close the pop-up
closeBtn.addEventListener('click', () => {
    dialog.close();
});

// Remove book card
bookRemovalBtn.forEach(button => {
    button.addEventListener('click', removeFromLibrary)
    button.addEventListener('click', removeBookCard)
})


// get form data, call addBookToLibrary()
const bookDialog = document.querySelector("#bookDialog");

bookDialog.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const allValues = Object.fromEntries(formData.entries());

    const newBookInstance = new Book(allValues);

    addBookToLibrary(newBookInstance);
    addBookCard(newBookInstance);

    dialog.close();
    e.target.reset();
})

// toggle read status
const readButton = document.querySelector(".toggle-read-btn");
const notRead = "not read yet";
const read = "read";

cardContainer.addEventListener("click", e => {
    
    
    e.preventDefault();
    if (e.target.classList.contains("toggle-read-btn")) {
        const button = e.target;
        const thisCard = button.closest(".book-card")
        // const currentStatus = thisCard.querySelector(".read");
        const bookId = thisCard.dataset.id;

        const foundBook = myLibrary.find(book => book.id == bookId)

        console.log(foundBook);
        
        // if (currentStatus.textContent == read) {
        //     currentStatus.textContent = notRead;
        // } else {
        //     currentStatus.textContent = read;
        // }
        foundBook.toggleRead();
    }
    
})

function addBookCard(object) {
        // check if new book is added

        // add card div with title, author, pages, read divs
        const newCard = document.createElement("div");
        const newTitle = document.createElement("div");
        const newInfo = document.createElement("div");
        const newAuthor = document.createElement("p");
        const newPages = document.createElement("p");
        const newRead = document.createElement("p");
        const newBookRemovalBtn = document.createElement("button");
        // set class
        newCard.setAttribute("class", "book-card");
        newCard.dataset.id = object.id;
        newInfo.setAttribute("class", "book-info");
        newTitle.setAttribute("class", "book-title");
        newAuthor.setAttribute("class", "book-author");
        newPages.setAttribute("class", "book-pages");
        newRead.setAttribute("class", "book-read");

        newBookRemovalBtn.setAttribute("class", "book-card-btn")
        newBookRemovalBtn.textContent = "Remove from library";

        // set text content
        newTitle.textContent = object.title;
        newAuthor.textContent = object.author;
        newPages.textContent = object.pages;
        newRead.textContent = object.read;

        // append
        cardContainer.appendChild(newCard);
        newCard.appendChild(newTitle);
        newCard.appendChild(newInfo);
        newInfo.appendChild(newAuthor);
        newInfo.appendChild(newPages);
        newInfo.appendChild(newRead);
        newCard.appendChild(newBookRemovalBtn);
    // console.log(object.pages)
}

function removeBookCard(event) {
    const button = event.target;
    const bookCardDiv = button.closest(".book-card");
    if (bookCardDiv) {
        const bookId = bookCardDiv.getAttribute("data-id");
        console.log("Removing item with ID:", bookId);
    }
    bookCardDiv.remove()
}


function removeFromLibrary(event) {
    const button = event.target;
    const bookCardDiv = button.closest(".book-card");
    const bookId = bookCardDiv.getAttribute("data-id");

    // findIndex to identify location with same id
    const bookIndex = myLibrary.findIndex(book => book.id == bookId);
    // splice to remove that object in that location
    myLibrary.splice(bookIndex, 1);
    console.table(myLibrary)
}

