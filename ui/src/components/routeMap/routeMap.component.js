import templateUrl from './routeMap.template.html'

const controller = class RouteMapController {
  zoom = 6
  center = [35.5175, -86.5804]
  markers = []
  paths = []
  colors = ['aqua', 'blueviolet', 'fuschia', 'darkblue', 'firebrick', 'red']
  constructor($log, $stateParams, mapService, locations) {
    'ngInject'
    this.logger = $log
    this.route = $stateParams.route
    this.totalFlight = 0
    this.totalLayover = 0
    this.setTotals()
    this.logger.log('routeMap.route = ', this.route)

    // map stuff
    this.mapService = mapService
    // add markers from an angular constant
    const { memphis, nashville, knoxville, chattanooga } = locations
    const markers = [memphis, nashville, knoxville, chattanooga]

    markers.forEach(marker => this.addMarker(marker))

    // add paths manually
    const paths = [
      [memphis, nashville, 'aqua'],
      [nashville, knoxville, 'blueviolet']
      // [memphis, nashville, '#CC0099'],
      // [nashville, knoxville, '#AA1100']
    ]

    paths.forEach(args => this.addPath(...args))

    this.logger.log('routeMap is a go')
  }

  addMarker ({ latitude, longitude }) {
    this.markers.push({
      position: `[${latitude}, ${longitude}]`
    })
  }

  addPath (a, b, color) {
    this.paths.push({
      path: `[[${a.latitude}, ${a.longitude}], [${b.latitude}, ${b.longitude}]]`,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true
    })
  }

  setPaths() {
    for (let i = 0; i < this.route.length; i++) {
      this.addPath(this.route[i].origin, this.route[i].destination, this.colors[i])
    }
  }

  setTotals() {
    if (this.route.length === 1) {
      this.totalFlight = this.route[0].flightTime
      this.totalLayover = 0
      return
    }
    //flights must be sorted by offset !!!
    let flights = this.route.sort( (a,b) => a.offset - b.offset)
    let total = 0
    let layover = 0
    let lastArrivalTime = flights[0].offset + flights[0].flightTime
    for (let flight of flights) {
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