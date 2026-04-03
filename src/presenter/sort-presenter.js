import EventSortView from '../view/event-sort-view.js';

import { render, remove } from '../framework/render.js';

import { ALL_TYPES_SORTING, RENDER_POSITION} from '../const.js';

export default class SortPresenter {
  #sortListContainer = null;
  #eventSort = null;
  #onSortChange = null;

  constructor({
    sortListContainer,
    onSortChange}){
    this.#sortListContainer = sortListContainer;
    this.#onSortChange = onSortChange;
  }

  // Получение элемента
  get element() {
    return this.#eventSort.element;
  }

  // Инициализация
  init() {
    this.#renderListSort();
  }

  // Обновление
  update() {
    this.destroy();
    this.#renderListSort();
  }

  // Удаление компонентов
  destroy() {
    remove(this.#eventSort);
  }

  // Рендер сортировки
  #renderListSort() {
    this.#eventSort = new EventSortView({
      allTypesSorting: ALL_TYPES_SORTING,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#eventSort, this.#sortListContainer, RENDER_POSITION.AFTERBEGIN);
  }

  // Обработка событий
  #handleSortTypeChange = (evt) => {
    this.#onSortChange({sortType: evt.target.dataset.sortType});
  };

}
