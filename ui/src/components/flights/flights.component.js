import templateUrl from './flights.template.html'

const controller = class FlightsController {
  constructor($log, flightService) {
    'ngInject'
    this.logger = $log
    this.logger.log('flights is a go')
  }
}

export const Flights = {
  controller,
  templateUrl,
  controllerAs: 'flights',
  bindings: {
    flights: '<'
  }
}