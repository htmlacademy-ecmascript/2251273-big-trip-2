import { getAllOffers } from '../mock/offers.js';

export default class EventsModel {
  #offers = null;

  constructor() {
    this.#offers = [];
  }

  init() {
    this.#offers = getAllOffers();
  }

  getOfferByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers || null;
  }

}
