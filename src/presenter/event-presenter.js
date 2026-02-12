import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { remove, render, replace } from '../framework/render.js';
// import { isEscapeKey } from '../utils.js';

export default class EventPresentor {
  #event = null;
  #eventListContainer = null;
  #handleEventChange = null;
  #eventComponent = null;
  #eventEditComponent = null;

  constructor({eventListContainer, onEventChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleEventChange = onEventChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventPointView({
      event : this.#event,
      onSwitchToForm: this.#handleSwitchToForm,
      onFavoriteClick: this.#handleFavoriteClick
    }
    );

    this.#eventEditComponent = new EventPointEditView({
      event: this.#event,
      onSwitchToCard: this.#handleSwitchToCard,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#eventListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    if (this.#eventListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #switchToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #switchToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }

  #handleSwitchToForm = () => {
    this.#switchToForm();
  };

  #handleSwitchToCard = () => {
    this.#switchToCard();
  };

  #handleFavoriteClick = () => {
    const eventId = this.#event.point.id;
    this.#handleEventChange({
      eventId,
      event: {...this.#event, point: {...this.#event.point, isFavorite: !this.#event.point.isFavorite}}
    });
  };

}
