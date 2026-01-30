import { getAllPoints } from '../mock/points.js';
import { getOffersByType } from '../mock/offers.js';
import { getDestinationPointById } from '../mock/destination.js';

export default class EventsModel {
  constructor() {
    this.events = [];
  }

  init() {
    this.events = getAllPoints();
  }

  getEvents() {
    return this.events;
  }

  getRandomEvent() {
    return this.events[Math.floor(Math.random() * this.events.length)];
  }

  getDestinationById(id) {
    return getDestinationPointById(id);
  }

  getAllOffersByType(type) {
    return getOffersByType(type);
  }

  getCurrentOffers(type, listOffersId) {
    return getOffersByType(type).filter((offer) => listOffersId.includes(offer.id));
  }

}
