import templateUrl from './search.template.html'

const controller = class SearchController {
  constructor($log, flightService, $timeout, flightListInterval, $scope, $state, userService) {
    'ngInject'
    this.logger = $log
    this.flightService = flightService
    this.timeout = $timeout
    this.flightListInterval = flightListInterval
    this.state = $state
    this.userService = userService
    this.flights = []
    this.routes = []
    this.depart = ""
    this.departDirty = false
    this.arrive = ""
    this.arriveDirty = false
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
          if (this.departDirty && this.arriveDirty) {
            this.getRoutes(this.depart.display, this.arrive.display)
          } else {
            this.routes = []
          }
          this.getFlightsPromise = this.timeout(this.updateFlightsOnInterval, this.flightListInterval)
      })
      .catch(error => {
        this.logger.log('Search.updateFlightsOnInterval: Error getting search from server')
      })
  }

  viewMap(route) {
    // this.logger.log('search.viewMap, route = ', route)
    this.state.go('routeMap', {route: route})
  }

  bookFlight(route) {
    this.userService.addBooking(route)
      .then(result => {
        window.alert('Booking successfull!')
        this.state.go('bookings')
      })
      .catch(error => {
        window.alert('Error booking this itinerary.')
      })

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
  onClickSearch() {
    this.searchIsDirty = true

  }
  getRoutes(origin = this.depart.display, destination = this.arrive.display) {
    this.logger.log('search.getRoutes: depart = ', this.depart.display)
    this.logger.log('search.getRoutes: arrive = ', this.arrive.display)
    // if (this.routeImpossible(origin, destination)) {
    //   window.alert('Sorry, no routes are possible for this departure and arrival city today.')
    //   this.routes = []
    // } else {
      this.routes = this.flights
        .map( flight => [flight, {origin: 'ORIGIN', destination: 'DESTINATION', flightTime: 1, offset: flight.offset + flight.flightTime + 1}])
      this.logger.log(this.routes)
    // }
  }

  // O(2n) worst case
  routeImpossible(origin, destination) {
    return this.flights.find(f => f.origin === origin) === undefined 
        || this.flights.find(f => f.destination === destination) === undefined
  }

  // O(n) worst case
  findNextLegs(list, currTime, currLoc) {
    return list.filter(f => f.offset > currTime && f.origin === currLoc)
  }

  // O(n)
  findNonstops(list, origin, destination) {
    return list.filter(f => f.origin === origin && f.destination === desination)
  }
  removeNonStops(list, origin, destination) {
    return list.filter(f => f.origin !== origin && f.destination !== desination)
  }

  getRoutes1(origin, destination) {
    let routes = []
    let flights = this.flights.slice()
    //nonstops: Find set of all flights with origin && dest matching query - add each one as [flight]
    //          And remove from list, since they cannot be reused (no stops twice)
    routes.push(this.findNonstops(flights, origin, destination))
    flights = removeNonStops(flights, origin, destination)

    //starts: Find set of all flights with only origin matching query - possible starting legs
    

    //finals: Find set of all flights with only destination matching query possible ending legs
    //Loop thru starts, for each loop thru flights to attach leg, add if in finals as [start, leg, final]
    //hmmmmmm......
    //
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