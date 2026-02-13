import TripPresenter from './presenter/trip-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import EventsModel from './model/events-model.js';

// trip container
const pageHeader = document.querySelector('.page-header');
const pageHeaderContainer = pageHeader.querySelector('.page-header__container');
const tripMain = pageHeaderContainer.querySelector('.trip-main');
const tripControls = pageHeaderContainer.querySelector('.trip-controls');
const tripFilters = tripControls.querySelector('.trip-controls__filters');
// event container
const pageMain = document.querySelector('.page-main');
const pageMainContainer = pageMain.querySelector('.page-body__container');
const tripEvents = pageMainContainer.querySelector('.trip-events');
//event model
const eventsModel = new EventsModel();
eventsModel.init();

// presenters
const tripPresenter = new TripPresenter({
  tripInfoContainer: tripMain,
  tripFilterContainer: tripFilters,
  eventsModel: eventsModel
});
const mainPresenter = new MainPresenter({
  eventContainer: tripEvents,
  eventsModel: eventsModel,
});
tripPresenter.init();
mainPresenter.init();
