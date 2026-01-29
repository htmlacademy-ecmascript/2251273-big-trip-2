import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';
import EventPointAddView from '../view/event-point-add-view.js';

import {render} from '../render.js';

export default class EventPresenter {
  eventSort = new EventSortView();
  eventList = new EventListView();

  constructor({eventContainer, eventsModel}) {
    this.eventContainer = eventContainer;
    this.eventsModel = eventsModel;//получаем модель
  }


  init() {
    const allEvents = this.eventsModel.getEvents();

    const eventEdit = this.eventsModel.getRandomEvent();
    const eventDestination = this.eventsModel.getDestinationById(eventEdit.destination);
    const eventOffers = this.eventsModel.getAllOffersByType(eventEdit.type);

    render(this.eventSort, this.eventContainer, 'AFTERBEGIN');
    render(this.eventList, this.eventContainer, 'BEFOREEND');

    for (const event of allEvents) {
      render(new EventPointView({
        event: event,
        destination: this.eventsModel.getDestinationById(event.destination),
        offers: this.eventsModel.getCurrentOffers(event.type, event.offers)
      }), this.eventList.getElement(), 'BEFOREEND');
    }

    render(new EventPointEditView({
      event: eventEdit,
      destination: eventDestination,
      offers: eventOffers
    }), this.eventList.getElement(), 'AFTERBEGIN');
    render(new EventPointAddView(), this.eventList.getElement(), 'AFTERBEGIN');
  }

}
