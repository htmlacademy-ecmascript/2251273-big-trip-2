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

  getIdByName(name) {
    return this.#destinations.find((destination) => destination.name === name).id || null;
  }

  get allCities() {
    return this.#destinations.map((item) => item.name);
  }
}
