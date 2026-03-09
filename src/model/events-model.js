import Observable from '../framework/observable.js';
import { getAllEvents } from '../mock/events.js';

import { generateUniqueEventId } from '../utils.js';


export default class EventsModel extends Observable {
  #events = null;

  constructor() {
    super();
    this.#events = [];
  }

  init() {
    this.#events = getAllEvents();
  }

  // Получаем события по id
  getEventById(id) {
    return this.#events.find((event) => event.id === id) || null;
  }

  // Обновляем события
  updateEvent(updateType, event) {
    this.#events = this.#events.map((item) => item.id === event.id ? event : item);
    this._notify(updateType, event);
  }

  // Добавляем события
  addEvent(updateType, event) {
    event.id = generateUniqueEventId(this.allEventsId);
    this.#events = [...this.#events, event];
    this._notify(updateType, event);
  }

  // Удаляем события
  deleteEvent(updateType, event) {
    this.#events = this.#events.filter((item) => item.id !== event.id);
    this._notify(updateType, event);
  }

  // Получаем все события
  get allEvents() {
    return this.#events;
  }

  // Получаем id всех событий
  get allEventsId() {
    return this.#events.map((item) => item.id);
  }

  get totalPrice() {
    return this.#events.reduce((acc, item) => acc + item.basePrice, 0);
  }

}
