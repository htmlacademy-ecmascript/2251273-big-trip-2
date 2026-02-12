import EventPresenter from './event-presenter.js';

import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { ALL_TYPES_SORTING } from '../const.js';
import { updateItemInArray } from '../utils.js';

export default class MainPresenter {
  #eventContainer = null;
  #eventsModel = null;
  #eventSort = null;
  #eventList = new EventListView();
  #eventsList = [];
  #eventsPresentor = new Map();

  constructor({ eventContainer, eventsModel }) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }


  init() {
    this.#eventsList = this.allEvents;
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
    this.#eventsList.forEach((event) => {
      const eventPresentor = new EventPresenter({
        eventListContainer: this.#eventList.element,
        onEventChange: this.#handleEventChange,
        onModeChange: this.#handleModeChange
      });
      this.#eventsPresentor.set(event.point.id, eventPresentor);
      eventPresentor.init(event);
    });
  }

  #handleEventChange = ({eventId, event}) => {
    this.#eventsList = updateItemInArray(this.#eventsList, event);
    this.#eventsPresentor.get(eventId).init(event);
  };

  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };


  get allEvents() {
    return this.#eventsModel.allEvents;
  }

}
