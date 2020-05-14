import React, { Component } from "react";
import NewServeyComponent from '../Components/NewServeyComponent'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
class NewSurveyContainerComponent extends Component{
    render(){
        return(
            <div className="newsurveyApp">
            <Router>
                <Switch>
                <Route path="/newSurvey/custName/:name/surveyName/:surveyName" component={NewServeyComponent}/>
                </Switch>
                    
            </Router>
                
            </div>
        )
    }
}

export default NewSurveyContainerComponent
