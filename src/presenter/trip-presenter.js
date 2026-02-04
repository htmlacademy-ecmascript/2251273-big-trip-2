import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';

import {render} from '../framework/render.js';
import { ALL_TYPES_FILTERS } from '../const.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripFilterContainer = null;
  #eventsModel = null;

  constructor({tripInfoContainer, tripFilterContainer, eventsModel}) {
    this.#tripContainer = tripInfoContainer;
    this.#tripFilterContainer = tripFilterContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#renderTripInfo();
    this.#renderTripFilter();
  }

  #renderTripInfo() {
    this.tripInfo = new TripInfoView({
      allCitiesEvents: this.#eventsModel.allCitiesEvents,
      startDate: this.#eventsModel.minEventsDate,
      endDate: this.#eventsModel.maxEventsDate,
      fullPrice: this.#eventsModel.fullPrice
    });

    render(this.tripInfo, this.#tripContainer, 'AFTERBEGIN');
  }

  #renderTripFilter() {
    this.tripFilter = new TripFilterView({
      allTypesFilters: ALL_TYPES_FILTERS,
      onFilterTypeChange: (evt) => {
        evt.preventDefault();
        // TODO: Обработать событие
      }
    });
    render(this.tripFilter, this.#tripFilterContainer, 'BEFOREEND');
  }

}
