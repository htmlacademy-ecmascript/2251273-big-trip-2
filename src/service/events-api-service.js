import ApiService from '../framework/api-service.js';

import { METHOD_API } from '../const.js';

export default class EventsApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  // Получаем события
  async events() {
    return this._load({
      url: 'points',
      method: METHOD_API.GET,
    })
      .then(ApiService.parseResponse);
  }

  // Обновляем события
  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: METHOD_API.PUT,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
