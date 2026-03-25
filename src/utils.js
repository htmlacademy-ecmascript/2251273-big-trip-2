import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Returns a formatted date string based on the given date and format.
 * If the date is falsy, an empty string is returned.
 * @param {Date|string} date - Date to be formatted.
 * @param {string} format - Format string for the date.
 * @returns {string} Formatted date string.
 */
function getFormettedDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

/**
 * Calculates the duration time between two given dates.
 * @param {Date|string} dateStart - Start date.
 * @param {Date|string} dateEnd - End date.
 * @returns {string} Duration time in format DDHHMM where DD is number of days, HH is number of hours and MM is number of minutes.
 */
function getDurationTime (dateStart, dateEnd) {
  const diff = dayjs(dateEnd).diff(dateStart, 'minute');

  let days = Math.floor(diff / (60 * 24));
  let hours = Math.floor(diff / 60);
  let minutes = Math.floor(diff % 60);

  days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
  hours = hours % 24 === 0 ? '00H' : `${String(hours % 24).padStart(2, '0')}H`;
  minutes = `${String(minutes).padStart(2, '0')}M`;

  return`${days} ${days !== '' || hours !== '' ? hours : ''} ${minutes}`;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {number} [min=1] - Minimum value (inclusive)
 * @param {number} [max=100] - Maximum value (inclusive)
 * @returns {number} Random integer
 */
function getRandomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if the given event corresponds to the Escape key press.
 * @param {object} evt - Event object.
 * @returns {boolean} True if the event corresponds to the Escape key press, false otherwise.
 */
function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

/**
 * Updates an event in an array by replacing the old event with the new one.
 * If the event with the given id is not found, the array is returned unchanged.
 * @param {array} array - Array of events to update.
 * @param {object} element - New event to replace the old one.
 * @returns {array} Updated array of events.
 */
function updateEventInArray(array, element) {
  return array.map((item) => item.id === element.id ? element : item);
}


function deleteEventInArray(array, element) {
  return array.filter((item) => item.id !== element.id);
}


function addOfferInArray(array, element) {
  if (array.includes(element)) {
    return array;
  }
  return [...array, element];
}

function deleteOfferInArray(array, element) {
  return array.filter((item) => item !== element);
}

function sortEventsByType(events, type = 'day') {
  if (type === 'price') {
    return events.sort((a, b) => b.basePrice - a.basePrice);
  } else if (type === 'time') {
    return events.sort((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom)));
  } else if (type === 'day') {
    // return events.sort((a, b) => dayjs(b.dateFrom).diff(dayjs(a.dateFrom)));
    return events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
  }
  return events;
}

function generateUniqueEventId(array) {
  const id = uuidv4();
  return array.includes(id) ? generateUniqueEventId(array) : id;
}

function getFirstEvent(events) {
  return events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))).at(0);
}

function getLastEvent(events) {
  return events.sort((a, b) => dayjs(b.dateFrom).diff(dayjs(a.dateFrom))).at(0);
}

function cutCityes(array) {
  if (array.length > 3) {
    return [array.at(0),'...', array.at(-1)].join(' &mdash; ');
  } else if (array.length > 1) {
    return array.join(' &mdash; ');
  }
  return array;
}

function filterEventsByType(array, type) {
  const currentDate = dayjs();
  if (type === 'future') {
    return array.filter((item) => dayjs(item.dateFrom).isAfter(currentDate));
  } else if (type === 'present') {
    return array.filter((item) => dayjs(item.dateFrom).isBefore(currentDate) && dayjs(item.dateTo).isAfter(currentDate));
  } else if (type === 'past') {
    return array.filter((item) => dayjs(item.dateTo).isBefore(currentDate));
  }
  return array;
}

function getNumberFromString(string) {
  return Number(string.replace(/[^0-9]/g, ''));
}

export {
  getFormettedDate,
  getDurationTime,
  getRandomInt,
  isEscapeKey,
  updateEventInArray,
  deleteEventInArray,
  addOfferInArray,
  deleteOfferInArray,
  sortEventsByType,
  generateUniqueEventId,
  getFirstEvent,
  getLastEvent,
  cutCityes,
  filterEventsByType,
  getNumberFromString,
};
