import templateUrl from './routeMap.template.html'

const controller = class RouteMapController {
  constructor($log, $state) {
    'ngInject'
    this.logger = $log
    this.state = $state
    this.route = this.state.params.route
    this.logger.log('routeMap, route = ', this.route)
    this.logger.log('routeMap is a go')
  }
}

export const RouteMap = {
  controller,
  templateUrl,
  controllerAs: 'routeMap'
}