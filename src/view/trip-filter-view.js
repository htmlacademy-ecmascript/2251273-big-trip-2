import AbstractView from '../framework/view/abstract-view';

function createTripFilter({
  allTypesFilters,
  currentFilterType,
}) {
  return (`
          <form class="trip-filters" action="#" method="get">
          ${allTypesFilters.map((type) => `
            <div class="trip-filters__filter">
              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
            </div>
            `).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
        `);
}

export default class TripFilterView extends AbstractView {
  #allTypesFilters = null;
  #handleFilterChange = null;
  #currentFilterType = null;

  constructor({
    allTypesFilters,
    onFilterChange,
    currentFilterType
  }) {
    super();
    this.#allTypesFilters = allTypesFilters;
    // Handlers
    this.#handleFilterChange = onFilterChange;
    // Текущий фильтр
    this.#currentFilterType = currentFilterType;
    // Обработчики
    this._restoreHandlers();
  }

  get template() {
    return createTripFilter({
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
