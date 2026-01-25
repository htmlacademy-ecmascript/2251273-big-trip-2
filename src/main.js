import TripPresenter from './presenter/trip-presenter.js';
import EventPresenter from './presenter/event-presentor.js';
// trip constants
const pageHeader = document.querySelector('.page-header');
const pageHeaderContainer = pageHeader.querySelector('.page-header__container');
const tripMain = pageHeaderContainer.querySelector('.trip-main');
const tripControls = pageHeaderContainer.querySelector('.trip-controls');
const tripFilters = tripControls.querySelector('.trip-controls__filters');
// main
const pageMain = document.querySelector('.page-main');
const pageMainContainer = pageMain.querySelector('.page-body__container');
const tripEvents = pageMainContainer.querySelector('.trip-events');
// trip presenter
const tripPresenter = new TripPresenter({
  tripInfoContainer: tripMain,
  tripFilterContainer: tripFilters
});
// event presenter
const eventPresenter = new EventPresenter({
  eventContainer: tripEvents
});


// trip presenter
tripPresenter.init();
eventPresenter.init();

// header
// render(new TripInfoView(), tripMain, 'AFTERBEGIN');
// render(new TripFilterView(), tripFilters);
// main
// render(new EventSortView(), tripEvents, 'AFTERBEGIN');
// render(new EventListView(), tripEvents, 'BEFOREEND');
