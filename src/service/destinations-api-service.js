import ApiService from '../framework/api-service.js';

import { METHOD_API } from '../const.js';

export default class DestinationsApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  // Получаем офферы
  async destinations() {
    return this._load({
      url: 'destinations',
      method: METHOD_API.GET,
    })
      .then(ApiService.parseResponse);
  }

}
