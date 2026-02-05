import { getAllPoints } from '../mock/points.js';
import { getOffersByType } from '../mock/offers.js';
import { getDestinationPointById } from '../mock/destination.js';

export default class EventsModel {
  #events = null;

  constructor() {
    this.#events = [];
  }

  init() {
    this.#events = getAllPoints();
  }

  get allEvents() {
    return this.#events.map((event) => ({
      point: event,
      destination: getDestinationPointById(event.destination),
      offers: getOffersByType(event.type),
    }));
  }

  get randomEvent() {
    const event = this.#events[Math.floor(Math.random() * this.#events.length)];
    return {
      point: event,
      destination: getDestinationPointById(event.destination),
      offers: getOffersByType(event.type),
    };
  }

  get allCitiesEvents() {
    return this.#events.map((event) => getDestinationPointById(event.destination).name);
  }

  get minEventsDate() {
    return this.#events.map((event) => event.dateFrom).sort((a, b) => a - b)[0];
  }

  get maxEventsDate() {
    return this.#events.map((event) => event.dateTo).sort((a, b) => b - a)[0];
  }

  get fullPrice() {
    return this.#events.reduce((acc, event) => acc + event.basePrice, 0);
  }

}
