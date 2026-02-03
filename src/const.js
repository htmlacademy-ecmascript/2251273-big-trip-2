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

const ALL_TYPES_FILTERS = [
  'day',
  'event',
  'time',
  'price',
  'offer'
];

export { MAX_POINTS, TypePoint , DateFormat, ALL_TYPES_FILTERS };
