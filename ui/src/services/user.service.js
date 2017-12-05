export class UserService {
    user = null

    constructor ($log, $http, apiUrl) {
        'ngInject'
        this.logger = $log
        this.http = $http
        this.baseUrl = apiUrl
        this.restoreState()
        this.logger.log('userService is a go')
        }

    saveState() {
        let state = {
            user: this.user
        }
        this.logger.log('saving currentUserState', state)
        window.localStorage.setItem('currentUserState', JSON.stringify(state))
    }

    restoreState() {
        let state = JSON.parse(window.localStorage.getItem('currentUserState'))
        if (state) {
            this.logger.log('restoring currentUserState', state)
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

    // usernameAvailable(username) {
    //     // using localstorage as a mock server
    //     return JSON.parse(window.localStorage.getItem(username)) ? false : true
    // }

    // // takes credentials, returns userState object on success
    // authenticate(credentials) {
    //     // using localstorage as a mock server
    //     let userState = JSON.parse(window.localStorage.getItem(credentials.username))
    //     if (userState && userState.credentials.password === credentials.password) {
    //         this.logger.log(`userService.authenticate(): user '${credentials.username}' authenticated.`)
    //         return Promise.resolve(userState)
    //     } else {
    //         this.logger.log(`userService.authenticate(): invalid credentials: `, credentials)
    //         return Promise.reject()
    //     }
    // }

    // login(credentials) {
    //     return this.authenticate(credentials)
    //         .then(result => {
    //             this.credentials = result.credentials
    //             this.user = result.user
    //             this.saveState()
    //             return Promise.resolve()
    //         })
    //         .catch(error => {
    //             return Promise.reject()
    //         })
    // }

    logout() {
    this.user = null
    this.clearState()
    }

    createUser(credentials, profile) {
        return this.http.post(`${this.baseUrl}/users`, {credentials, profile})
        .then(result => {
            this.logger.log('userService.createUser result: ', result)
            this.user = result.data
            this.saveState()
            return Promise.resolve(result)
        })
        .catch(error => {
            this.logger.log('userService.createUser error: ', error)
            return Promise.reject(error)
        })
    }

    deleteUser(credentials = {credentials: this.user.credentials}) {
        this.logger.log(credentials)
        return this.http({
            method: 'POST',
            url: `${this.baseUrl}/users/@${this.user.credentials.username}`, 
            data: credentials
        })
        .then(result => {
            this.logger.log('userService.deleteUser result: ', result)
            this.logout()
            return Promise.resolve(result)
        })
        .catch(error => {
            this.logger.log('userService.deleteUser error: ', error)
            return Promise.reject(error)
        })
    }

    login(credentials) {
        return this.http({
            method: 'POST',
            url: `${this.baseUrl}/users/@${credentials.credentials.username}/login`, 
            data: credentials
        })
        .then(result => {
            this.logger.log('userService.login result: ', result)
            this.user = result.data
            this.saveState()
            return Promise.resolve(result)
        })
        .catch(error => {
            this.logger.log('userService.login error: ', error)
            return Promise.reject(error)
        })
    }

    patchUser(credentials = this.this.user.credentials, profile) {
        return this.http.patch(`${this.baseUrl}/users/@${this.user.username}`, {credentials, profile})
        .then(result => {
            this.logger.log('userService.patchUser result: ', result)
            this.user = result.data
            this.saveState()
            return Promise.resolve(result)
        })
        .catch(error => {
            this.logger.log('userService.patchUser error: ', error)
            return Promise.reject(error)
        })
        // this.user = {
        //     username: this.credentials.username,
        //     profile
        // }
        // // using localstorage as mock server
        // let state = {
        //     credentials: this.credentials,
        //     user: this.user
        // }
        // this.logger.log(`userService.patchUser: updating profile for user '${credentials.username}'`)
        // window.localStorage.removeItem(credentials.username)
        // window.localStorage.setItem(credentials.username, JSON.stringify(state))

        // this.logger.log('userService.patchUser result: ', this.user)
        // this.saveState()
        // return Promise.resolve()
    }


}