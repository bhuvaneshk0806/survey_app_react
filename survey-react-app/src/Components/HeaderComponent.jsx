import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService'

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
           
            <header className="header">
                {/* <h1>Header 1</h1> */}
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <ul className="navbar-nav">
                       {isUserLoggedIn && <li className="nav-link"><Link to="/welcome">Home</Link></li> } 
                        {/* {isUserLoggedIn && <li className="nav-link"><Link to="/createSurvey">Create</Link></li> }  */}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/sendSurvey">Send</Link></li> }
                        {isUserLoggedIn &&<li className="nav-link"><Link to="/surveys">View</Link></li>}
                        {/* {!isUserLoggedIn &&<li className="nav-link"><Link to="/newSurvey">New Survey</Link></li>} */}
                        
                </ul>
                <h1 style={{color:"White",
                    paddingLeft:"200px",
                    textAlign:"Center"
                }}>Customer Experience Management (CSAT) </h1>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                       {!isUserLoggedIn && <li className="nav-link"><Link to="/login">Login</Link></li>} 
                       {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>} 
                </ul>
                </nav> *

            </header>
        )
    }
}

export default withRouter(HeaderComponent)