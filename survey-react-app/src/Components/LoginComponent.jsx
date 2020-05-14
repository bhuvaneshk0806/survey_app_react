import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
class LoginComponent extends Component {
    constructor(props){
        super(props);
       
            this.state = {
                username : 'bhuvaneshk',
                password : '',
                loginSuccess : false,
                loginFailed : false
            
        }
     this.handleChange = this.handleChange.bind(this)
     this.loginHandler = this.loginHandler.bind(this);
    }
    handleChange(event){
       // console.log('handle change clicked!')
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginHandler(){
        console.log('login handler clicked!')
        if(this.state.username === 'bhuvaneshk' && this.state.password === 'password'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
            this.props.history.push(`/welcome/${this.state.username}`) 
            this.setState({loginSuccess : true}) 
            this.setState({loginFailed : false})
        }else{
            console.log('login failed');
            this.setState({loginSuccess : false})
            this.setState({loginFailed : true})
        }
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                {this.state.loginFailed && <div className="alert alert-danger">Invalid Credentials..! Please try again</div>}
                {this.state.loginFailed && <div>Login Success</div>}
                <div className="container">
                    <table className="table">
                        <tr>
                        <label for="username">Username:</label>
                            <td>
                            <input type="text" name="username" 
                                    placeholder="Enter User Name" 
                                   value={this.state.username} 
                                    onChange={this.handleChange}
                                    class="form-control"/> <br/>
                            </td>
                        </tr>
                        <tr>
                        <label for="pwd">Password:</label>
                            <td>
                            <input type="password" name="password"
                                    placeholder="Enter Password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    class="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                            <button className="btn btn-success" onClick={this.loginHandler}>Sign In</button>
                            </td>
                        </tr>
                    </table>
                    
                </div> 
                
            </div>
        );
    }
}

export default LoginComponent 
