import React , {Component} from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import HeaderComponent from '../Components/HeaderComponent'
import LoginComponent from '../Components/LoginComponent'
import FooterComponent from '../Components/FooterComponent'
import '../bootstrap.css';
import WelcomeComponent from '../Components/WeclomeComponent'
import LogoutComponent from '../Components/LogoutComponent'
import ViewSurveysComponent from '../Components/ViewSurveysComponent'
import ErrorComponent from '../Components/ErrorComponent'
import CreateSurveyComponent from '../Components/CreateSurveyComponent'
import NewServeyComponent from '../Components/NewServeyComponent'
import SendSurveyComponent from '../Components/SendSurveyComponent'
import AuthenticatedRoute from '../Components/AuthenticatedComponent'
import ViewAnswers from '../Components/ViewAnswers'
import TableTest from '../Components/TableTest'

class SurveysContainerComponent extends Component{
    render(){
        return(
            <div className="surveyApp">
              <Router>
                  <HeaderComponent/>
                  <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/table" component={TableTest}/>
                    <Route path="/newSurvey/customer/:name/:custId/survey/:surveyName/:surveyId" component={NewServeyComponent}/>
                    <AuthenticatedRoute path="/welcome/:username" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <AuthenticatedRoute path="/surveys" component={ViewSurveysComponent}/>
                    <AuthenticatedRoute path="/createSurvey" component={CreateSurveyComponent}/>
                    <AuthenticatedRoute path="/sendSurvey" component={SendSurveyComponent}/>
                    <AuthenticatedRoute path="/viewAnswers/response/:responseid" component={ViewAnswers}/>
                    <Route component={ErrorComponent}/>
                  </Switch>
                  <FooterComponent/>
                  
              </Router>
             
             
             
            </div>
        )
    }
}

export default SurveysContainerComponent