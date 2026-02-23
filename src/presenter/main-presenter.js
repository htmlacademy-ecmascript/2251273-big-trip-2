import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';

import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { updateEventInArray, deleteEventInArray, sortEventsByType } from '../utils.js';

export default class MainPresenter {
  #eventListContainer = new EventListView();
  #eventContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventsListLocalStorage = [];
  #eventsPresentor = new Map();
  #sortPresenter = null;
  #currentSortType = 'day';

  constructor({
    eventContainer,
    eventsModel,
    offersModel,
    destinationsModel
  }) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  // Инициализируем презентер
  init() {
    this.#eventsModel.init();
    this.#offersModel.init();
    this.#destinationsModel.init();

    this.#saveEventInLocalStorage(this.#eventsModel.allEvents);

    this.#renderSortEvent();
    this.#renderEventsListContainer();
    this.#renderAllEvents(this.#eventsListLocalStorage);
  }

  // Отрисовываем список событий
  #renderEventsListContainer() {
    render(this.#eventListContainer, this.#eventContainer);
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList = this.#eventsListLocalStorage) {
    eventsList.forEach((event) => {
      const eventPresentor = new EventPresenter({
        eventListContainer: this.#eventListContainer.element,
        eventsModel: this.#eventsModel,
        offersModel: this.#offersModel,
        destinationsModel: this.#destinationsModel,
        onEventChange: this.#handleEventChange,
        onModeChange: this.#handleModeChange,
        onEventSave: this.#handleEventSave,
        onEventDelete: this.#handleEventDelete,
      });
      this.#eventsPresentor.set(event.id, eventPresentor);
      eventPresentor.init(event);
    });
  }

  // Отрисовываем сортировку
  #renderSortEvent() {
    this.#sortPresenter = new SortPresenter({
      sortListContainer: this.#eventListContainer.element,
      onSortChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();

  }

  // Обновляем событие (перерисовываем его)
  #handleEventChange = (event) => {
    this.#updateEventInLocalStorage(event);
    this.#eventsPresentor.get(event.id).update(event);
  };

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  #handleEventSave = (event) => {
    this.#updateEventInLocalStorage(event);
    this.#eventsPresentor.get(event.id).update(event);
  };

  #handleEventDelete = ({event}) => {
    this.#eventsPresentor.get(event.id).destroy();
    this.#eventsPresentor.delete(event.id);
    this.#deleteEventInLocalStorage(event);
  };

  #handleSortChange = ({sortType}) => {

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    if (this.#currentSortType === 'day') {
      this.#clearEvents();
      this.#renderAllEvents(this.#eventsListLocalStorage);
    } else {
      this.#clearEvents();
      this.#renderAllEvents(sortEventsByType(structuredClone(this.#eventsListLocalStorage), sortType));
    }
  };

  #clearEvents = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.destroy());
    this.#eventsPresentor.clear();
  };

  // localStorage
  #updateEventInLocalStorage = (event) => {
    this.#eventsListLocalStorage = updateEventInArray(this.#eventsListLocalStorage, event);
  };

  #deleteEventInLocalStorage = (event) => {
    this.#eventsListLocalStorage = deleteEventInArray(this.#eventsListLocalStorage, event);
  };

  #saveEventInLocalStorage(events) {
    this.#eventsListLocalStorage = structuredClone(events);
  }
}
