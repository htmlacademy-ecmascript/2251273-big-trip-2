import EventSortView from '../view/event-sort-view.js';

import { render } from '../framework/render.js';

import { ALL_TYPES_SORTING } from '../const.js';

export default class SortPresenter {
  #sortListContainer = null;
  #eventSort = null;
  #onSortChange = null;

  constructor({sortListContainer, onSortChange}) {
    this.#sortListContainer = sortListContainer;
    this.#onSortChange = onSortChange;
  }

  init() {
    this.#eventSort = new EventSortView({
      allTypesSorting: ALL_TYPES_SORTING,
      onSortTypeChange: this.#handleSortTypeChange
    });
    this.#renderListSort();
  }

  #renderListSort() {
    render(this.#eventSort, this.#sortListContainer);
  }

  #handleSortTypeChange = (evt) => {
    this.#onSortChange({sortType: evt.target.dataset.sortType});
  };

}
