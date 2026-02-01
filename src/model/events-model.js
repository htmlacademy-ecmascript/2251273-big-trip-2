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

}
