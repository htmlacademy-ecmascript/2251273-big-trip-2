import dayjs from 'dayjs';
import { TIME_CONST } from './const';

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

  let days = Math.floor(diff / (TIME_CONST.MINUTES_IN_HOUR * TIME_CONST.HOURS_IN_DAY));
  let hours = Math.floor(diff / TIME_CONST.MINUTES_IN_HOUR);
  let minutes = Math.floor(diff % TIME_CONST.MINUTES_IN_HOUR);

  days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
  hours = hours % TIME_CONST.HOURS_IN_DAY === 0 ? '00H' : `${String(hours % TIME_CONST.HOURS_IN_DAY).padStart(2, '0')}H`;
  minutes = `${String(minutes).padStart(2, '0')}M`;

  return`${days} ${days !== '' || hours !== '' ? hours : ''} ${minutes}`;
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
 * Adds a given element to the array if it is not already present.
 * @param {Array} array - Array to which the element is to be added.
 * @param {*} element - Element to be added to the array.
 * @returns {Array} New array with the added element if it was not already present.
 */
function addOfferInArray(array, element) {
  if (array.includes(element)) {
    return array;
  }
  return [...array, element];
}

/**
 * Deletes a given element from the array if it is present.
 * @param {Array} array - Array from which the element is to be deleted.
 * @param {*} element - Element to be deleted from the array.
 * @returns {Array} New array with the deleted element if it was present.
 */
function deleteOfferInArray(array, element) {
  return array.filter((item) => item !== element);
}

/**
 * Sorts an array of events based on the given type.
 * @param {Array<Event>} events - Array of events to be sorted.
 * @param {string} type - Type of sorting. Can be one of 'day', 'time', 'price'.
 * @returns {Array<Event>} Sorted array of events.
 */
function sortEventsByType(events, type = 'day') {
  if (type === 'price') {
    return events.sort((a, b) => b.basePrice - a.basePrice);
  } else if (type === 'time') {
    return events.sort((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom)));
  } else if (type === 'day') {
    return events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
  }
}

/**
 * Returns the first event from the given array of events.
 * Events are sorted by their start date in ascending order.
 * @param {Array<Event>} events - Array of events to be sorted.
 * @returns {Event} First event from the sorted array.
 */
function getFirstEvent(events) {
  return events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))).at(0);
}

/**
 * Returns the last event from the given array of events.
 * Events are sorted by their start date in descending order.
 * @param {Array<Event>} events - Array of events to be sorted.
 * @returns {Event} Last event from the sorted array.
 */
function getLastEvent(events) {
  return events.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))).at(0);
}


/**
 * Cuts an array of cities to a shorter string if the array
 * is longer than 3 elements.
 * If the array has more than 3 elements, it will return a string
 * with the first and last elements of the array, separated by
 * ' &mdash; ' and '...'.
 * If the array has 2 elements, it will return a string with the
 * two elements separated by ' &mdash; '.
 * If the array has 1 element, it will return the array as is.
 * @param {cityes} array - Array of cities to be cut.
 * @returns {string} Shorter string representation of the array.
 */
function cutCityes(cityes) {
  if (cityes.length > 3) {
    return [cityes.at(0),'...', cityes.at(-1)].join(' &mdash; ');
  } else if (cityes.length > 1) {
    return cityes.join(' &mdash; ');
  }
  return cityes;
}

/**
 * Filters an array of events based on the given type.
 * @param {events} array - Array of events to be filtered.
 * @param {string} type - Type of filtering. Can be one of 'future', 'present', 'past'.
 * @returns {Array<Event>} Filtered array of events.
 */
function filterEventsByType(events, type) {
  const currentDate = dayjs();
  if (type === 'future') {
    return events.filter((item) => dayjs(item.dateFrom).isAfter(currentDate));
  } else if (type === 'present') {
    return events.filter((item) => dayjs(item.dateFrom).isBefore(currentDate) && dayjs(item.dateTo).isAfter(currentDate));
  } else if (type === 'past') {
    return events.filter((item) => dayjs(item.dateTo).isBefore(currentDate));
  }
  return events;
}

/**
 * Returns a number from the given string.
 * All non-digit characters are removed from the string and the remaining
 * characters are parsed as a number.
 * @param {inputPrice} string - String from which a number is to be extracted.
 * @returns {number} Number extracted from the string.
 */
function getNumberFromString(inputPrice) {
  return Number(inputPrice.replace(/[^0-9]/g, ''));
}

export {
  getFormettedDate,
  getDurationTime,
  isEscapeKey,
  addOfferInArray,
  deleteOfferInArray,
  sortEventsByType,
  getFirstEvent,
  getLastEvent,
  cutCityes,
  filterEventsByType,
  getNumberFromString,
};
