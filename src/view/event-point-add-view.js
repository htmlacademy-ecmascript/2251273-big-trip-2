import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { addOfferInArray, deleteOfferInArray, getNumberFromString } from '../utils.js';
import { TypePoint } from '../const.js';

import flatpickr from 'flatpickr';
import he from 'he';

function crateEventTypeList({ event, destinationsModel }) {
  const allCities = destinationsModel.allCities;
  return (`
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${Object.keys(TypePoint).map((key) => `
                        <div class="event__type-item">
                          <input id="event-type-${key}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${key}" data-type="${key}" ${key === event.type ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${key}" for="event-type-${key}-1">${TypePoint[key]}</label>
                        </div>
                          `).join('')}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${TypePoint[event.type]}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationsModel.getDestinationById(event.destination)?.name || ''}" list="destination-list-1" autocomplete="off">
                    <datalist id="destination-list-1">
                    ${allCities.map((city) => `<option value="${city}"></option>`).join('')}
                    </datalist>
                  </div>
`);
}

function createEventDate() {
  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">&mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
    </div>
  `);
}

function createEventPrice({ eventPrice }) {
  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>&euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}" autocomplete="off">
    </div>
  `);
}

function createEventOffersList({ allOffers, eventOffers }) {
  if (allOffers.length === 0) {
    return '';
  } else {
    return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${allOffers.map((offer) => {
        const isChecked = eventOffers.includes(offer.id);
        return (`
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" data-offer-id="${offer.id}" ${isChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.id}-1">
              <span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `);
      }).join('')}

      </div>
    </section>
  `);
  }

}

function createEventDestination({ eventDescription, eventPicture }) {
  if (!eventDescription || !eventPicture) {
    return '';
  } else {
    return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${eventDescription ? `<p class="event__destination-description">${eventDescription}</p>` : ''}
      ${eventPicture.length > 0 ? `
        <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPicture.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
        </div>
      </div>` : ''}
    </section>
  `);
  }
}

function createEventPointAdd({
  event,
  offersModel,
  destinationsModel
}) {

  const eventPrice = event.basePrice;
  const eventOffers = event.offers;

  const allOffers = offersModel.getOffersByType(event.type);
  const destination = destinationsModel.getDestinationById(event.destination);

  const eventDescription = destination?.description;
  const eventPicture = destination?.pictures;

  return (`
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${crateEventTypeList({ event, destinationsModel })}
                  ${createEventDate()}
                  ${createEventPrice({ eventPrice })}
                  <button class="event__save-btn  btn  btn--blue" type="submit" ${event.destination && eventPrice > 0 ? '' : 'disabled'}>Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${createEventOffersList({ allOffers, eventOffers })}
                  ${createEventDestination({ eventDescription, eventPicture })}
                </section>
              </form>
            </li>
        `);
}

export default class EventPointAddView extends AbstractStatefulView {
  #event = null;

  #offersModel = null;
  #destinationsModel = null;

  #onSwitchToCard = null;
  #onSubmitForm = null;
  #onCancelForm = null;

  #dateFrom = null;
  #dateTo = null;

  constructor({
    event,
    offersModel,
    destinationsModel,
    onSubmitForm,
    onCancelForm,
  }) {
    super();
    this.#event = event;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#onSubmitForm = onSubmitForm;
    this.#onCancelForm = onCancelForm;

    this._setState(this.#event);

    this._restoreHandlers();
  }

  get template() {

    return createEventPointAdd({
      event: this._state,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel
    });
  }

  _restoreHandlers() {
    const eventSaveButton = this.element.querySelector('.event__save-btn');
    const eventDeleteButton = this.element.querySelector('.event__reset-btn');
    const eventStartTime = this.element.querySelector('#event-start-time-1');
    const eventEndTime = this.element.querySelector('#event-end-time-1');

    eventSaveButton.disabled = !this.#checkSubmitButton();

    this.element.querySelector('.event').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#onSubmitForm({event:this._state});
      eventSaveButton.disabled = true;
      eventSaveButton.innerHTML = 'Saving...';
    });

    this.element.querySelector('.event').addEventListener('reset', (evt) => {
      evt.preventDefault();
      this.#onCancelForm();
      eventDeleteButton.disabled = true;
      eventDeleteButton.innerHTML = 'Deleting...';
      eventStartTime.value = '';
      eventEndTime.value = '';
    });

    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (evt) => {
        this.#updadeOffersEvent(evt.target.dataset.offerId, evt.target.checked);
      });
    });

    this.element.querySelectorAll('.event__type-input').forEach((radio) => {
      radio.addEventListener('change', () => {
        this.#choiceTypePoint(radio.dataset.type);
        this._state.offers = [];
      });
    });

    this.element.querySelector('.event__input--destination').addEventListener('input', () => {
      const value = he.encode(this.element.querySelector('.event__input--destination').value);
      this._state.destination = this.#destinationsModel.getIdByName(value) || null;
      eventSaveButton.disabled = !this.#checkSubmitButton();
      if (this._state.destination) {
        this.#updateState(this._setState);
      }
    });

    this.element.querySelector('.event__input--price').addEventListener('input', () => {
      this._state.basePrice = getNumberFromString(this.element.querySelector('.event__input--price').value);
      this.element.querySelector('.event__input--price').value = this._state.basePrice;
      eventSaveButton.disabled = !this.#checkSubmitButton();
    });

    this.#setDateFrom();
    this.#setDateTo();
  }

  #checkSubmitButton = () => this._state.destination && this._state.basePrice > 0 && this._state.dateFrom !== null && this._state.dateTo !== null;

  #updadeOffersEvent = (offerId, checked) => {
    if (checked) {
      this._state.offers = addOfferInArray(this._state.offers, offerId);
    } else {
      this._state.offers = deleteOfferInArray(this._state.offers, offerId);
    }
  };

  #choiceTypePoint = (newEventType) => {
    this._state.type = newEventType;
    this.#updateState();
  };

  #updateState = () => {
    this.updateElement(this._state);
  };

  #setDateFrom = () => {
    this.#dateFrom = flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true,
      defaultDate: this._state.dateFrom || null,
      dateFormat: 'd/m/y H:i',
      maxDate: this._state.dateTo || null,
      onChange: this.#dateFromChangeHandler,
    });
  };

  #setDateTo = () => {
    this.#dateTo = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      defaultDate: this._state.dateTo || null,
      dateFormat: 'd/m/y H:i',
      minDate: this._state.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  };

  #dateFromChangeHandler = (selectedDates) => {
    this.#dateTo.set('minDate', this._state.dateFrom);
    this._state.dateFrom = selectedDates[0].toISOString();
    this.#updateState();
  };

  #dateToChangeHandler = (selectedDates) => {
    this.#dateFrom.set('maxDate', this._state.dateTo);
    this._state.dateTo = selectedDates[0].toISOString();
    this.#updateState();
  };

}
