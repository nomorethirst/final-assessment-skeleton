import templateUrl from './flights.template.html'

const controller = class FlightsController {
  constructor($log, flightService, $timeout, flightListInterval, $scope) {
    'ngInject'
    this.logger = $log
    this.flightService = flightService
    this.timeout = $timeout
    this.flightListInterval = flightListInterval
    this.flights = []
    this.logger.log('flights is a go')

    this.getFlightsPromise
    $scope.$on('$destroy',() => {
      this.timeout.cancel(this.getFlightsPromise)
    })
    this.$onInit = () => {
      this.updateFlightsOnInterval()
    }
  }

  updateFlightsOnInterval = () => {
    this.flightService.getFlights()
      .then(result => {
          this.flights = result.data
          this.getFlightsPromise = this.timeout(this.updateFlightsOnInterval, this.flightListInterval)
      })
      .catch(error => {
        this.logger.log('updateFlightsOnInterval: Error getting flights from server')
      })
  }

  // getFlights() {
  //   this.flightService.getFlights()
  //     .then(result => {
  //       this.flights = result.data
  //       this.timeout.cancel(this.getFlightsPromise)
  //       this.getFlightsPromise = this.timeout(this.getFlights, this.flightListInterval)
  //     })
  // }

}

export const Flights = {
  controller,
  templateUrl,
  controllerAs: 'flights',
  bindings: {
    flights: '='
  }
}