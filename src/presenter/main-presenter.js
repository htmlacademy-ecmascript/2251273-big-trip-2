// Presenters
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import TripPresenter from './trip-presenter.js';
// Views
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventLoadingView from '../view/event-loading-view.js';
// Utils
import { remove, render } from '../framework/render.js';
import { sortEventsByType, filterEventsByType, isEscapeKey } from '../utils.js';
import { USER_ACTION, UPDATE_TYPE, NEW_EVENT,ERROR_MESSAGE } from '../const.js';
// DOM
const newEventButton = document.querySelector('.trip-main__event-add-btn');

export default class MainPresenter {
  // #events = null;
  // Containers
  #eventListContainer = new EventListView();
  #eventContainer = null;
  #tripInfoContainer = null;
  #tripFilterContainer = null;
  // Models
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  // Presenters
  #eventsPresentor = new Map();
  #newEventPresentor = null;
  #sortPresenter = null;
  #tripPresenter = null;
  // Temp
  #currentSortType = 'day';
  #currentFilterType = 'everything';
  // Views
  #listEmptyView = null;
  #eventLoadingView = null;

  constructor({
    // Containers
    eventContainer,
    tripInfoContainer,
    tripFilterContainer,
    // Models
    eventsModel,
    offersModel,
    destinationsModel
  }) {
    // Containers
    this.#eventContainer = eventContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripFilterContainer = tripFilterContainer;
    // Models
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    // Observer
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
      this.#resetSort();
      this.#renderAllEvents(this.events);
      this.#tripPresenter.update(this.#currentFilterType);
    } else if (updateType === UPDATE_TYPE.MAJOR) {
      // TODO: Доработать!
    } else if (updateType === UPDATE_TYPE.INIT) {
      this.#newButtonEnabled();
      this.#deleteEventLoading();
      // Создание
      this.#createSortEvent();
      this.#createTripPresenter();
      // Отрисовка
      this.#renderEventsListContainer();
      this.#renderAllEvents(this.events);
      // Обработчики
      this.#handleNewEventClick();
      this.#tripPresenter.init(this.#currentFilterType);
      document.addEventListener('keydown', this.#handleKeyDown);
    }
  };

  // Инициализируем презентер
  async init() {
    this.#createEventLoading();
    this.#newButtonDisabled();
    try {
      // Инициализация
      Promise.all([
        this.#eventsModel.init(),
        this.#offersModel.init(),
        this.#destinationsModel.init(),
      ]).then(() => {
        this.#newButtonEnabled();
        this.#deleteEventLoading();
        // Создание
        this.#createSortEvent();
        this.#createTripPresenter();
        // Отрисовка
        this.#renderEventsListContainer();
        this.#renderAllEvents(this.events);
        // Обработчики
        this.#handleNewEventClick();
        this.#tripPresenter.init(this.#currentFilterType);
        document.addEventListener('keydown', this.#handleKeyDown);
      });
    } catch (err) {
      // TODO: Доработать! Добавить обработку ошибок
    } finally {
      // TODO: Доработать! Добавить финализацию
    }
  }

  // Создаем прелоадер
  #createEventLoading() {
    this.#eventLoadingView = new EventLoadingView();
    render(this.#eventLoadingView, this.#eventContainer);
  }

  // Удаляем прелоадер
  #deleteEventLoading() {
    remove(this.#eventLoadingView);
  }

  // Отрисовываем пустой список
  #createListEmpty() {
    const typeErrorMessage = this.#currentFilterType.toUpperCase();
    this.#listEmptyView = new ListEmptyView({
      errorMessage: ERROR_MESSAGE[typeErrorMessage]
    });
    render(this.#listEmptyView, this.#eventContainer);
  }

  // Создаем презентер поездки
  #createTripPresenter() {
    this.#tripPresenter = new TripPresenter({
      tripInfoContainer: this.#tripInfoContainer,
      tripFilterContainer: this.#tripFilterContainer,
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFilterChange: this.#handleFilterChange,
    });
  }

  // Создаем презентер сортировки
  #createSortEvent() {
    this.#sortPresenter = new SortPresenter({
      sortListContainer: this.#eventContainer,
      onSortChange: this.#handleSortChange,
    });
    if(this.events.length > 0) {
      this.#sortPresenter.init();
    }
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

  // Отрисовываем список событий
  #renderEventsListContainer() {
    render(this.#eventListContainer, this.#eventContainer);
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList) {
    remove(this.#listEmptyView);
    if (eventsList.length === 0) {
      this.#createListEmpty();
      return;
    } else {
      remove(this.#listEmptyView);
    }
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
    this.#newEventPresentor = this.#createEventPresentor();
    this.#newEventPresentor.add({event});
  }

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  // Обработчик сортировки
  #handleSortChange = ({sortType}) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderAllEvents(this.events);
  };

  // Сброс сортировки
  #resetSort = () => {
    this.#currentSortType = 'day';
    if(this.events.length === 0) {
      this.#sortPresenter.destroy();
    } else {
      this.#sortPresenter.update();
    }
  };

  // Обработчик фильтра
  #handleFilterChange = ({filterType}) => {
    if (this.#currentFilterType === filterType) {
      return;
    }
    this.#currentFilterType = filterType;
    this.#tripPresenter.update(this.#currentFilterType);
    this.#clearEvents();
    this.#renderAllEvents(this.events);
    this.#resetSort();
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

  #handleKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#newButtonEnabled();
      this.#handleModeChange();
      this.#newEventPresentor.destroy();
    }
  };

  // Получаем события после сортировки и фильтра
  get events() {
    return filterEventsByType(
      sortEventsByType(
        this.#eventsModel.allEvents, this.#currentSortType),
      this.#currentFilterType);
  }

}
