import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { render, replace } from '../framework/render.js';
// import { isEscapeKey } from '../utils.js';

export default class EventPresentor {
  #event = null;

  eventPointComponent = null;
  eventPointEditComponent = null;

  constructor({eventListContainer}) {
    this.eventListContainer = eventListContainer;
  }

  init(event) {
    this.#event = event;

    const eventPoint = {
      event: this.#event.point,
      destination: this.#event.destination,
      offers: this.#event.offers,
    };

    this.eventPointComponent = new EventPointView({
      ...eventPoint,
      onSwitchToForm: this.#handleSwitchToForm,
    }
    );

    this.eventPointEditComponent = new EventPointEditView({
      ...eventPoint,
      onSwitchToCard: this.#handleSwitchToCard,
    });

    render(this.eventPointComponent, this.eventListContainer);
  }

  #switchToForm() {
    replace(this.eventPointEditComponent, this.eventPointComponent);
  }

  #switchToCard() {
    replace(this.eventPointComponent, this.eventPointEditComponent);
  }

  #handleSwitchToForm = () => {
    this.#switchToForm();
  };

  #handleSwitchToCard = () => {
    this.#switchToCard();
  };

}
