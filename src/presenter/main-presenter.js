import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';

import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { sortEventsByType, } from '../utils.js';
import { USER_ACTION, UPDATE_TYPE, NEW_EVENT } from '../const.js';

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

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  #handleViewAction = ({ actionType, updateType, update }) => {
    // console.log({actionType, updateType, update});
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    if (actionType === USER_ACTION.UPDATE_TASK) {
      this.#eventsModel.updateEvent(updateType, update);
    } else if (actionType === USER_ACTION.ADD_TASK) {
      this.#eventsModel.addEvent(updateType, update);
    } else if (actionType === USER_ACTION.DELETE_TASK) {
      this.#eventsModel.deleteEvent(updateType, update);
    }
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UPDATE_TYPE.PATCH) {
      this.#eventsPresentor.get(data.id).update(data);
    } else if (updateType === UPDATE_TYPE.MINOR) {
      this.#clearEvents();
      this.#renderAllEvents(this.events);
    } else if (updateType === UPDATE_TYPE.MAJOR) {
      this.#eventsPresentor.get(data.id).remove();
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  // Инициализируем презентер
  init() {
    // Init models
    this.#eventsModel.init();
    this.#offersModel.init();
    this.#destinationsModel.init();

    this.#renderSortEvent();
    this.#renderEventsListContainer();
    this.#renderAllEvents(this.events);

    this.#handleNewEventClick();
  }

  // Отрисовываем список событий
  #renderEventsListContainer() {
    render(this.#eventListContainer, this.#eventContainer);
  }

  #handleNewEventClick() {
    const newEventButton = document.querySelector('.trip-main__event-add-btn');
    newEventButton.addEventListener('click', () => {
      this.#createNewEvent();
    });
  }

  #createNewEvent(event = NEW_EVENT) {
    const eventPresentor = this.#createEventPresentor();
    eventPresentor.add(event);
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList = this.events) {
    eventsList.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderEvent(event) {
    const eventPresentor = this.#createEventPresentor();

    this.#eventsPresentor.set(event.id, eventPresentor);
    eventPresentor.init(event);
  }

  #createEventPresentor() {
    const eventPresentor = new EventPresenter({
      // Containers
      eventListContainer: this.#eventListContainer.element,
      // Models
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      // Handlers
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    return eventPresentor;
  }

  // Отрисовываем сортировку
  #renderSortEvent() {
    this.#sortPresenter = new SortPresenter({
      sortListContainer: this.#eventListContainer.element,
      onSortChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  }

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  #handleSortChange = ({ sortType }) => {
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

  get events() {
    if (this.#currentSortType === 'day') {
      return this.#eventsModel.allEvents;
    } else {
      return sortEventsByType(structuredClone(this.#eventsModel.allEvents), this.#currentSortType);
    }
  }
}
