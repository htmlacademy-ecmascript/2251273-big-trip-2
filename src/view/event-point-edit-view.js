import AbstractView from '../framework/view/abstract-view.js';

import { getFormettedDate } from './../utils.js';
import { DateFormat, TypePoint } from '../const.js';

function createEventPointEdit(eventPoint, destination, offers) {
  const event = eventPoint;
  const eventType = event.type;
  const destinationPoint = destination;
  const cityName = destinationPoint.name;
  const offersList = offers;
  const eventPicture = destinationPoint.pictures;
  const eventStartDate = getFormettedDate(event.dateFrom, DateFormat.eventGroupTime);
  const eventEndDate = getFormettedDate(event.dateTo, DateFormat.eventGroupTime);

  return (`
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${Object.keys(TypePoint).map((type) => `<div class="event__type-item">
                            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${ eventType === type ? 'checked' : ''}>
                            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${TypePoint[type]}</label>
                          </div>`).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cityName}" list="destination-list-1" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offersList.map((offer) => `
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${offer.id}" type="checkbox" name="event-offer-luggage" ${event.offers.includes(offer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${offer.id}-${offer.id}">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationPoint.description}</p>
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                        ${eventPicture.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('')}
                        </div>
                      </div>
                  </section>
                </section>
              </form>
            </li>
        `);

}

export default class EventPointEditView extends AbstractView {
  constructor({event, onSwitchToCard, onSubmitForm, onResetForm}) {
    super();
    this.event = event.point;
    this.destination = event.destination;
    this.offers = event.offers;
    this.onSwitchToCard = onSwitchToCard;
    this.onSubmitForm = onSubmitForm;
    this.onResetForm = onResetForm;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.onSwitchToCard);
    this.element.querySelector('.event').addEventListener('submit', this.onSubmitForm);
    this.element.querySelector('.event').addEventListener('reset', this.onResetForm);
  }

  get template() {
    return createEventPointEdit(this.event, this.destination, this.offers);
  }

}
