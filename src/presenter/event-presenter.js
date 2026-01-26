import EventSortView from '../view/event-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';
import EventPointAddView from '../view/event-point-add-view.js';

import {render} from '../render.js';

const MAX_POINTS = 3;

export default class EventPresenter {
  eventSort = new EventSortView();
  eventList = new EventListView();

  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(this.eventSort, this.eventContainer, 'AFTERBEGIN');
    render(this.eventList, this.eventContainer, 'BEFOREEND');

    for (let i = 0; i < MAX_POINTS; i++) {
      render(new EventPointView(), this.eventList.getElement(), 'BEFOREEND');
    }

    render(new EventPointEditView(), this.eventList.getElement(), 'AFTERBEGIN');
    render(new EventPointAddView(), this.eventList.getElement(), 'AFTERBEGIN');
  }

}
