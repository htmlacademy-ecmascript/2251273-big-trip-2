import Observable from '../framework/observable.js';
import { UPDATE_TYPE } from '../const.js';

export default class OffersModel extends Observable {
  #offers = null;
  #offersApiService = null;

  constructor({
    offersApiService,
  }) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {

    try {
      this.#offers = await this.#offersApiService.offers();
    } catch (err) {
      this.#offers = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  }

  getOfferByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers || null;
  }

}
