export function routing
  ($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject'
    const homeState = {
      name: 'home',
      url: '/',
      component: 'home'
    }
    const loginState = {
      name: 'login',
      url: '/login',
      component: 'login'
    }
    const signupState = {
      name: 'signup',
      url: '/signup',
      component: 'signup'
    }
    const profileState = {
      name: 'profile',
      url: '/profile',
      component: 'profile'
    }
    const flightsState = {
      name: 'flights',
      url: '/flights',
      component: 'flights',
      resolve: {
        flights: /** @ngInject */ flightService => flightService.getFlights()
      }
    }

    $locationProvider.html5Mode(true)

    $urlRouterProvider.otherwise('/')

    $stateProvider.state(homeState)
    $stateProvider.state(loginState)
    $stateProvider.state(signupState)
    $stateProvider.state(profileState)
    $stateProvider.state(flightsState)
}
