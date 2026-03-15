import Observable from '../framework/observable.js';
// import { UPDATE_TYPE } from '../const.js';

import { generateUniqueEventId } from '../utils.js';


export default class EventsModel extends Observable {
  #events = null;
  #eventApiService = null;

  constructor({
    eventApiService,
  }) {
    super();
    this.#eventApiService = eventApiService;
  }

  async init() {
    try {
      this.#events = await this.#eventApiService.events();
      this.#events = this.#events.map(this.#adaptedEventToClient);
    } catch (err) {
      this.#events = [];
      throw err;
    }
    // this._notify(UPDATE_TYPE.INIT);
  }

  #adaptedEventToClient(event) {
    const adaptedEvent = { ...event,
      basePrice: event.base_price,
      dateFrom: event.date_from,
      dateTo: event.date_to,
      isFavorite: event.is_favorite,
    };

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  #adaptedEventToServer(event) {
    const adaptedEvent = {
      ...event,
      // eslint-disable-next-line camelcase
      base_price: event.basePrice,
      // eslint-disable-next-line camelcase
      date_from: event.dateFrom,
      // eslint-disable-next-line camelcase
      date_to: event.dateTo,
      // eslint-disable-next-line camelcase
      is_favorite: event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }

  // Получаем события по id
  getEventById(id) {
    return this.#events.find((event) => event.id === id) || null;
  }

  // Обновляем события
  async updateEvent(updateType, event) {
    try {
      await this.#eventApiService.updateEvent(this.#adaptedEventToServer(event));
      this.#events = this.#events.map((item) => item.id === event.id ? event : item);
      this._notify(updateType, event);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  // Добавляем события
  addEvent(updateType, event) {
    event.id = generateUniqueEventId(this.allEventsId);
    this.#events = [...this.#events, event];
    this._notify(updateType, event);
  }

  // Удаляем события
  deleteEvent(updateType, event) {
    this.#events = this.#events.filter((item) => item.id !== event.id);
    this._notify(updateType, event);
  }

  // Получаем все события
  get allEvents() {
    return this.#events;
  }

  // Получаем id всех событий
  get allEventsId() {
    return this.#events.map((item) => item.id);
  }

  get totalPrice() {
    return this.#events.reduce((acc, item) => acc + item.basePrice, 0);
  }

}
