import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = null;
  #offersApiService = null;

  constructor({
    offersApiService,
  }) {
    super();
    this.#offersApiService = offersApiService;
  }

  // Инициализируем модель
  async init() {
    try {
      this.#offers = await this.#offersApiService.offers();
    } catch (err) {
      this.#offers = [];
      throw new Error('Can\'t load offers');
    }
  }

  // получаем офферы по типу
  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  // получаем цену оффера
  getPriceOffer(type, id) {
    return this.#offers.find((offer) => offer.type === type).offers.find((offer) => offer.id === id).price;
  }

}
