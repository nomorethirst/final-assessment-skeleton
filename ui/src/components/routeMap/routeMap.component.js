import templateUrl from './routeMap.template.html'

const controller = class RouteMapController {
  constructor($log, $stateParams) {
    'ngInject'
    this.logger = $log
    this.route = $stateParams.route
    this.totalFlight = 0
    this.totalLayover = 0
    this.setTotals()
    this.logger.log('routeMap.route = ', this.route)
    this.logger.log('routeMap is a go')
  }

  // get totalFlight() {
  //   return this.route.reduce((total, flight) => total += flight.flightTime, 0)
  // }

  setTotals() {
    //flights must be sorted by offset !!!
    let total = 0
    let layover = 0
    let lastArrivalTime = this.route[0].offset + this.route[0].flightTime
    for (let flight of this.route) {
      //thinking from after flight has occured
      total += flight.flightTime
      layover = flight.offset - lastArrivalTime
      //set for next iteration
      lastArrivalTime = flight.offset + flight.flightTime
    }
    this.totalFlight = total
    this.totalLayover = layover
  }
}

export const RouteMap = {
  controller,
  templateUrl,
  controllerAs: 'routeMap'
}