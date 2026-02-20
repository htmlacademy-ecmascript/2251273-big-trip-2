import EventPointView from '../view/event-point-view.js';
import EventPointEditView from '../view/event-point-edit-view.js';

import { remove, render, replace } from '../framework/render.js';
import { EVENT_MODE } from '../const.js';

export default class EventPresentor {
  //
  #eventListContainer = null;
  //
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  //
  #handleEventChange = null;
  #handleModeChange = null;
  #handleEventSave = null;
  #handleEventDelete = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #mode = EVENT_MODE.DEFAULT;

  constructor({
    eventListContainer,
    eventsModel,
    offersModel,
    destinationsModel,
    onEventChange,
    onModeChange,
    onEventSave,
    onEventDelete }) {
    //
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
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
    render(this.#eventEditComponent, this.#eventListContainer);

    // if (prevEventComponent === null || prevEventEditComponent === null) {
    //   render(this.#eventComponent, this.#eventListContainer);
    // }

    // if (this.#mode === EVENT_MODE.EDITING) {
    //   replace(this.#eventEditComponent, prevEventEditComponent);
    // }

    // if (this.#mode === EVENT_MODE.DEFAULT) {
    //   replace(this.#eventComponent, prevEventComponent);
    // }

    // remove(prevEventComponent);
    // remove(prevEventEditComponent);
  }

  update(event) {
    this.#event = event;
    const updatedEventComponent = this.#createEventComponent();
    replace(updatedEventComponent, this.#eventComponent);
    this.#eventComponent = updatedEventComponent;
  }

  #createEventComponent() {
    return new EventPointView({
      event: this.#event,
      // eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      // onSwitchToForm: this.#handleSwitchToForm,
      onFavoriteClick: this.#handleFavoriteClick
    }
    );
  }

  #createEventEditComponent() {
    return new EventPointEditView({
      event: this.#event,
      // eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      // onSwitchToCard: this.#handleSwitchToCard,
      // onSubmitForm: this.#handleFormSubmit,
      // onDeleteForm: this.#handleFormDelete
    }
    );
  }

  // #switchToForm() {
  //   replace(this.#eventEditComponent, this.#eventComponent);
  //   this.#handleModeChange();
  //   this.#mode = EVENT_MODE.EDITING;
  // }

  // #switchToCard() {
  //   replace(this.#eventComponent, this.#eventEditComponent);
  //   this.#mode = EVENT_MODE.DEFAULT;
  // }

  // #handleSwitchToForm = () => {
  //   this.#switchToForm();
  // };

  // #handleSwitchToCard = () => {
  //   this.#switchToCard();
  // };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
    this.#handleEventChange({
      event: this.#event,
    });
  };

  // #handleFormSubmit = ({eventId, event}) => {
  //   this.#handleEventSave({eventId, event});
  //   this.#handleSwitchToCard();
  // };

  // #handleFormDelete = () => {
  //   this.#handleEventDelete({eventId: this.#event.point.id, event: this.#event});
  // };

  // resetView() {
  //   if (this.#mode !== EVENT_MODE.DEFAULT) {
  //     this.#switchToCard();
  //   }
  // }

  // destroy() {
  //   remove(this.#eventComponent);
  //   remove(this.#eventEditComponent);
  // }

}
