import templateUrl from './home.template.html'

const controller = class HomeController {
  constructor($log, flightService) {
    'ngInject'
    this.logger = $log
    this.logger.log('home is a go')
  }
}

export const Home = {
  controller,
  templateUrl,
  controllerAs: 'home'
}