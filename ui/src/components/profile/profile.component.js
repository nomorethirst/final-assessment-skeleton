import templateUrl from './profile.template.html'

const controller =
  class ProfileController {
    constructor ($log, $state, userService) {
      'ngInject'
      this.logger = $log
      this.state = $state
      this.userService = userService
      if (this.userService.isAuthenticated()) {
        this.username = this.userService.user.credentials.username
        this.password = this.userService.user.credentials.password
        this.email = this.userService.user.profile.email
        this.firstName =  this.userService.user.profile.firstName
        this.lastName =  this.userService.user.profile.lastName
        this.phone =  this.userService.user.profile.phone
        this.logger.log('profile is a go')
      } else {
        this.state.go('home')
        this.logger.log('profile: user not authenticated, redirecting to home')
      }
    }

    updateProfile() {
      this.userService.patchUser({
          credentials: {
            username: this.username, 
            password: this.password
          }
        },{
          profile: {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
          }
        }
      )
      .then(result => {
        window.alert('Profile updated successfully.')
      })
      .catch(error => {
        window.alert('Error updating profile.')
      })
    }

    deleteAccount() {
      this.userService.deleteUser()
        .then(result => {
          window.alert('Account deleted successfully.')
          this.state.go('home')
        })
        .catch(error => {
          window.alert('Error deleting account.')
        })
    }

  }

export const Profile = {
  controller,
  templateUrl,
  controllerAs: 'profile'
}
