export class MapService {
  constructor ($http, apiUrl) {
    'ngInject'
    this.http = $http
    this.apiUrl = apiUrl
  }

  getMarkerByCityName (name) {
    return this.http
      .get(`${this.apiUrl}/location/name`, { params: { name } })
      .then(result => result.data)
  }
}
