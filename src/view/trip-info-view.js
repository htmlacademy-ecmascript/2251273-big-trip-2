import AbstractView from '../framework/view/abstract-view';

function createTripInfo({
  allCitiesEvents,
  startDate,
  endDate,
  fullPrice
}) {

  return (`
          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${allCitiesEvents.join(' &mdash; ')}</h1>

              <p class="trip-info__dates">${startDate}&mdash;${endDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
            </p>
          </section>
        `);
}

export default class TripInfoView extends AbstractView {

  constructor({allCitiesEvents, startDate, endDate, fullPrice}) {
    super();
    this.allCitiesEvents = allCitiesEvents;
    this.startDate = startDate;
    this.endDate = endDate;
    this.fullPrice = fullPrice;
  }

  get template() {
    return createTripInfo({
      allCitiesEvents: this.allCitiesEvents,
      startDate: this.startDate,
      endDate: this.endDate,
      fullPrice: this.fullPrice
    });
  }

}
