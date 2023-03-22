/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

/* eslint-disable */

class Book {
  constructor(title, author) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.description = `Lorem ipsum dolor sit amet 
    consectetur adipisicing elit. Velit
    earum saepe fugiat!`;
    this.cover = `assets/book.png`;
  }
}

class Library {
  constructor() {
    const booksDataFromLocalStorage = JSON.parse(
      localStorage.getItem("booksData")
    );
    const booksLSExists =
      booksDataFromLocalStorage !== undefined &&
      booksDataFromLocalStorage !== null;

    this.booksData = booksLSExists
      ? booksDataFromLocalStorage
      : [
          {
            id: 1,
            title: `Lorem, ipsum.`,
            author: `John Doe`,
            description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Velit
            earum saepe fugiat!`,
            cover: `assets/book.png`,
          },
          {
            id: 2,
            title: `Lorem, ipsum.`,
            author: `John Doe`,
            description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Velit
            earum saepe fugiat!`,
            cover: `assets/book.png`,
          },
          {
            id: 3,
            title: `Lorem, ipsum.`,
            author: `John Doe`,
            description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Velit
            earum saepe fugiat!`,
            cover: `assets/book.png`,
          },
          {
            id: 4,
            title: `Lorem, ipsum.`,
            author: `John Doe`,
            description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Velit
            earum saepe fugiat!`,
            cover: `assets/book.png`,
          },
        ];
  }

  addBook(book) {
    this.booksData.push(book);
    localStorage.setItem("booksData", JSON.stringify(this.booksData));
  }

  removeBook(bookId) {
    this.booksData = this.booksData.filter(({ id }) => id !== bookId);
    localStorage.setItem("booksData", JSON.stringify(this.booksData));
  }
}

const library = new Library();

class bookCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const { id, title, author, description, cover } = this.attributes;

    this.innerHTML = `
        <div class="card mx-auto">
          <img src="${cover.value}" class="card-img-top" alt="Book Cover" />
          <div class="card-body">
            <h5 class="card-title">${title.value}</h5>
            <p class="card-subtitle">${author.value}</p>
            <p class="card-text">
              ${description.value}
            </p>
            <button id="card-btn-${id.value}" class="btn btn-danger card-btn">
            Remove</button>
          </div>
        </div>
      `;

    const cardBtns = document.querySelectorAll(".card-btn");
    cardBtns.forEach((cardBtn) => {
      const idx = parseInt(cardBtn.id.split("-")[2]);
      cardBtn.addEventListener("click", () => {
        removeBook(idx);
      });
    });
  }
}

customElements.define("book-card", bookCard);

const addBookModal = document.querySelector(".modal");
const contactForm = document.querySelector(".contact-form");

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
};

const addBookHandler = (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector(".new-book-title").value;
  const bookAuthor = document.querySelector(".new-book-author").value;

  const book = new Book(bookTitle, bookAuthor);
  library.addBook(book);
  recreateUI();
};

const removeBook = (idx) => {
  library.removeBook(idx);
  recreateUI();
};

const main = () => {
  contactForm.style.display = "none";
  recreateUI();
};

const form = document.querySelector(".add-book-form");
form.addEventListener("submit", addBookHandler);

const contactBtn = document.querySelector('#contact-btn');
contactBtn.addEventListener('click', () => {
  showContact();
})

const homeBtn = document.querySelector('#home-btn');
homeBtn.addEventListener('click', () => {
  main();
})

main();