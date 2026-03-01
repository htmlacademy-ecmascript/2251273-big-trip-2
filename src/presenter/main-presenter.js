import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';

import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { sortEventsByType, } from '../utils.js';
import { USER_ACTION, UPDATE_TYPE, NEW_EVENT } from '../const.js';

const newEventButton = document.querySelector('.trip-main__event-add-btn');

export default class MainPresenter {
  // Containers
  #eventContainer = null;
  #eventListContainer = new EventListView();
  // Models
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  // Presenters
  #eventsPresentor = new Map();
  #sortPresenter = null;
  // Temp
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
    if (actionType === USER_ACTION.UPDATE_TASK) {
      this.#eventsModel.updateEvent(updateType, update);
    } else if (actionType === USER_ACTION.ADD_TASK) {
      this.#newButtonEnabled();
      this.#eventsModel.addEvent(updateType, update);
    } else if (actionType === USER_ACTION.DELETE_TASK) {
      this.#eventsModel.deleteEvent(updateType, update);
    } else if (actionType === USER_ACTION.CANSEL_TASK) {
      this.#newButtonEnabled();
    }
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UPDATE_TYPE.PATCH) {
      this.#eventsPresentor.get(data.id).update(data);
    } else if (updateType === UPDATE_TYPE.MINOR) {
      this.#clearEvents();
      this.#renderAllEvents(this.events);
    } else if (updateType === UPDATE_TYPE.MAJOR) {
      // TODO: Доработать!
    }
  };

  // Инициализируем презентер
  init() {
    // Инициализация
    this.#eventsModel.init();
    this.#offersModel.init();
    this.#destinationsModel.init();
    // Отрисовка
    this.#renderSortEvent();
    this.#renderEventsListContainer();
    this.#renderAllEvents(this.events);
    // Обработчики
    this.#handleNewEventClick();
  }

  // Отрисовываем список событий
  #renderEventsListContainer() {
    render(this.#eventListContainer, this.#eventContainer);
  }

  // Обработчик кнопки "Новое событие"
  #handleNewEventClick() {
    newEventButton.addEventListener('click', () => {
      this.#createNewEvent();
      this.#newButtonDisabled();
      this.#handleModeChange();
    });
  }

  // Создаем новое событие
  #createNewEvent(event = NEW_EVENT) {
    const eventPresentor = this.#createEventPresentor();
    eventPresentor.add({event});
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList = this.events) {
    eventsList.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  // Отрисовываем одно событие
  #renderEvent(event) {
    const eventPresentor = this.#createEventPresentor();
    this.#eventsPresentor.set(event.id, eventPresentor);
    eventPresentor.init(event);
  }

  // Создаем презентер события
  #createEventPresentor() {
    const eventPresentor = new EventPresenter({
      // Containers
      eventContainer: this.#eventListContainer.element,
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
      sortListContainer: this.#eventContainer,
      onSortChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  }

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  // Обработчик сортировки
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

  // Очистка событий
  #clearEvents = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.destroy());
    this.#eventsPresentor.clear();
  };

  // Выключаем кнопку
  #newButtonDisabled = () => {
    newEventButton.disabled = true;
  };

  // Включаем кнопку
  #newButtonEnabled = () => {
    newEventButton.disabled = false;
  };

  // Получаем события
  get events() {
    if (this.#currentSortType === 'day') {
      return this.#eventsModel.allEvents;
    } else {
      return sortEventsByType(structuredClone(this.#eventsModel.allEvents), this.#currentSortType);
    }
  }
}
