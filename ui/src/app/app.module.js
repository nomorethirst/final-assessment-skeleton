import ngMap from 'ngmap'

// Constants
import apiUrl from './api.url'
import flightListInterval from './flight.list.interval'
import locations from './app.locations'

// Modules
import flightMap from '../map/map.module.js'

// Components
import appComponent from './app.component.js'
import { NavBar } from '../components/navbar/navbar.component.js'
import { Home } from '../components/home/home.component.js'
import { Login } from '../components/login/login.component.js'
import { Signup } from '../components/signup/signup.component.js'
import { Profile } from '../components/profile/profile.component.js'
import { Flights } from '../components/flights/flights.component.js'
import { Search } from '../components/search/search.component.js'
import { CitySearchInput } from '../components/citySearchInput/citySearchInput.component.js'
import { Bookings } from '../components/bookings/bookings.component.js'
import { RouteMap } from '../components/routeMap/routeMap.component.js'

// Services
import { UserService } from '../services/user.service'
import { FlightService } from '../services/flight.service'
import { MapService } from '../services/map.service'

// Config
import { config } from './app.config'
import { routing } from './app.routes'

export default
  angular
    .module('flight', [
      'ngAria',
      'ngAnimate',
      'ngMaterial',
      'ngMessages',
      'ui.router',
      'ui.mask',
      'ngMdIcons',
      'ngMap'

      // flightMap
    ])
    .constant('apiUrl', apiUrl)
    .constant('flightListInterval', flightListInterval)
    .constant('locations', locations)
    .service('userService', UserService)
    .service('flightService', FlightService)
    .service('mapService', MapService)
    .component('flightApp', appComponent)
    .component('navbar', NavBar)
    .component('home', Home)
    .component('login', Login)
    .component('signup', Signup)
    .component('profile', Profile)
    .component('flights', Flights)
    .component('search', Search)
    .component('citySearchInput', CitySearchInput)
    .component('bookings', Bookings)
    .component('routeMap', RouteMap)
    .config(config)
    .config(routing)
    .name
