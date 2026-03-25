import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = null;
  #destinationsApiService = null;

  constructor({
    destinationsApiService,
  }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations();
    } catch (err) {
      this.#destinations = [];
      throw new Error('Can\'t load destinations');
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination?.id === id || null);
  }

  getIdByName(name) {
    return this.#destinations.find((destination) => destination?.name === name)?.id || null;
  }

  get allCities() {
    return this.#destinations.map((item) => item.name);
  }
}
