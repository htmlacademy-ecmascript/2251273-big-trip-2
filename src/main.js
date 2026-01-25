import TripFilterView from './view/trip-filter-view.js';
import TripInfoView from './view/trip-info-view.js';

import EventSortView from './view/event-sort-view.js';
import EventListView from './view/event-list-view.js';

import { render } from './render.js';

// header
const pageHeader = document.querySelector('.page-header');
const pageHeaderContainer = pageHeader.querySelector('.page-header__container');
const tripMain = pageHeaderContainer.querySelector('.trip-main');
const tripControls = pageHeaderContainer.querySelector('.trip-controls');
const tripFilters = tripControls.querySelector('.trip-controls__filters');

// main
const pageMain = document.querySelector('.page-main');
const pageMainContainer = pageMain.querySelector('.page-body__container');
const tripEvents = pageMainContainer.querySelector('.trip-events');

// header
render(new TripInfoView(), tripMain, 'AFTERBEGIN');
render(new TripFilterView(), tripFilters);
// main
render(new EventSortView(), tripEvents, 'AFTERBEGIN');
render(new EventListView(), tripEvents, 'BEFOREEND');

console.log(tripEvents);


