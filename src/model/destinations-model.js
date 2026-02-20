import { getAllDestinations } from '../mock/destinations.js';

export default class EventsModel {
  #destinations = null;

  constructor() {
    this.#destinations = [];
  }

  init() {
    this.#destinations = getAllDestinations();
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id || null);
  }

  get allDestinations() {
    return this.#destinations;
  }

}
