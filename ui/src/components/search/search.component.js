import templateUrl from './search.template.html'
// import { query, input, expected } from './get.routes.test'

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
    this.noResults = false
    this.logger.log('search is a go')

    this.getFlightsPromise
    $scope.$on('$destroy',() => {
      this.timeout.cancel(this.getFlightsPromise)
    })
    this.$onInit = () => {
      this.updateFlightsOnInterval()
    }
  }

  // testGetRoutes(query, input, expected) {
  //   this.flights = input
  //   let result = getRoutes1(query.depart, query.arrive)
  //   this.logger.log('TEST RESULT: ', result === expected)

  // }

  updateFlightsOnInterval = () => {
    this.flightService.getFlights()
      .then(result => {
          this.flights = result.data
          if (this.departDirty && this.arriveDirty && this.searchIsDirty) {
            this.noResults = false
            // this.logger.log(`routeImpossible() returns: ${this.routeImpossible(this.depart.display, this.arrive.display)}`)
            this.routes = this.getRoutes1(this.depart.display, this.arrive.display)
          } else {
            this.routes = []
          }
          this.getFlightsPromise = this.timeout(this.updateFlightsOnInterval, this.flightListInterval)
      })
      .catch(error => {
        this.logger.log('Search.updateFlightsOnInterval: Error getting search from server: ', error)
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
    this.logger.log(`SEARCH = depart: ${this.depart.display}, arrive: ${this.arrive.display}`)
    this.searchIsDirty = true
    this.noResults = false
    this.getRoutes1()
  }

  // O(2n) worst case
  routeImpossible(origin, destination) {
    return this.flights.find(f => f.origin === origin) === undefined 
        || this.flights.find(f => f.destination === destination) === undefined
  }
  // O(n) worst case - currTime = arrival time (offset+flightTime) of previous flight
  findNextLegs(list, currTime, currLoc) {
    return list.filter(f => f.offset > currTime && f.origin === currLoc)
  }
  // O(n)
  findNonstops(list, origin, destination) {
    return list.filter(f => f.origin === origin && f.destination === destination)
  }
  removeNonStops(list, origin, destination) {
    return list.filter(f => !(f.origin === origin && f.destination === destination) )
  }
  findFirstLegs(list, origin) {
    return list.filter(f => f.origin === origin)
  }
  removeFirstLegs(list, origin) {
    return list.filter(f => f.origin !== origin)
  }
  findLastLegs(list, destination) {
    return list.filter(f => f.destination === destination)
  }
  removeLastLegs(list, destination) {
    return list.filter(f => f.destination !== destination)
  }

  getRoutes1(origin, destination) {
    this.logger.log(`getRoutes1 starting for --> depart: ${this.depart.display}, arrive: ${this.arrive.display}`)
    let routes = []
    let partialRoutes = []
    let flights = this.flights
    let nonstops = []
    let firstLegs = []
    let lastLegs = []
    let nextLegs = []
    let currTime = 0
    //nonstops: Find set of all flights with origin && dest matching query - add each one as [flight]
    //          And remove from list, since they cannot be reused (no stops twice)
    nonstops = this.findNonstops(flights, origin, destination)
    // this.logger.log('nonstops', nonstops)
    for (let f of nonstops) {
      routes.push([f])
    }
    // this.logger.log('routes with nonstops', routes)
    flights = this.removeNonStops(flights, origin, destination)
    // this.logger.log('flights after nonstops removed', flights)
    // If no other legs exist, might as well stop now
    if (flights.length === 0) {
      this.logger.log('only nonstops exist, returning...', routes)
      if (routes.length === 0) {
        this.noResults = true
      }
      return routes
    }
    //starts: Find set of all flights with only origin matching query - possible starting legs
    //          And remove from list, since they cannot be reused (no stops twice)
    firstLegs = this.findFirstLegs(flights, origin)
    this.logger.log('firstLegs: ', firstLegs)
    flights = this.removeFirstLegs(flights, origin)
    // If no other legs exist, might as well stop now
    if (flights.length === 0) {
      this.logger.log('no second legs exist, returning...', routes)
      if (routes.length === 0) {
        this.noResults = true
      }
      return routes
    } else {
      // this.logger.log('flights after firstLegs removed', flights)
    }
    // put first legs into partialRoutes as [[firstleg1], [firstleg2],...] b/c might have to add to them
    for (let leg of firstLegs) {
      partialRoutes.push([leg]) 
    }
    // this.logger.log('partialRoutes init: ', partialRoutes)
    //finals: Find set of all flights with only destination matching query possible ending legs
    lastLegs = this.findLastLegs(flights, destination)
    // flights = this.removeLastLegs(flights, destination)
    // If no last legs exist, might as well stop now
    if (lastLegs.length === 0) {
      this.logger.log('no lastLegs exist, returning...', routes)
      if (routes.length === 0) {
        this.noResults = true
      }
      return routes
    } else {
      this.logger.log('lastLegs: ', lastLegs)
    }

    // For each remaining flight, attach to all possible partials
    // discard used flights from list, and break if none used
    this.logger.log('entering nested loop, flights = ', flights)
    let nextExists = true
    while (flights.length > 0 && nextExists) {
      nextExists = false
      for (let i = 0, used = false; i < flights.length; i++) {
        for (let j = 0; j < partialRoutes.length; j++) {
          let lastFlight = partialRoutes[j][partialRoutes[j].length - 1] 
          if (flights[i].offset > lastFlight.offset + lastFlight.flightTime &&
              flights[i].origin === lastFlight.desination) {
                partialRoutes[j].push(flights[i])
                used = true
                nextExists = true
          } 
        }
        if (used) {
          flights.splice(i--,1)
        }
      }
    }

    // Finally, push all complete routes (i.e. have a final leg matching destination) to return list
    for (let i = 0; i < partialRoutes.length; i++) {
        let lastFlight = partialRoutes[i][partialRoutes[i].length - 1] 
        if (lastFlight.destination === destination) {
          routes.push(partialRoutes[i])
        }
    }

    this.routes = routes
    if (routes.length === 0) {
      this.noResults = true
    }
    this.logger.log('getRoutes1 done, resulting routes: ', routes)
    return routes
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