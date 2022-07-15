("use strict");
// ============================================================================
// SHELF, BOOKS-LIST and BOOK-CARDS
// ============================================================================

// This is a saved library to populate the screen for the first time.
let myLibrary = [
  { title: "Laws of UX", author: "Jon Yablonski", pages: "138", isRead: true },
  { title: "Revelation Space", author: "Alastair Reynolds", pages: "567", isRead: true },
  { title: "Pandora's Star", author: "Peter F. Hamilton", pages: "988", isRead: false },
  { title: "Diamond Age", author: "Neal Stephenson", pages: "752", isRead: true },
  { title: "How to Read a Book", author: "Mortimer Adler", pages: "238", isRead: false },
];

// let myLibrary = [];

// Check if there is a version of "myLibrary" stored locally.
const localLibrary = localStorage.getItem("libraryBooks");

if (localLibrary) {
  myLibrary = JSON.parse(localLibrary);
}

// Initialise base DOM elements
const shelf = document.querySelector(".shelf");
const form = document.querySelector("form");

// ----------------------------------------------

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  description() {
    console.log(`${this.title} by ${this.author} has ${this.pages} pages. Was the book read? ${this.isRead}`);
  }
}

// Create a book card - HTML element
function createCard(book) {
  // Create the card div elements with the proper classes assigned
  const cardBook = document.createElement("div");
  cardBook.classList.add("book-card");

  const cardBtnContainer = document.createElement("div");
  cardBtnContainer.classList.add("card-btn-container");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  const cardAuthor = document.createElement("div");
  cardAuthor.classList.add("card-author");
  const cardPages = document.createElement("div");
  cardPages.classList.add("card-pages");
  const cardDelete = deleteBtn();
  const cardRead = readBtn(book.isRead);

  if (book.isRead) {
    cardBook.classList.add("read");
  }
  cardTitle.innerText = `${book.title}`;
  cardAuthor.innerText = `${book.author}`;
  cardPages.innerText = `${book.pages}`;
  cardBtnContainer.append(cardDelete, cardRead);

  //  Create the card
  cardBook.append(cardTitle, cardAuthor, cardPages, cardBtnContainer);
  shelf.append(cardBook);
}

function addBook() {
  // Create the book object first
  // Remove whitespace if any.
  let title = document.querySelector("#book-title").value;
  title = title.replace(/\s+/g, " ").trim();
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#book-pages").value;
  let isRead = document.querySelector("#book-read").checked;
  let newBook = new Book(title, author, pages, isRead);

  // Update the library lists and the DOM
  myLibrary.push(newBook);
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
  createCard(newBook);

  // Hiddes the form
  formContainer.classList.toggle("on");
}

// Create some DOM nodes and support function

function deleteBtn() {
  let deleteBtn = document.createElement("div");
  deleteBtn.classList.add("close-card", "card-button");
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", deleteCard);
  return deleteBtn;
}

function deleteCard() {
  let toDeleteIndex;

  //  Find the index for myLibrary when the titles are matching.
  //  TODO Add more verifications (author, isbn, ...)
  for (let index = 0; index < myLibrary.length; index++) {
    if (this.parentNode.parentNode.childNodes[0].innerText === myLibrary[index].title) {
      toDeleteIndex = index;
    }
  }

  //  Delete and update the DOM, local list and storage
  myLibrary.splice(toDeleteIndex, 1);
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
  this.parentNode.parentNode.remove();
  totalDisplay.innerText = `${myLibrary.length}`;
  readDisplay.innerText = `${updateRead()}`;
}

function readBtn(read) {
  let readBtn = document.createElement("div");
  readBtn.classList.add("read-card", "card-button");
  if (read) {
    readBtn.innerText = "read";
    readBtn.classList.add("read");
  } else {
    readBtn.innerText = "unread";
  }
  readBtn.addEventListener("click", readCard);
  return readBtn;
}

function readCard() {
  this.classList.toggle("read");
  if (this.innerText === "read") {
    this.innerText = "unread";
    this.parentNode.parentNode.classList.remove("read");
  } else {
    this.innerText = "read";
    this.parentNode.parentNode.classList.add("read");
  }

  //  Find the index for myLibrary when the titles are matching.
  // And change and push the read status
  //  TODO Add more verifications (author, isbn, ...)
  for (let index = 0; index < myLibrary.length; index++) {
    if (this.parentNode.parentNode.childNodes[0].innerText === myLibrary[index].title) {
      if (this.classList.contains("read")) {
        myLibrary[index].isRead = true;
      } else {
        myLibrary[index].isRead = false;
      }
    }
  }

  //  Update the DOM, local list and storage
  localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
  readDisplay.innerText = `${updateRead()}`;
}
// ============================================================================

const newBookButton = document.querySelector("#new-book");
const formCloseButton = document.querySelector(".close-submit-card");
const formCard = document.querySelector("form");
const formContainer = document.querySelector(".form-container");
const totalDisplay = document.querySelector("#books-total");
const readDisplay = document.querySelector("#books-read");

function closeForm(e) {
  e.stopPropagation();
  formContainer.classList.toggle("on");
}

newBookButton.addEventListener("click", closeForm);
formCloseButton.addEventListener("click", closeForm);
formContainer.addEventListener("click", closeForm);
formCard.addEventListener("click", (e) => {
  e.stopPropagation();
});

totalDisplay.innerText = `${myLibrary.length}`;
readDisplay.innerText = `${updateRead()}`;

function updateRead() {
  let booksRead = 0;
  for (let book of myLibrary) {
    if (book.isRead) {
      booksRead += 1;
    }
  }
  return booksRead;
}

// ============================================================================
// Start to fill the DOM
// Loop through the library and add all books to the page.
for (let book of myLibrary) {
  createCard(book);
}

const initialise = function () {
  form.addEventListener("submit", addBook);
};
document.addEventListener("DOMContentLoaded", initialise);
