
import dayjs from 'dayjs';

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getTimeSpent(start, end) {
  return dayjs(end).subtract(dayjs(start));
}

function getRandomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export { humanizeDate, getTimeSpent, getRandomInt, isEscapeKey };
