let booksData = [
  {
    id: `1`,
    title: `Lorem, ipsum.`,
    author: `John Doe`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        earum saepe fugiat!`,
    cover: `assets/book.png`,
  },
  {
    id: `2`,
    title: `Lorem, ipsum.`,
    author: `John Doe`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        earum saepe fugiat!`,
    cover: `assets/book.png`,
  },
  {
    id: `3`,
    title: `Lorem, ipsum.`,
    author: `John Doe`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        earum saepe fugiat!`,
    cover: `assets/book.png`,
  },
  {
    id: `4`,
    title: `Lorem, ipsum.`,
    author: `John Doe`,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        earum saepe fugiat!`,
    cover: `assets/book.png`,
  },
];

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
            <button id="card-btn-${id.value}" class="btn btn-danger card-btn">Remove</button>
          </div>
        </div>
      `;

    const cardBtns = document.querySelectorAll(".card-btn");
    cardBtns.forEach((cardBtn) => {
      const idx = parseInt(cardBtn.id.split("-")[2]);
      cardBtn.addEventListener("click", () => {
        booksData = booksData.filter(({ id }) => id !== idx);
        localStorage.setItem("booksData", JSON.stringify(booksData));
        recreateUI();
      });
    });
  }
}

customElements.define("book-card", bookCard);

const addBookModal = document.querySelector(".modal");

const recreateUI = (currentBooksData = booksData) => {
  const existingBooks = document.querySelector(".books-container");
  if (existingBooks) {
    existingBooks.remove();
  }
  const mainContainer = document.querySelector(".main-container");
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("row", "books-container");

  for (const book of currentBooksData) {
    const { id, title, author, description, cover } = book;
    const bookItem = document.createElement("div");
    bookItem.classList.add("col-12", "col-md-6", "col-lg-4", "my-2");
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



const main = () => {
  const booksDataFromLocalStorage = JSON.parse(
    localStorage.getItem("booksData")
  );
  const booksLSExists =
    booksDataFromLocalStorage !== undefined &&
    booksDataFromLocalStorage !== null &&
    booksDataFromLocalStorage.length !== 0;

  const initialBooksData = booksLSExists
    ? booksDataFromLocalStorage
    : booksData;

  if (booksLSExists) {
    booksData = booksDataFromLocalStorage;
  }

  recreateUI(initialBooksData);
};

main();

const form = document.querySelector(".add-book-form");
form.addEventListener("submit", addBookHandler);
