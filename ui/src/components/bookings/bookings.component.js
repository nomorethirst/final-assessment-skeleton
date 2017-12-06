import templateUrl from './bookings.template.html'

const controller = class BookingsController {
  constructor($log, userService, $state) {
    'ngInject'
    this.logger = $log
    this.userService = userService
    this.state = $state
    this.bookings = userService.user.bookings
    this.logger.log('bookings is a go')

  }

  viewMap(booking) {
    let route = booking.flights
    this.logger.log('bookings.viewMap, route = ', route)
    this.state.go('routeMap', {route: route})
  }

  // get bookings() {
  //   return this.userService.user.bookings
  // }


}

export const Bookings = {
  controller,
  templateUrl,
  controllerAs: 'bookings',
  // bindings: {
  //   bookings: '='
  // }
}