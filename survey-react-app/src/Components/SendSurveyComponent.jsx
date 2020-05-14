import React from 'react';
import { Component } from 'react';
import './SendSurveyComponent.css'
import axios from 'axios';


class SendSurveyComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            usernames : ['Amith','Bhuvanesh','Bharath','Chetan','Chandru','Chandil','Sharath','Sv'],
            surveys : ['Tuyya','Muyya','Puyya','Kuyya'],
            customers : [],
            showCust : false,
            suggestionForCust : [],
            suggestionForSurveys : [],
            text1 : [],
            text2 : [],
            showSurvey : true
           
        }
    }
    handleChangeForCust = (event) => {
        const val = event.target.value;
        //const name = event.target.name;
        let suggestionForCust = [];
        let selectedEmployee = [];
        console.log('val : ' , val);
        const regex = new RegExp(`^${val}`,'i');
        console.log('inside onchange()...',val.length)
        if(val.length >= 0 ){
            this.state.customers = ''
               
               axios.get('http://localhost:8080/surveyapp/customer/like/'+val)
                .then(response => {
//debugger;
                    response.data.forEach(item => {
                        selectedEmployee.push(item.name);
                    })
                    this.testAync(selectedEmployee,val,suggestionForCust,regex);
                    // })
                   console.log('array val -> ' , selectedEmployee)
                })
                
        }
    }

    handleChangeForSurvey = (event) => {
        const val = event.target.value;
        //const name = event.target.name;
        let suggestionForSurvey = [];
        let selectedSurvey = [];
        console.log('val : ' , val);
        const regex = new RegExp(`^${val}`,'i');
        console.log('inside onchange()...',val.length)
        if(val.length > 0 ){
            this.state.customers = ''
               
               axios.get('http://localhost:8080/surveyapp//surveys/like/'+val)
                .then(response => {
//debugger;
                    response.data.forEach(item => {
                        selectedSurvey.push(item.title);
                    })
                    this.testAyncSurvey(selectedSurvey,val,suggestionForSurvey,regex);
                    // })
                   console.log('array val -> ' , selectedSurvey)
                })
                
        }
    }

    testAync(selectedEmployee,val,suggestionForCust,regex){

    console.log('customers2',this.state.customers)
                suggestionForCust = selectedEmployee.sort().filter(v => regex.test(v));
                console.log('suggestionForCust : ' , suggestionForCust)
                this.setState({suggestionForCust, text1: val});
}


testAyncSurvey(selectedEmployee,val,suggestionForSurveys,regex){

    console.log('customers2',this.state.customers)
                suggestionForSurveys = selectedEmployee.sort().filter(v => regex.test(v));
                console.log('suggestionForCust : ' , suggestionForSurveys)
                this.setState({suggestionForSurveys, text2: val});
}
   

    renderSuggestions(){
        const { suggestionForCust } = this.state;
        if(suggestionForCust.length === 0){
            return null;
        }
        return(
            <ul> 
                {suggestionForCust.map((item) => <li onClick={() => this.suggestionsSelected(item)}>{item}</li>)}
            </ul>
        )
    }
    renderSuggestions2(){
        const { suggestionForSurveys } = this.state;
        if(suggestionForSurveys.length === 0){
            return null;
        }
        return(
            <ul> 
                {suggestionForSurveys.map((item) => <li onClick={() => this.suggestionsSelected2(item)}>{item}</li>)}
            </ul>
        )
    }

    suggestionsSelected(value) {
        console.log('suggestionsSelected.value',value);
        this.setState(() => ({
            text1 : value,
            suggestionForCust : [],
        }))
    }
    suggestionsSelected2(value) {
        console.log('suggestionsSelected.value',value);
        this.setState(() => ({
            text2 : value,
            suggestionForSurveys : [],
        }))
    }

    callingApi = () => {
        const surveyName = this.state.text2
        const custName = this.state.text1
        console.log('calling api - params are : ' , this.state.text2 , this.state.text1);
        axios.get('http://localhost:8080/surveyapp/sendEmail/surveyName/'+surveyName+'/customer/'+custName)
        .then(response => {
            console.log(response.data)
        })
        this.setState({showSurvey : false})
    }

    
    
    render(){
        
        const { text1} = this.state
        const { text2} = this.state
        return(
           <div>
               {this.state.showSurvey && <div>
                        <label>User Id</label>
                        <div className="SendSurveyComponent">
                            <input value={text1} type="text" onChange={this.handleChangeForCust} name="customerId" autoComplete="off"/>
                            {this.renderSuggestions()}
                        
                        </div>
                        <label>Survey Id</label>
                        <div className="SendSurveyComponent">
                            <input value={text2} type="text" onChange={this.handleChangeForSurvey} name="surveyId" autoComplete="off"/>
                            {this.renderSuggestions2()}
                        </div>
                        <div>
                            <button className="SendButton" onClick={this.callingApi}>Send</button>
                        </div>
                    </div>}
               {!this.state.showSurvey && <div>You Have succesfully Sent Survey to customer</div>}     

           </div>
            
        )
    }
}

export default SendSurveyComponent;