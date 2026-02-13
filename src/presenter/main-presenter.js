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

  // Инициализируем презентер
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

  // Отрисовываем список событий
  #renderListEvent() {
    render(this.#eventList, this.#eventContainer);
  }

  // Отрисовываем все события
  #renderAllEvents() {
    this.#eventsList.forEach((event) => {
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

  // Получаем все события из модели
  get allEvents() {
    return this.#eventsModel.allEvents;
  }

}
