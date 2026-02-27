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

  get allEvents() {
    return this.#events;
  }
}
