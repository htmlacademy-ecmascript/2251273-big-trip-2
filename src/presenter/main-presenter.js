import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';

import EventListView from '../view/event-list-view.js';

import { render } from '../framework/render.js';

import { updateItemInArray, sortEventsByType } from '../utils.js';

export default class MainPresenter {
  #eventContainer = null;
  #eventsModel = null;

  #eventList = new EventListView();
  #eventsList = [];
  #sortEventsList = [];
  #eventsPresentor = new Map();
  #sortPresenter = null;
  #currentSortType = 'day';

  constructor({ eventContainer, eventsModel }) {
    this.#eventContainer = eventContainer;
    this.#eventsModel = eventsModel;
  }

  // Инициализируем презентер
  init() {
    this.#eventsList = this.allEvents;

    this.#renderSortEvent();

    this.#renderListEvent();

    this.#renderAllEvents(this.#eventsList);
  }

  // Отрисовываем список событий
  #renderListEvent() {
    render(this.#eventList, this.#eventContainer);
  }

  // Отрисовываем все события
  #renderAllEvents(eventsList = this.#eventsList) {
    eventsList.forEach((event) => {
      const eventPresentor = new EventPresenter({
        eventListContainer: this.#eventList.element,
        onEventChange: this.#handleEventChange,
        onModeChange: this.#handleModeChange,
        onEventSave: this.#handleEventSave,
      });
      this.#eventsPresentor.set(event.point.id, eventPresentor);
      eventPresentor.init(event);
    });
  }

  // Отрисовываем сортировку
  #renderSortEvent() {
    this.#sortPresenter = new SortPresenter({
      sortListContainer: this.#eventList.element,
      onSortChange: this.#handleSortChange
    });
    this.#sortPresenter.init();

  }

  // Обновляем событие (перерисовываем его)
  #handleEventChange = ({eventId, event}) => {
    this.#eventsList = updateItemInArray(this.#eventsList, event);
    this.#eventsPresentor.get(eventId).init(event);
  };

  // Сбрасываем режим редактирования
  #handleModeChange = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.resetView());
  };

  #handleEventSave = () => {
    // TODO: Обработать сохранение события
  };

  #handleSortChange = ({sortType}) => {

    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    if (this.#currentSortType === 'day') {
      this.#clearEvents();
      this.#renderAllEvents(this.#eventsList);
    } else {
      this.#clearEvents();
      this.#renderAllEvents(sortEventsByType(structuredClone(this.#eventsList), sortType));
    }
  };

  #clearEvents = () => {
    this.#eventsPresentor.forEach((eventPresentor) => eventPresentor.destroy());
    this.#eventsPresentor.clear();
  };

  // Получаем все события из модели
  get allEvents() {
    return this.#eventsModel.allEvents;
  }

}
