import AbstractView from '../framework/view/abstract-view';

import { filterEventsByType } from '../utils.js';

function createTripFilter({
  eventsModel,
  allTypesFilters,
  currentFilterType,
}) {

  return (`
          <form class="trip-filters" action="#" method="get">
          ${allTypesFilters.map((type) => `
            <div class="trip-filters__filter">
              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''} ${filterEventsByType(eventsModel.allEvents, type).length === 0 ? 'disabled' : ''}>
              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
            </div>
            `).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
        `);
}

export default class TripFilterView extends AbstractView {
  #eventsModel = null;
  #allTypesFilters = null;
  #handleFilterChange = null;
  #currentFilterType = null;

  constructor({
    eventsModel,
    allTypesFilters,
    onFilterChange,
    currentFilterType
  }) {
    super();
    this.#eventsModel = eventsModel;
    this.#allTypesFilters = allTypesFilters;
    this.#handleFilterChange = onFilterChange;
    this.#currentFilterType = currentFilterType;

    this._restoreHandlers();
  }

  get template() {
    return createTripFilter({
      eventsModel: this.#eventsModel,
      allTypesFilters: this.#allTypesFilters,
      currentFilterType: this.#currentFilterType
    });
  }

  _restoreHandlers() {
    this.element.addEventListener('change', (evt) => {
      evt.preventDefault();
      this.#handleFilterChange({filterType: evt.target.value});
    });
  }

}
