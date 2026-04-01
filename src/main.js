// Main Presenter
import MainPresenter from './presenter/main-presenter.js';
// Models
import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
// Service
import EventsApiService from './service/events-api-service.js';
import OffersApiService from './service/offers-api-service.js';
import DestinationsApiService from './service/destinations-api-service.js';
// Const
import { AUTHORIZATION, URL_API } from './const.js';
// Trip container
const pageHeaderContainer = document.querySelector('.page-header__container');
const tripInfoContainer = pageHeaderContainer.querySelector('.trip-main');
const tripFiltersContainer = pageHeaderContainer.querySelector('.trip-controls__filters');
// Events container
const pageMain = document.querySelector('.page-main');
const tripEventsContainer = pageMain.querySelector('.trip-events');
// All models
const eventsModel = new EventsModel({
  eventApiService: new EventsApiService(URL_API, AUTHORIZATION),
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(URL_API, AUTHORIZATION),
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(URL_API, AUTHORIZATION),
});

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
