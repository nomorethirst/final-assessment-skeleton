export class UserService {
    user = null
    credentials = null

    constructor ($log, $http) {
        'ngInject'
        this.logger = $log
        this.http = $http
        this.restoreState()
        this.logger.log('userService is a go')
        }

    saveState() {
        let state = {
            credentials: this.credentials,
            user: this.user
        }
        this.logger.log('saving currentUserState', state)
        window.localStorage.setItem('currentUserState', JSON.stringify(state))
    }

    restoreState() {
        let state = JSON.parse(window.localStorage.getItem('currentUserState'))
        if (state) {
            this.logger.log('restoring currentUserState', state)
            this.credentials = state.credentials
            this.user = state.user
        }
    }

    clearState() {
        this.logger.log('clearing currentUserState')
        window.localStorage.removeItem('currentUserState')
    }

    isAuthenticated() {
        return this.user !== null
    }

    usernameAvailable(username) {
        // using localstorage as a mock server
        return JSON.parse(window.localStorage.getItem(username)) ? false : true
    }

    // takes credentials, returns userState object on success
    authenticate(credentials) {
        // using localstorage as a mock server
        let userState = JSON.parse(window.localStorage.getItem(credentials.username))
        if (userState && userState.credentials.password === credentials.password) {
            this.logger.log(`userService.authenticate(): user '${credentials.username}' authenticated.`)
            return Promise.resolve(userState)
        } else {
            this.logger.log(`userService.authenticate(): invalid credentials: `, credentials)
            return Promise.reject()
        }
    }

    login(credentials) {
        return this.authenticate(credentials)
            .then(result => {
                this.credentials = result.credentials
                this.user = result.user
                this.saveState()
                return Promise.resolve()
            })
            .catch(error => {
                return Promise.reject()
            })
    }

    logout() {
    this.user = null
    this.credentials = null
    this.clearState()
    }

    createUser(credentials, profile) {
        // if username available, then user doesn't exist - create one
        if (this.usernameAvailable(credentials.username)){
            this.credentials = credentials
            this.user = {
                    username: credentials.username,
                    profile
            }
            // using localstorage as mock server
            let state = {
                credentials: this.credentials,
                user: this.user
            }
            this.logger.log('creating user', state)
            window.localStorage.setItem(credentials.username, JSON.stringify(state))
            this.saveState()
            this.logger.log('userService.createUser user created: ', this.user)
            return Promise.resolve()
        } else {
            this.logger.log('userService.createUser error: username already exists.')
            return Promise.reject()
        }
    }

    deleteUser(credentials = this.credentials) {
        return this.authenticate(credentials)
            .then(result => {
                // using localstorage as a mock server
                this.logger.log(`userService.deleteUser: deleting user '${credentials.username}'`)
                window.localStorage.removeItem(credentials.username)
                this.logger.log('userService.deleteUser result: ', result)
                this.logout()
                return Promise.resolve(result)
            })
            .catch(error => {
                this.logger.log('userService.deleteUser error: ', error)
                return Promise.reject(error)
            })
    }

    patchUser(credentials = this.credentials, profile) {
        this.user = {
            username: this.credentials.username,
            profile
        }
        // using localstorage as mock server
        let state = {
            credentials: this.credentials,
            user: this.user
        }
        this.logger.log(`userService.patchUser: updating profile for user '${credentials.username}'`)
        window.localStorage.removeItem(credentials.username)
        window.localStorage.setItem(credentials.username, JSON.stringify(state))

        this.logger.log('userService.patchUser result: ', this.user)
        this.saveState()
        return Promise.resolve()
    }


}