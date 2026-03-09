import AbstractView from '../framework/view/abstract-view';

function createListEmpty({
  errorMessage,
}) {
  return (`
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">${errorMessage}</p>
        </section>
        `);
}

export default class ListEmptyView extends AbstractView {
  #errorMessage = null;
  constructor({
    errorMessage,
  }) {
    super();
    this.#errorMessage = errorMessage;
  }

  get template() {
    return createListEmpty({
      errorMessage: this.#errorMessage
    });
  }
}
