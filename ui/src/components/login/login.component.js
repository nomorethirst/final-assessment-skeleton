import templateUrl from './login.template.html'

const controller =
  class LoginController {
    constructor ($log, $state, userService) {
      'ngInject'
      this.logger = $log
      this.state = $state
      this.userService = userService
      if (this.userService.isAuthenticated()) {
        this.state.go('home')
        this.logger.log('login: user already authenticated, redirecting to home')
      } else {
        this.username = ""
        this.password = ""
        this.logger.log('login is a go')
      }
    }

    login() {
      this.userService.login({username: this.username, password: this.password})
        .then(result => {
          this.state.go('profile')
        })
        .catch(error => {
          window.alert(`Invalid login for User '${this.username}' - try again, or select 'Sign Up' to create an account.`)
          this.username = ""
          this.password = ""
          document.getElementById("usr").focus()
        })
    }

  }

export const Login = {
  controller,
  templateUrl,
  controllerAs: 'login'
}