import ApiService from '../framework/api-service.js';

import { METHOD_API } from '../const.js';

export default class OffersApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  // Получаем офферы
  async offers() {
    return this._load({
      url: 'offers',
      method: METHOD_API.GET,
    })
      .then(ApiService.parseResponse);
  }

}
