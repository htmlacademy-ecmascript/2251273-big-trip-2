import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';

import {remove, render} from '../framework/render.js';

import { ALL_TYPES_FILTERS } from '../const.js';

export default class TripPresenter {
  #tripInfoContainer = null;
  #tripFilterContainer = null;

  #tripInfo = null;
  #tripFilter = null;

  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #handleFilterChange = null;

  #currentFilterType = null;

  constructor({
    // Containers
    tripInfoContainer,
    tripFilterContainer,
    // Models
    eventsModel,
    offersModel,
    destinationsModel,
    // Handlers
    onFilterChange,
  }) {
    // Containers
    this.#tripInfoContainer = tripInfoContainer;
    this.#tripFilterContainer = tripFilterContainer;
    // Models
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleFilterChange = onFilterChange;
  }

  // Инициализация
  init(currentFilterType) {
    this.#currentFilterType = currentFilterType;
    this.#renderTripInfo();
    this.#renderTripFilter();
  }

  // Обновление
  update(currentFilterType) {
    this.#currentFilterType = currentFilterType;
    this.destroy();
    this.#renderTripInfo();
    this.#renderTripFilter();
  }

  // Рендер инфо
  #renderTripInfo() {
    this.#tripInfo = new TripInfoView({
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel
    });
    render(this.#tripInfo, this.#tripInfoContainer, 'AFTERBEGIN');
  }

  // Рендер фильтра
  #renderTripFilter() {
    this.#tripFilter = new TripFilterView({
      eventsModel: this.#eventsModel,
      allTypesFilters: ALL_TYPES_FILTERS,
      onFilterChange: this.#handleFilterChange,
      currentFilterType: this.#currentFilterType,
    });

    render(this.#tripFilter, this.#tripFilterContainer, 'BEFOREEND');
  }

  // Удаление компонентов
  destroy() {
    remove(this.#tripInfo);
    remove(this.#tripFilter);
  }

}
