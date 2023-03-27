/* eslint-disable require-jsdoc */

export class bookCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const {id, title, author, description} = this.attributes;

    this.innerHTML = `
          <div class="card mx-auto">
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
  }
}
