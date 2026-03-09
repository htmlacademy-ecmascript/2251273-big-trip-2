// Main Presenter
import MainPresenter from './presenter/main-presenter.js';
// Models
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
// Trip container
const pageHeaderContainer = document.querySelector('.page-header__container');
const tripInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
// Events container
const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');
// All models
const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

// Main Presenter
const mainPresenter = new MainPresenter({
  // Containers
  eventContainer: tripEventsContainer,
  tripInfoContainer: tripInfoContainer,
  tripFilterContainer: tripFiltersContainer,
  // Models
  eventsModel: eventsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});

// Initialization
mainPresenter.init();
