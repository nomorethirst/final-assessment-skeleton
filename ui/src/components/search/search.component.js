import templateUrl from './search.template.html'

const controller = class SearchController {
  constructor($log, flightService, $timeout, flightListInterval, $scope, $state) {
    'ngInject'
    this.logger = $log
    this.flightService = flightService
    this.timeout = $timeout
    this.flightListInterval = flightListInterval
    this.state = $state
    this.flights = []
    this.routes = []
    this.searchIsDirty = false
    this.logger.log('search is a go')

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
          if (this.searchIsDirty) {
            this.getRoutes()
          }
          this.getFlightsPromise = this.timeout(this.updateFlightsOnInterval, this.flightListInterval)
      })
      .catch(error => {
        this.logger.log('Search.updateFlightsOnInterval: Error getting search from server')
      })
  }

  viewMap(route) {
    this.logger.log('search.viewMap, route = ', route)
    this.state.go()
  }

  /* A Route is an ordered list of flights. 
   * Routes is an ordered list of routes, sorted by fastest
   * routes: [
   *  [{
   *     origin: $origin,
   *     destination: $destination,
   *     flightTime: $flightTime,
   *     offset: $offset
   *   }, ...
   *  ], ...
   * ]
   * Think of it as 2D Array routes[][], where rows are routes, cols are flights
   * [
   *   [flight1, flight2],
   *   [flight1],
   *   [flight1, flight2, flight3],
   *   ...
   * ]
  */
  getRoutes(origin, destination) {
    if (this.routeImpossible()) {
      window.alert('Sorry, no routes are possible for this departure and arrival city today.')
      this.routes = []
    } else {
      this.routes = this.flights
        .map( flight => [flight, {origin: 'ORIGIN', destination: 'DESTINATION', flightTime: 0, offset: 0}])
    }
  }

  // O(2n) worst case
  routeImpossible(origin, destination) {
    return this.flights.find(f => f.origin === origin) === undefined 
        || this.fligths.find(f => f.destination === destination) === undefined
  }

  // O(n) worst case
  findNextLegs(list, currTime, currLoc) {
    return list.filter(f => f.offset > currTime && f.origin === currLoc)
  }

  // O(n)
  findNonstops(list, origin, destination) {
    return list.filter(f => f.origin === origin && f.destination === desination)
  }

  getRoutes1() {
    //nonstops: Find set of all flights with origin && dest matching query - add each one as [flight]
    //starts: Find set of all flights with only origin matching query - possible starting legs
    //finals: Find set of all flights with only destination matching query possible ending legs
    //Loop thru starts, for each loop thru flights to attach leg, add if in finals as [start, leg, final]
    //hmmmmmm......
    //
    let flights = this.flights.slice()
    for (let i = 0; i < flights.length; i++) {
    }
  }


}

export const Search = {
  controller,
  templateUrl,
  controllerAs: 'search',
  bindings: {
    search: '='
  }
}