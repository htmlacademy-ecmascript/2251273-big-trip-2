import EventPresenter from './event-presenter.js';

import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { ALL_TYPES_SORTING } from '../const.js';

export default class MainPresenter {
  #eventContainer = null;
  #eventsModel = null;
  #eventSort = null;
  #eventList = new EventListView();

  constructor({ eventContainer, eventsModel }) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }


  init() {
    this.#renderListSort();
    this.#renderListEvent();
    this.#renderAllEvents();
  }

  #renderListSort() {
    this.#eventSort = new EventSortView({
      allTypesSorting: ALL_TYPES_SORTING,
      onSortTypeChange: (evt) => {
        evt.preventDefault();
        // TODO: Обработать событие
      }
    });

    render(this.#eventSort, this.#eventContainer);
  }

  #renderListEvent() {
    render(this.#eventList, this.#eventContainer);
  }

  #renderAllEvents() {
    this.allEvents.forEach((event) => {
      const eventPresentor = new EventPresenter({
        eventListContainer: this.#eventList.element,
      });
      eventPresentor.init(event);
    });
  }

  get allEvents() {
    return this.#eventsModel.allEvents;
  }

}
