export class FlightService {
  constructor ($log, $http, apiUrl, flightListInterval, $interval) {
    'ngInject'
    this.logger = $log
    this.http = $http
    this.apiUrl = apiUrl
    this.flightListInterval = flightListInterval
    this.interval = $interval
    this.flights = []
    // this.startFlightsPolling()
    this.logger.log('flightService is a go')
  }

  // startFlightsPolling() {
  //   this.interval(() => {
  //     this.http.get(`${this.apiUrl}/flights`)
  //       .then(result => {
  //         this.logger.log('flightService.getFlights() result: ', result.data)
  //         this.flights = result.data
  //       })
  //       .catch(error => {
  //         this.logger.log('flightService.getFlights() error: ', error)
  //       })
  //   }, this.flightListInterval)
  // }

  // getFlights() {
  //   return this.flights
  // }

  getFlights() {
    return this.http.get(`${this.apiUrl}/flights`)
      .then(result => {
        this.logger.log('flightService.getFlights() result: ', result.data)
        return Promise.resolve(result)
      })
      .catch(error => {
        this.logger.log('flightService.getFlights() error: ', error)
        return Promise.reject(error)
      })
  }


}