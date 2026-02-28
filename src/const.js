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
  DELETE_TASK: 'DELETE',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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

export {
  MAX_POINTS,
  TypePoint,
  DateFormat,
  ALL_TYPES_SORTING,
  ALL_TYPES_FILTERS,
  EVENT_MODE,
  USER_ACTION,
  UPDATE_TYPE,
  NEW_EVENT
};
