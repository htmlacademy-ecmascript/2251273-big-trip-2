import AbstractView from '../framework/view/abstract-view';

import { getFormettedDate,getFirstEvent, getLastEvent, cutCityes } from '../utils.js';
import { DateFormat } from '../const.js';

function createTripInfo({
  eventsModel,
  offersModel,
  destinationsModel,
}) {
  const firstEvent = getFirstEvent(eventsModel.allEvents);
  const lastEvent = getLastEvent(eventsModel.allEvents);
  const fisrtEventDate = firstEvent?.dateFrom;
  const lastEventDate = lastEvent?.dateTo;
  const allCities = eventsModel.allEvents.map((event) => destinationsModel.getDestinationById(event.destination).name);

  const fullPrice = eventsModel.allEvents.reduce((accBasePrice, event) => {
    const offersPrice = event.offers.reduce((accOffers, offer) => {
      accOffers += offersModel.getPriceOffer(event.type, offer);
      return accOffers;
    }, 0);
    return accBasePrice + event.basePrice + offersPrice;
  }, 0);


  return (`
          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cutCityes(allCities)}</h1>
              ${fisrtEventDate && lastEventDate ? `<p class="trip-info__dates">${ getFormettedDate(fisrtEventDate, DateFormat.eventDate) } &mdash; ${ getFormettedDate(lastEventDate, DateFormat.eventDate) }</p>` : ''}
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${ fullPrice || 0}</span>
            </p>
          </section>
        `);
}

export default class TripInfoView extends AbstractView {
  // Models
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  constructor({
    // Models
    eventsModel,
    offersModel,
    destinationsModel,
  }) {
    super();
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    return createTripInfo({
      eventsModel: this.#eventsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
    });
  }

}
