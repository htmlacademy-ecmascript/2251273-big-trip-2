// Presenters
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import TripPresenter from './trip-presenter.js';
// Views
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventLoadingView from '../view/event-loading-view.js';
import FailedLoadView from '../view/failed-load-view.js';
// Utils
import { remove, render } from '../framework/render.js';
import { sortEventsByType, filterEventsByType, isEscapeKey } from '../utils.js';
import { USER_ACTION, UPDATE_TYPE, NEW_EVENT,ERROR_MESSAGE, TIME_LIMIT, EVENT_MODE } from '../const.js';
// DOM
const newEventButton = document.querySelector('.trip-main__event-add-btn');
// Framework
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class MainPresenter {

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
  #failedLoadView = null;
  //
  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER_LIMIT,
    upperLimit: TIME_LIMIT.UPPER_LIMIT
  });

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
    this.#uiBlocker.block();
    if (actionType === USER_ACTION.UPDATE_EVENT) {
      this.#eventsModel.updateEvent(updateType, update).then(() => {
      }).catch(() => {
        this.#eventsPresentor.get(update.id).reset(update);
      }).finally(() => {
        this.#uiBlocker.unblock();
      });
    } else if (actionType === USER_ACTION.ADD_EVENT) {
      this.#eventsModel.addEvent(updateType, update).catch(() => {
        this.#newEventPresentor.add(update);
      }).finally(() => {
        this.#uiBlocker.unblock();
      });
    } else if (actionType === USER_ACTION.DELETE_EVENT) {
      this.#eventsModel.deleteEvent(updateType, update).catch(() => {
        this.#eventsPresentor.get(update.id).reset(update);
      }).finally(() => {
        this.#uiBlocker.unblock();
      });
    } else if (actionType === USER_ACTION.CANSEL_EVENT) {
      this.#renderAllEvents(this.events);
      this.#newButtonEnabled();
      this.#newEventPresentor.destroy();
      this.#newEventPresentor = null;
      this.#uiBlocker.unblock();
    }
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UPDATE_TYPE.PATCH) {
      this.#eventsPresentor.get(data.id).update(data);
    } else if (updateType === UPDATE_TYPE.MINOR) {
      this.#clearEvents();
      this.#resetSort();
      this.#createEventLoading();
      if(this.#newEventPresentor) {
        this.#newEventPresentor.destroy();
      }
      this.#eventsModel.init()
        .then(() => {
          this.#tripPresenter.update(this.#currentFilterType);
          this.#deleteEventLoading();
          this.#newButtonEnabled();
          this.#renderAllEvents(this.events);
          this.#resetSort();
        }).catch(() => {
          this.#newButtonDisabled();
          this.#deleteEventLoading();
          this.#sortPresenter.destroy();
          this.#tripPresenter.destroy();
          this.#createFailedLoading();
        });
      this.#tripPresenter.update(this.#currentFilterType);
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
      }).catch(() => {
        this.#deleteEventLoading();
        this.#createFailedLoading();
      });
    } catch (err) {
      this.#deleteEventLoading();
      this.#createFailedLoading();
    }
  }

  // Создаем ошибку загрузки
  #createFailedLoading() {
    this.#failedLoadView = new FailedLoadView();
    render(this.#failedLoadView, this.#eventContainer);
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
      this.#handleModeChange({
        mode: EVENT_MODE.CREATING,
      });
    });
  }

  // Создаем новое событие
  #createNewEvent(event = NEW_EVENT) {
    this.#newEventPresentor = this.#createEventPresentor();
    this.#newEventPresentor.add({event});
    this.#resetSort();
    this.#resetFilter();
    remove(this.#listEmptyView);
  }

  // Сбрасываем режим редактирования и удаляем новое событие
  #handleModeChange = ({mode = null}) => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
    if (mode === EVENT_MODE.EDITING && this.#newEventPresentor) {
      this.#newEventPresentor.destroy();
      this.#newEventPresentor = null;
      this.#newButtonEnabled();
    }
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

  #resetFilter = () => {
    this.#currentFilterType = 'everything';
    this.#tripPresenter.update(this.#currentFilterType);
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
      this.#handleModeChange({
        mode: EVENT_MODE.DEFAULT,
      });
      if (this.#newEventPresentor) {
        this.#newEventPresentor.destroy();
        this.#newEventPresentor = null;
        if (this.events.length === 0) {
          this.#createListEmpty();
        }
      }
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
