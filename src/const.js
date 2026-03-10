const MAX_POINTS = 3;

const TypePoint = {
  'taxi': 'Taxi',
  'bus': 'Bus',
  'train': 'Train',
  'ship': 'Ship',
  'drive': 'Drive',
  'flight': 'Flight',
  'check-in': 'Check-in',
  'sightseeing': 'Sightseeing',
  'restaurant': 'Restaurant'
};

const DateFormat = {
  eventDate:'MMM D',
  eventTime:'HH:mm',
  eventGroupTime:'D/MM/YY HH:mm',
};

const ALL_TYPES_SORTING = {
  day: {
    name: 'day',
    availability: true
  },
  event: {
    name: 'event',
    availability: false
  },
  time: {
    name: 'time',
    availability: true
  },
  price: {
    name: 'price',
    availability: true
  },
  offer: {
    name:'offer',
    availability: false
  }
};

const ALL_TYPES_FILTERS = [
  'everything',
  'future',
  'present',
  'past'
];

const EVENT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const USER_ACTION = {
  UPDATE_TASK: 'UPDATE',
  ADD_TASK: 'ADD',
  CANSEL_TASK: 'CANCEL',
  DELETE_TASK: 'DELETE',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NEW_EVENT = {
  'id': null,
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

const RENDER_POSITION = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const ERROR_MESSAGE = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const METHOD_API = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const AUTHORIZATION = 'Basic Zm9vYmFyOjEyMzQ1Njc4';

const URL_API = 'https://22.objects.htmlacademy.pro/big-trip';

export {
  MAX_POINTS,
  TypePoint,
  DateFormat,
  ALL_TYPES_SORTING,
  ALL_TYPES_FILTERS,
  EVENT_MODE,
  USER_ACTION,
  UPDATE_TYPE,
  NEW_EVENT,
  RENDER_POSITION,
  ERROR_MESSAGE,
  METHOD_API,
  AUTHORIZATION,
  URL_API,
};
