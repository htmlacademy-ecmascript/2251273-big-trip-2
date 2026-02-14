import dayjs from 'dayjs';

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
 * Updates the item in the given array with the given update.
 * The update item is found by its id and replaced with the new item.
 * @param {array} array - Array containing the item to be updated.
 * @param {object} update - Item to be updated.
 * @returns {array} Updated array.
 */
function updateItemInArray(array, update) {
  return array.map((item) => (item.id === update.id ? update : item));
}

function sortEventsByType(events, type) {
  if (type === 'price') {
    return events.sort((a, b) => b.point.basePrice - a.point.basePrice);
  } else if (type === 'time') {
    return events.sort((a, b) => dayjs(b.point.dateTo).diff(dayjs(b.point.dateFrom)) - dayjs(a.point.dateTo).diff(dayjs(a.point.dateFrom)));
  }
  return events;
}

export { getFormettedDate, getDurationTime, getRandomInt, isEscapeKey, updateItemInArray,sortEventsByType };
