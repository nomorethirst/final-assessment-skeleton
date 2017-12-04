// Constants
import apiUrl from './api.url'

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

// Services
import { UserService } from '../services/user.service'
import { FlightService } from '../services/flight.service'

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

      flightMap
    ])
    .constant('apiUrl', apiUrl)
    .service('userService', UserService)
    .service('flightService', FlightService)
    .component('flightApp', appComponent)
    .component('navbar', NavBar)
    .component('home', Home)
    .component('login', Login)
    .component('signup', Signup)
    .component('profile', Profile)
    .component('flights', Flights)
    .config(config)
    .config(routing)
    .name
