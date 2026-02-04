let cardContainer = document.querySelector("#card-container")
let bookTitles = document.querySelectorAll(".book-title");
let bookAuthor = document.querySelectorAll(".author");
let bookPages = document.querySelectorAll(".pages");
let bookRead = document.querySelectorAll(".read");

const myLibrary = [
    {title: "Slaughterhouse Five", author: "Kurt Vonnegut, Jr.", pages: "190 pages", read:"read", id: "1"},
    {title: "Leviathan Wakes", author: "James S.A. Corey", pages: "561 pages", read:"read", id: "2"},
    {title: "Project Hail Mary", author: "Andy Weir", pages: "496 pages", read:"not read yet", id: "3"},
];

// new Book("Slaughterhouse Five", "Kurt Vonnegut, Jr.", "190 pages", "read");
// new Book("Leviathan Wakes", "James S.A. Corey", "561 pages", "read");
// new Book("Project Hail Mary", "Andy Weir", "496 pages", "not read yet")

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`    
    }
    addBookToLibrary(this.title, this.author, this.pages, this.read, this.id);
}

// need to set a prototype to be gotten in addBookToLibrary?
// do i need variables for each book in the library?



function addBookToLibrary(object) {
    
    myLibrary.push(object);
    

        // check if new book is added
    if (bookTitles.length != myLibrary.length) {
        // add card div with title, author, pages, read divs
            const newCard = document.createElement("div");
            const newTitle = document.createElement("div");
            const newInfo = document.createElement("div");
            const newAuthor = document.createElement("p");
            const newPages = document.createElement("p");
            const newRead = document.createElement("p");

            cardContainer.appendChild(newCard);
            newCard.appendChild(newTitle);
            newCard.appendChild(newInfo);
            newInfo.appendChild(newAuthor);
            newInfo.appendChild(newPages);
            newInfo.appendChild(newRead);
            
            newCard.setAttribute("class", "book-card");
            newInfo.setAttribute("class", "book-info");
            newTitle.setAttribute("class", "book-title");
            newAuthor.setAttribute("class", "book-author");
            newPages.setAttribute("class", "book-pages");
            newRead.setAttribute("class", "book-read");


    }
}






// for (const title of bookTitles) {
//     // variable to grab book title
//     for (let i = 0; i < myLibrary.length; i++) {
//         title.textContent = myLibrary[i][1];
//         console.log(title);
//     }    
// }



for (let i = 0; i < myLibrary.length; i++) {
    bookTitles[i].textContent = myLibrary[i].title;
    bookAuthor[i].textContent = myLibrary[i].author;
    bookPages[i].textContent = myLibrary[i].pages;
    bookRead[i].textContent = myLibrary[i].read;
}
console.log(myLibrary.length);
console.log(bookTitles.length);


// logic for how to get the book info
    // const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
// bookInfo[i].textContent = myLibrary[i].pages;
//     bookInfo[i].textContent = myLibrary[i].read;
//     bookInfo[i].textContent = myLibrary[i].id;