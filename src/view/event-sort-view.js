import AbstractView from '../framework/view/abstract-view';

function createSortEvent({allTypesFilters}) {
  return (`
          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
          ${allTypesFilters.map((type) => `<div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"  ${type === 'day' ? 'checked' : ''} >
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>`).join('')}
          </form>
        `);
}

export default class EventSortView extends AbstractView {
  constructor({allTypesFilters, onSortTypeChange}) {
    super();
    this.allTypesFilters = allTypesFilters;
    this.onSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.onSortTypeChange);
  }

  get template() {
    return createSortEvent({allTypesFilters: this.allTypesFilters});
  }
}
