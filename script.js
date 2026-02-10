const cardContainer = document.querySelector("#card-container")
const newBookBtn = document.querySelector("#add-new-btn")
const dialog = document.querySelector('#bookDialog');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('#closeModal');

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
    this.read = this.read == "Read" ? "Not yet read" : "Read";
}
myLibrary = [];

// start with three books
const initialBooks = [
    new Book({title: "Slaughterhouse Five", author: "Kurt Vonnegut, Jr.", pages: "190 pages", read:"Read"}),
    new Book({title: "Leviathan Wakes", author: "James S.A. Corey", pages: "561 pages", read:"Read"}),
    new Book({title: "Project Hail Mary", author: "Andy Weir", pages: "496 pages", read:"Not yet read"}),
];

initialBooks.forEach(book => {
    addBookToLibrary(book);
    addBookCard(book);
});

// add books to library and create new .book-card for it
function addBookToLibrary(book) {
    myLibrary.push(book);
    console.table(myLibrary);
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
const notRead = "Not yet read";
const read = "Read";

cardContainer.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("toggle-read-btn")) {
        const button = e.target;
        const thisCard = button.closest(".book-card")
        const currentStatus = thisCard.querySelector(".read-specifics");
        const bookId = thisCard.dataset.id;

        const foundBook = myLibrary.find(book => book.id == bookId);
        
        

        if (currentStatus.textContent == read) {
            currentStatus.textContent = notRead;
        } else {
            currentStatus.textContent = read;
        }
        foundBook.toggleRead();
        button.classList.toggle("is-read", foundBook.read === "Read");
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
    const newBookDescriptors = document.createElement("div");
    const newBookSpecifics = document.createElement("div");
    const newAuthor = document.createElement("p");
    const newAuthorSpecs = document.createElement("p");
    const newPages = document.createElement("p");
    const newPagesSpecs = document.createElement("p");
    const newRead = document.createElement("p");
    const newReadSpecs = document.createElement("p");
    const newBtnDiv = document.createElement("div");
    const newBookRemovalBtn = document.createElement("button");
    const newReadBtn = document.createElement("button");
    

    // set class
    newCard.setAttribute("class", "book-card");
    newCard.dataset.id = object.id;
    newInfo.setAttribute("class", "book-info");
    newBookDescriptors.setAttribute("id", "book-descriptors");
    newBookSpecifics.setAttribute("id", "book-specifics")
    newTitle.setAttribute("class", "book-title");
    newAuthor.setAttribute("class", "author");
    newAuthor.textContent = "Author:"
    newAuthorSpecs.setAttribute("class", "author-specifics");
    newPages.setAttribute("class", "pages");
    newPages.textContent = "Page Count:"
    newPagesSpecs.setAttribute("class", "pages-specifics");
    newRead.setAttribute("class", "read");
    newRead.textContent = "Finished?"
    newReadSpecs.setAttribute("class", "read-specifics");
    newBtnDiv.setAttribute("class", "book-card-btn-div");
    newBookRemovalBtn.setAttribute("class", "book-removal-btn")
    newBookRemovalBtn.setAttribute("type", "button")
    newBookRemovalBtn.textContent = "Remove from library";
    newReadBtn.setAttribute("class", "toggle-read-btn");
    newReadBtn.setAttribute("type", "button")
    newReadBtn.textContent = "Finished";

    // set text content
    newTitle.textContent = object.title;
    newAuthorSpecs.textContent = object.author;
    newPagesSpecs.textContent = object.pages;
    newReadSpecs.textContent = object.read;

    // append
    cardContainer.appendChild(newCard);
    newCard.appendChild(newTitle);
    newCard.appendChild(newInfo);
    newInfo.appendChild(newBookDescriptors);
    newInfo.appendChild(newBookSpecifics);
    newBookDescriptors.appendChild(newAuthor);
    newBookSpecifics.appendChild(newAuthorSpecs);
    newBookDescriptors.appendChild(newPages);
    newBookSpecifics.appendChild(newPagesSpecs);
    newBookDescriptors.appendChild(newRead);
    newBookSpecifics.appendChild(newReadSpecs);
    
    newCard.appendChild(newBtnDiv);
    newBtnDiv.appendChild(newReadBtn);
    newBtnDiv.appendChild(newBookRemovalBtn);

    if (object.read === "Read") {
        newReadBtn.classList.add("is-read")
    }
}
