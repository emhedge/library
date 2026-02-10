const cardContainer = document.querySelector("#card-container")
const bookCard = document.querySelectorAll(".book-card");
const bookTitle = document.querySelectorAll(".book-title");
const bookAuthor = document.querySelectorAll(".author-specifics");
const bookPages = document.querySelectorAll(".pages-specifics");
const bookRead = document.querySelectorAll(".read-specifics");
const newBookBtn = document.querySelector("#add-new-btn")
const dialog = document.querySelector('#bookDialog');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('#closeModal');
const bookRemovalBtn = document.querySelectorAll(".book-removal-btn");

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

// start with three books
const initialBooks = [
    new Book({title: "Slaughterhouse Five", author: "Kurt Vonnegut, Jr.", pages: "190 pages", read:"Read"}),
    new Book({title: "Leviathan Wakes", author: "James S.A. Corey", pages: "561 pages", read:"Read"}),
    new Book({title: "Project Hail Mary", author: "Andy Weir", pages: "496 pages", read:"Read"}),
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


// event handlers for toggling read and removing from library
const notRead = "Not read yet";
const read = "Read";

cardContainer.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("toggle-read-btn")) {
        const button = e.target;
        const thisCard = button.closest(".book-card")
        const currentStatus = thisCard.querySelector(".read-specifics");
        const bookId = thisCard.dataset.id;

        const foundBook = myLibrary.find(book => book.id == bookId)
        
        if (currentStatus.textContent == read) {
            currentStatus.textContent = notRead;
        } else {
            currentStatus.textContent = read;
        }
        foundBook.toggleRead();
    }

    if (e.target.classList.contains("book-removal-btn")) {
        const button = e.target;
        const thisCard = button.closest(".book-card")
        const bookId = thisCard.dataset.id;
        const foundBook = myLibrary.find(book => book.id == bookId);
        myLibrary.splice(foundBook, 1);
        thisCard.remove();
    }
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

function addBookCard(object) {
        // add card div with title, author, pages, read divs
        const newCard = document.createElement("div");
        const newTitle = document.createElement("div");
        const newInfo = document.createElement("div");
        const newBookSpecifics = document.createElement("div");
        const newAuthor = document.createElement("p");
        const newPages = document.createElement("p");
        const newRead = document.createElement("p");
        const newBtnDiv = document.createElement("div");
        const newBookRemovalBtn = document.createElement("button");
        const newReadBtn = document.createElement("button");

        // set class
        newCard.setAttribute("class", "book-card");
        newCard.dataset.id = object.id;
        newInfo.setAttribute("class", "book-info");
        newBookSpecifics.setAttribute("id", "book-specifics")
        newTitle.setAttribute("class", "book-title");
        newAuthor.setAttribute("class", "author-specifics");
        newPages.setAttribute("class", "pages-specifics");
        newRead.setAttribute("class", "read-specifics");
        newBtnDiv.setAttribute("class", "book-card-btn-div");
        newBookRemovalBtn.setAttribute("class", "book-removal-btn")
        newBookRemovalBtn.setAttribute("type", "button")
        newBookRemovalBtn.textContent = "Remove from library";
        newReadBtn.setAttribute("class", "toggle-read-btn");
        newReadBtn.setAttribute("type", "button")
        newReadBtn.textContent = "Toggle read";

        // set text content
        newTitle.textContent = object.title;
        newAuthor.textContent = object.author;
        newPages.textContent = object.pages;
        newRead.textContent = object.read;

        // append
        cardContainer.appendChild(newCard);
        newCard.appendChild(newTitle);
        newCard.appendChild(newInfo);
        newInfo.appendChild(newBookSpecifics);
        newBookSpecifics.appendChild(newAuthor);
        newBookSpecifics.appendChild(newPages);
        newBookSpecifics.appendChild(newRead);
        
        newCard.appendChild(newBtnDiv);
        newBtnDiv.appendChild(newBookRemovalBtn);
        newBtnDiv.appendChild(newReadBtn);
}
