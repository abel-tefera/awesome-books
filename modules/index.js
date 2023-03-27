/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

import "../css/index.css";
import { Book } from "./Book";
import { bookCard } from "./bookCard";
import { Library } from "./Library";
import { DateTime } from "luxon";

const library = new Library();

customElements.define("book-card", bookCard);

// const addBookModal = document.querySelector('.modal');
const contactForm = document.querySelector(".contact-form");
const addBookContainer = document.querySelector(".add-book-container");
const dateTimeDiv = document.querySelector(".date-time-div");

const recreateUI = () => {
  const existingBooks = document.querySelector(".books-container");
  if (existingBooks) {
    existingBooks.remove();
  }
  const mainContainer = document.querySelector(".main-container");
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("row", "books-container");

  for (const book of library.booksData) {
    const { id, title, author, description, cover } = book;
    const bookItem = document.createElement("div");
    bookItem.classList.add("col-12", "col-md-6", "col-lg-4", "my-3");
    bookItem.innerHTML = `<book-card
        id=${JSON.stringify(id)}
        title=${JSON.stringify(title)}
        author=${JSON.stringify(author)}
        description=${JSON.stringify(description)}
        cover=${JSON.stringify(cover)}
        ></book-card>`;
    bookContainer.appendChild(bookItem);
  }

  mainContainer.appendChild(bookContainer);

  const cardBtns = document.querySelectorAll(".card-btn");
  cardBtns.forEach((cardBtn) => {
    const idx = parseInt(cardBtn.id.split("-")[2]);
    cardBtn.addEventListener("click", () => {
      console.log("XSAC");
      removeBook(idx);
    });
  });
};

const addBookHandler = (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector(".new-book-title");
  const bookAuthor = document.querySelector(".new-book-author");

  const book = new Book(bookTitle.value, bookAuthor.value);
  library.addBook(book);
  bookTitle.value = "";
  bookAuthor.value = "";
  main();
};

const removeBook = (idx) => {
  library.removeBook(idx);
  recreateUI();
};

const main = () => {
  dateTimeDiv.innerHTML = dt;
  contactForm.style.display = "none";
  addBookContainer.style.display = "none";
  recreateUI();
};

const showContact = () => {
  contactForm.style.display = "block";
  addBookContainer.style.display = "none";
  const existingBooks = document.querySelector(".books-container");
  if (existingBooks) {
    existingBooks.remove();
  }
};

const showAddBook = () => {
  contactForm.style.display = "none";
  const existingBooks = document.querySelector(".books-container");
  if (existingBooks) {
    existingBooks.remove();
  }
  addBookContainer.style.display = "block";
};

const form = document.querySelector(".add-book-form");
form.addEventListener("submit", addBookHandler);

const contactBtn = document.querySelector("#contact-btn");
contactBtn.addEventListener("click", () => {
  showContact();
});

const homeBtn = document.querySelector("#home-btn");
homeBtn.addEventListener("click", () => {
  main();
});

const addBookBtn = document.querySelector("#add-book-btn");
addBookBtn.addEventListener("click", () => {
  showAddBook();
});

const dt = DateTime.now();;
main();
