export class FlightService {
  constructor ($log, $http, apiUrl) {
    'ngInject'
    this.logger = $log
    this.http = $http
    this.apiUrl = apiUrl
    this.flights = []
    this.logger.log('flightService is a go')
  }

  getFlights() {
    return this.http.get(`${this.apiUrl}/flights`)
      .then(result => {
        this.logger.log('flightService.getFlights() result: ', result.data)
        return Promise.resolve(result.data)
      })
      .catch(error => {
        this.logger.log('flightService.getFlights() error: ', error)
        return Promise.reject(error)
      })
  }
}