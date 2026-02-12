import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { remove, render, replace } from '../framework/render.js';
import { EVENT_MODE } from '../const.js';
// import { isEscapeKey } from '../utils.js';

export default class EventPresentor {
  #eventListContainer = null;
  #handleEventChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = EVENT_MODE.DEFAULT;

  constructor({eventListContainer, onEventChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
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
      if (this.#mode === EVENT_MODE.EDITING) {
        replace(this.#eventEditComponent, prevEventEditComponent);
      }

    }

    if (this.#eventListContainer.contains(prevEventComponent.element)) {
      if (this.#mode === EVENT_MODE.DEFAULT) {
        replace(this.#eventComponent, prevEventComponent);
      }
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #switchToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = EVENT_MODE.EDITING;
  }

  #switchToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = EVENT_MODE.DEFAULT;
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

  resetView() {
    if (this.#mode !== EVENT_MODE.DEFAULT) {
      this.#switchToCard();
    }
  }

}
