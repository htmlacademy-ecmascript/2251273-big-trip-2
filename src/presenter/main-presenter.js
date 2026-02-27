import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';

import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { sortEventsByType } from '../utils.js';

export default class MainPresenter {
  #eventListContainer = new EventListView();
  // Containers
  #eventContainer = null;
  // Models
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  // Temp
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
    // Init models
    this.#eventsModel.init();
    this.#offersModel.init();
    this.#destinationsModel.init();

    this.#renderSortEvent();
    this.#renderEventsListContainer();
    this.#renderAllEvents(this.events);
  }

  // Отрисовываем список событий
  #renderEventsListContainer() {
    render(this.#eventListContainer, this.#eventContainer);
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList = this.events) {
    eventsList.forEach((event) => {
      const eventPresentor = new EventPresenter({
        // Containers
        eventListContainer: this.#eventListContainer.element,
        // Models
        eventsModel: this.#eventsModel,
        offersModel: this.#offersModel,
        destinationsModel: this.#destinationsModel,
        // Handlers
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
    this.#eventsPresentor.get(event.id).update(event);
  };

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  #handleEventSave = (event) => {
    this.#eventsPresentor.get(event.id).update(event);
  };

  #handleEventDelete = ({event}) => {
    this.#eventsPresentor.get(event.id).destroy();
    this.#eventsPresentor.delete(event.id);
  };

  #handleSortChange = ({sortType}) => {

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    if (this.#currentSortType === 'day') {
      this.#clearEvents();
      this.#renderAllEvents(this.events);
    } else {
      this.#clearEvents();
      this.#renderAllEvents(sortEventsByType(structuredClone(this.events), sortType));
    }
  };

  #clearEvents = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.destroy());
    this.#eventsPresentor.clear();
  };

  get events () {
    if (this.#currentSortType === 'day') {
      return this.#eventsModel.allEvents;
    } else {
      return sortEventsByType(structuredClone(this.#eventsModel.allEvents), this.#currentSortType);
    }
  }
}
