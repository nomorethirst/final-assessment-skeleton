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
    const searchState = {
      name: 'search',
      url: '/search',
      component: 'search',
      resolve: {
        flights: /** @ngInject */ flightService => flightService.getFlights()
      }
    }
    const bookingsState = {
      name: 'bookings',
      url: '/bookings',
      component: 'bookings',
    }
    const routeMapState = {
      name: 'routeMap',
      url: '/routeMap',
      component: 'routeMap',
      params: {
        route: null
      }
    }

    $locationProvider.html5Mode(true)

    $urlRouterProvider.otherwise('/')

    $stateProvider.state(homeState)
    $stateProvider.state(loginState)
    $stateProvider.state(signupState)
    $stateProvider.state(profileState)
    $stateProvider.state(flightsState)
    $stateProvider.state(searchState)
    $stateProvider.state(bookingsState)
    $stateProvider.state(routeMapState)
}
