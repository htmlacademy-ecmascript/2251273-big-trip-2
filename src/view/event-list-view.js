import AbstractView from '../framework/view/abstract-view.js';

function createEventList() {
  return (`
          <ul class="trip-events__list"></ul>
        `);
}

export default class EventListView extends AbstractView {
  get template() {
    return createEventList();
  }
}
