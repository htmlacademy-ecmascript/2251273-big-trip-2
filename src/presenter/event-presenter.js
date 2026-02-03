import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils.js';

export default class EventPresenter {
  #eventSort = new EventSortView();
  #eventList = new EventListView();

  #eventContainer = null;
  #eventsModel = null;

  constructor({ eventContainer, eventsModel }) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    const allEvents = this.#eventsModel.allEvents;

    this.#renderListSort();

    this.#renderListEvent();
    allEvents.forEach((event) => {
      this.#renderEvent(event, 'BEFOREEND');
    });
  }

  #renderListSort() {
    render(this.#eventSort, this.#eventContainer);
  }

  #renderListEvent() {
    render(this.#eventList, this.#eventContainer);
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

}
