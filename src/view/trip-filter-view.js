import AbstractView from '../framework/view/abstract-view';

function createTripFilter({allTypesFilters}) {
  return (`
          <form class="trip-filters" action="#" method="get">
          ${allTypesFilters.map((type) => `
            <div class="trip-filters__filter">
              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
            </div>
            `).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
        `);
}

export default class TripFilterView extends AbstractView {
  constructor({allTypesFilters, onFilterTypeChange}) {
    super();
    this.allTypesFilters = allTypesFilters;
    this.onFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.onFilterTypeChange);
  }

  get template() {
    return createTripFilter({allTypesFilters: this.allTypesFilters});
  }

}
