import Observable from '../framework/observable.js';
import { getAllEvents } from '../mock/events.js';


export default class EventsModel extends Observable {
  #events = null;

  constructor() {
    super();
    this.#events = [];
  }

  init() {
    this.#events = getAllEvents();
  }

  getEventById(id) {
    return this.#events.find((event) => event.id === id) || null;
  }

  updateEvent(updateType, event) {
    this.#events = this.#events.map((item) => item.id === event.id ? event : item);
    this._notify(updateType, event);
  }

  addEvent(updateType, event) {
    this._notify(updateType, event);
  }

  deleteEvent(updateType, event) {
    this.#events = this.#events.filter((item) => item.id !== event.id);
    this._notify(updateType, event);
  }

  get allEvents() {
    return this.#events;
  }
}
