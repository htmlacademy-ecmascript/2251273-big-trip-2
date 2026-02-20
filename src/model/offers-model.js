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
    return this.#offers.filter((offer) => offer.type === type);
  }

  get allOffers() {
    return this.#offers;
  }

}
