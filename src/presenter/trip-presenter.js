import TripInfoView from '../view/trip-info-view.js';
import TripFilterView from '../view/trip-filter-view.js';

import {render} from '../render.js';

export default class TripPresenter {
  tripInfo = new TripInfoView();
  tripFilter = new TripFilterView();

  constructor({tripInfoContainer, tripFilterContainer}) {
    this.tripContainer = tripInfoContainer;
    this.tripFilterContainer = tripFilterContainer;
  }

  init() {
    render(this.tripInfo, this.tripContainer, 'AFTERBEGIN');
    render(this.tripFilter, this.tripFilterContainer, 'BEFOREEND');
  }

}
