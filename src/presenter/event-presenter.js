import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils.js';
import { ALL_TYPES_FILTERS } from '../const.js';

export default class EventPresenter {
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
      allTypesFilters: ALL_TYPES_FILTERS,
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
      this.#renderEvent(event, 'BEFOREEND');
    });
  }

  #renderEvent(event, renderPosition = 'BEFOREEND') {
    const documentKeydownHandler = (evt) => {
      evt.preventDefault();
      if (isEscapeKey(evt)) {
        replaceEventToMinimizedComponent();
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    };

    const eventPointComponent = new EventPointView({
      event: event.point,
      destination: event.destination,
      offers: event.offers,
      onButtonClick: () => {
        replaceEventToMaximizedComponent();
        document.addEventListener('keydown', documentKeydownHandler);
      }
    });

    const eventPointEditComponent = new EventPointEditView({
      event: event.point,
      destination: event.destination,
      offers: event.offers,
      onButtonClick: () => {
        replaceEventToMinimizedComponent();
      },
      onSubmitForm: (evt) => {
        evt.preventDefault();
        document.removeEventListener('keydown', documentKeydownHandler);
      },
      onDeleteClick: (evt) => {
        evt.preventDefault();
        document.removeEventListener('keydown', documentKeydownHandler);
      }
    });

    function replaceEventToMaximizedComponent() {
      replace(eventPointEditComponent, eventPointComponent);
    }

    function replaceEventToMinimizedComponent() {
      replace(eventPointComponent, eventPointEditComponent);
    }

    render(eventPointComponent, this.#eventList.element, renderPosition);
  }

  get allEvents() {
    return this.#eventsModel.allEvents;
  }

}
