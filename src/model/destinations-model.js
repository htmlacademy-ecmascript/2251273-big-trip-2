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

  // Получаем все города
  get allCities() {
    return this.#destinations.map((item) => item.name);
  }

  // Инициализируем модель
  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations();
    } catch (err) {
      this.#destinations = [];
      throw new Error('Can\'t load destinations');
    }
  }

  // Получаем описание города по id
  getDestinationById(id) {
    return this.#destinations.find((destination) => destination?.id === id || null);
  }

  // Получаем id города по названию
  getIdByName(name) {
    return this.#destinations.find((destination) => destination?.name === name)?.id || null;
  }

}
