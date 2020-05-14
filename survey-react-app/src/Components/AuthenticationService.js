import axios from 'axios'
class AuthenticationService{
    registerSuccessfulLogin(username,password){
      //  let basicAuthHeader = 'Basic ' + window.btoa(username +":" + password)
        console.log('registered success')
        sessionStorage.setItem('authenticatedUser',username);
       // this.setupAxiosInterceptors(basicAuthHeader)

    }
    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')  
        if(user === null) return false
        return true
    }
}

export default new AuthenticationService()
