import templateUrl from './signup.template.html'
import { setTimeout } from 'timers';

const controller =
  class SignupController {
    constructor ($log, $state, userService) {
      'ngInject'
      this.logger = $log
      this.state = $state
      this.userService = userService
      if (this.userService.isAuthenticated()) {
        this.state.go('home')
        this.logger.log('signup: user already authenticated, redirecting to home')
      } else {
        this.username = ""
        this.password = ""
        this.email = ""
        this.firstName = ""
        this.lastName = ""
        this.phone = ""
        this.logger.log('signup is a go')
      }
    }

    signup() {
      this.userService.createUser({
          username: this.username, 
          password: this.password
        },{
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone
        })
      .then(() => {
        window.alert('Sign up successful - navigating to profile!')
        this.state.go('profile')
      })
      .catch(() => {
        window.alert(`Error creating account for User '${this.username}' - please try again later.`)
        this.username = ""
        this.password = ""
        this.email = ""
        this.firstName = ""
        this.lastName = ""
        this.phone = ""
        document.getElementById("usr").focus()
      })
    }

  }

export const Signup = {
  controller,
  templateUrl,
  controllerAs: 'signup'
}
