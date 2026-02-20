// import TripPresenter from './presenter/trip-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

// trip container
// const pageHeader = document.querySelector('.page-header');
// const pageHeaderContainer = pageHeader.querySelector('.page-header__container');
// const tripMain = pageHeaderContainer.querySelector('.trip-main');
// const tripControls = pageHeaderContainer.querySelector('.trip-controls');
// const tripFilters = tripControls.querySelector('.trip-controls__filters');
// event container
const pageMain = document.querySelector('.page-main');
const pageMainContainer = pageMain.querySelector('.page-body__container');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

// all models
const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();


// presenters
// const tripPresenter = new TripPresenter({
//   tripInfoContainer: tripMain,
//   tripFilterContainer: tripFilters,
//   eventsModel: eventsModel
// });
const mainPresenter = new MainPresenter({
  eventContainer: tripEventsContainer,
  eventsModel: eventsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});

// initialization presenters
// tripPresenter.init();
mainPresenter.init();

