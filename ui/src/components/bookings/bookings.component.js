import templateUrl from './bookings.template.html'

const controller = class BookingsController {
  constructor($log, userService) {
    'ngInject'
    this.logger = $log
    this.userService = userService
    this.bookings = userService.user.bookings
    this.logger.log('bookings is a go')

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