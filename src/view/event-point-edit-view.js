import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { getFormettedDate, addOfferInArray, deleteOfferInArray} from './../utils.js';
import { DateFormat, TypePoint } from '../const.js';

function crateEventTypeList({eventType}) {
  return (`
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${Object.keys(TypePoint).map((key) => `
                        <div class="event__type-item">
                          <input id="event-type-${key}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${key}" data-type="${key}" ${key === eventType ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${key}" for="event-type-${key}-1">${TypePoint[key]}</label>
                        </div>
                          `).join('')}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${TypePoint[eventType]}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>
`);
}

function createEventOffersList({allOffers, eventOffers}) {
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

function createEventDestination({eventDescription, eventPicture}) {
  if (!eventDescription || !eventPicture.length) {
    return '';
  } else {
    return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${eventDescription}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventPicture.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
        </div>
      </div>
    </section>
  `);
  }
}

function createEventDate({eventStartDate, eventEndDate}) {
  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">&mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}">
    </div>
  `);
}

function createEventPrice({eventPrice}) {
  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>&euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
    </div>
  `);
}

function createEventPointEdit(event) {
  const eventType = event.point.type;

  const allOffers = event.offers;
  const eventOffers = event.point.offers;

  const eventPoint = event.point;
  const eventDescription = event.destination.description;

  const eventPicture = event.destination.pictures;

  const eventPrice = eventPoint.basePrice;

  const eventStartDate = getFormettedDate(eventPoint.dateFrom, DateFormat.eventGroupTime);
  const eventEndDate = getFormettedDate(eventPoint.dateTo, DateFormat.eventGroupTime);

  return (`
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${crateEventTypeList({eventType})}
                  ${createEventDate({eventStartDate, eventEndDate})}
                  ${createEventPrice({eventPrice})}
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createEventOffersList({allOffers, eventOffers})}
                  ${createEventDestination({eventDescription, eventPicture})}
                </section>
              </form>
            </li>
        `);

}

export default class EventPointEditView extends AbstractStatefulView {
  #event = null;

  #eventId = null;
  #offers = null;
  #destination = null;

  #onSwitchToCard = null;
  #onSubmitForm = null;
  #onDeleteForm = null;

  constructor({
    event,
    // eventsModel,
    offersModel,
    destinationsModel,
    onSwitchToCard,
    onSubmitForm,
    onDeleteForm,
  }) {
    super();
    this.#event = event;
    // this.#event = eventsModel.getEventById(this.#eventId);
    this.#offers = offersModel.getOfferByType(this.#event);
    this.#destination = destinationsModel.getDestinationById(this.#event.destination);
    // console.log(this.#event);

    // this._setState({event: this.#event, offers: this.#offers, destination: this.#destination});
    // console.log(this._state);

    // this.#onSwitchToCard = onSwitchToCard;
    // this.#onSubmitForm = onSubmitForm;
    // this.#onDeleteForm = onDeleteForm;

    // this._restoreHandlers();
  }

  get template() {
    // return createEventPointEdit(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this._setState(this.#event);
      // this.#updateState(this._setState);
      this.#onSwitchToCard();
    });

    // this.element.querySelector('.event').addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   this.#onSubmitForm({eventId: this._state.point.id, event: this._state});
    // });

    // this.element.querySelector('.event').addEventListener('reset', this.#onDeleteForm);

    //TODO: исправить на один обработчик
    // this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
    //   checkbox.addEventListener('change', (evt) => {
    //     this.#updadeOffersEvent({offerId: evt.target.dataset.offerId, checked: evt.target.checked});
    //   });
    // });

    //TODO: исправить на один обработчик
    // this.element.querySelectorAll('.event__type-input').forEach((radio) => {
    //   radio.addEventListener('change', () => {
    //     this.#choiceTypePoint({newEventType: radio.dataset.type});
    //   });
    // });

  }

  // #updadeOffersEvent = ({offerId, checked}) => {
  //   if (checked) {
  //     this._state.point.offers = addOfferInArray(this._state.point.offers, offerId);
  //   } else {
  //     this._state.point.offers = deleteOfferInArray(this._state.point.offers, offerId);
  //   }
  // };

  // #choiceTypePoint = ({newEventType}) => {
  //   this.#updateState({point: {...this._state.point, type: newEventType}});
  // };

  // #updateState = (update) => {
  //   this.updateElement(update);
  // };

}
