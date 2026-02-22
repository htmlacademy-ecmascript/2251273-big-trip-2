import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { remove, render, replace } from '../framework/render.js';
import { EVENT_MODE } from '../const.js';

export default class EventPresentor {
  // Containers
  #eventListContainer = null;
  // Models
  #offersModel = null;
  #destinationsModel = null;
  // Handlers
  #handleEventChange = null;
  #handleModeChange = null;
  #handleEventSave = null;
  #handleEventDelete = null;
  // Components
  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = EVENT_MODE.DEFAULT;

  constructor({
    eventListContainer,
    offersModel,
    destinationsModel,
    onEventChange,
    onModeChange,
    onEventSave,
    onEventDelete
  }) {
    //
    this.#eventListContainer = eventListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
    this.#handleEventSave = onEventSave;
    this.#handleEventDelete = onEventDelete;
  }

  init(event) {
    this.#event = event;

    this.#eventComponent = this.#createEventComponent();
    render(this.#eventComponent, this.#eventListContainer);

    this.#eventEditComponent = this.#createEventEditComponent();
  }

  update(event) {
    this.#event = event;

    const updatedEventComponent = this.#createEventComponent();
    const updatedEventEditComponent = this.#createEventEditComponent();

    if (this.#mode === EVENT_MODE.DEFAULT) {
      replace(updatedEventComponent, this.#eventComponent);
    } else {
      replace(updatedEventEditComponent, this.#eventEditComponent);
      this.#eventEditComponent = updatedEventEditComponent;
    }

    this.#eventComponent = updatedEventComponent;
    this.#eventEditComponent = updatedEventEditComponent;

  }

  #createEventComponent() {
    return new EventPointView({
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onSwitchToForm: this.#handleSwitchToForm,
      onFavoriteClick: this.#handleFavoriteClick
    }
    );
  }

  #createEventEditComponent() {
    return new EventPointEditView({
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onSwitchToCard: this.#handleSwitchToCard,
      onSubmitForm: this.#handleFormSubmit,
      onDeleteForm: this.#handleFormDelete
    }
    );
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
    this.#event.isFavorite = !this.#event.isFavorite;
    this.#handleEventChange(this.#event);
  };

  #handleFormSubmit = (event) => {
    this.#handleEventSave(event);
    this.#handleSwitchToCard();
  };

  #handleFormDelete = () => {
    this.#handleEventDelete({event: this.#event});
  };

  resetView() {
    if (this.#mode !== EVENT_MODE.DEFAULT) {
      this.#switchToCard();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

}
