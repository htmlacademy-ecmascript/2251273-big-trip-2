import AbstractView from '../framework/view/abstract-view';

import { getFormettedDate,getFirstEvent, getLastEvent, cutCityes } from '../utils.js';
import { DateFormat } from '../const.js';

function createTripInfo({
  eventsModel,
  destinationsModel,
}) {
  const firstEvent = getFirstEvent(eventsModel.allEvents);
  const lastEvent = getLastEvent(eventsModel.allEvents);
  const fisrtEventDate = firstEvent?.dateFrom;
  const lastEventDate = lastEvent?.dateTo;
  const allCities = eventsModel.allEvents.map((event) => destinationsModel.getDestinationById(event.destination).name);


  return (`
          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cutCityes(allCities)}</h1>
              ${fisrtEventDate && lastEventDate ? `<p class="trip-info__dates">${ getFormettedDate(fisrtEventDate, DateFormat.eventDate) } &mdash; ${ getFormettedDate(lastEventDate, DateFormat.eventDate) }</p>` : ''}
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${eventsModel.totalPrice || 0}</span>
            </p>
          </section>
        `);
}

export default class TripInfoView extends AbstractView {
  // Models
  #eventsModel = null;
  #destinationsModel = null;
  constructor({
    // Models
    eventsModel,
    // offersModel,
    destinationsModel,
  }) {
    super();
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    return createTripInfo({
      eventsModel: this.#eventsModel,
      destinationsModel: this.#destinationsModel,
    });
  }

}
