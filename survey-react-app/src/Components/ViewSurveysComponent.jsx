import React, {Component} from 'react'
import axios from 'axios';
import moment from 'moment';
import '../bootstrap.css';

class ViewSurveysComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            surveys : [
                {survey_response_id :1,customer : 'Bhuvanesh' , survey_date : '24Feb',organization:'Nous Info'},
                {survey_response_id :2,customer : 'Amith' , survey_date : '24Feb',organization:'Nous Info'},
                {survey_response_id :3,customer : 'Yateesh' , survey_date : '24Feb',organization:'Nous Info'},
                {survey_response_id :4,customer : 'Chandru' , survey_date : '24Feb',organization:'Nous Info'}
            ],
            text2 : [],
            surveyId : '',
            suggestionForSurveys : [],
            surveys2 : [] ,
            keyval : [],
            objkeyval : {},
            answers : []
        }
    }

    showAnswers(id){
        console.log('id -> ', id);
       
       this.props.history.push(`/viewAnswers/response/${id}`)
       // this.props.history.push("/viewAnswers", { ...answers })
       // this.props.history.push(`/welcome/${this.state.username}`) 

       
    }

    handleChangeForSurvey = (event) => {
        const val = event.target.value;
        //const name = event.target.name;
        let suggestionForSurvey = [];
        let selectedSurvey = [];
        let selectedSurvey2 = [];
        var objkeyval = {};
        console.log('val : ' , val);
        let key = ''
        let valu = ''
        const regex = new RegExp(`^${val}`,'i');
        console.log('inside onchange()...',val.length)
        if(val.length > 0 ){
            this.state.customers = ''
              const surveyId = '' 
               axios.get('http://localhost:8080/surveyapp/surveys/like/'+val)
                .then(response => {
//debugger;
                    response.data.forEach(item => {
                        selectedSurvey.push(item.title);
                        objkeyval[item.title] = item.surveyId
                        key = item.title
                        valu = item.surveyId
                       this.setState({
                        key : valu
                       });
                       this.setState({objkeyval,objkeyval});
                    })
                    this.testAyncSurvey(selectedSurvey,val,suggestionForSurvey,regex);
                    // })
                   console.log('array val -> ' , selectedSurvey)
                })
                
        }
    }

    testAyncSurvey(selectedSurvey,val,suggestionForSurveys,regex){
       
      
        console.log('customers2',this.state.customers)
                    suggestionForSurveys = selectedSurvey.sort().filter(v => regex.test(v));
                    console.log('suggestionForCust : ' , suggestionForSurveys);
                   this.setState({suggestionForSurveys, text2: val});
                   console.log('selectedSurvey ', selectedSurvey);
                                    
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
    suggestionsSelected2(value) {
        console.log('suggestionsSelected.value',value);
        this.setState(() => ({
            text2 : value,
            suggestionForSurveys : [],
        }))
        const key = this.state.objkeyval;
        console.log('Key to Search -> ' , key)
        const val = key[value];
        console.log('val of key -> ', val)
        this.setState({surveyId : val})
    };

    fetchSurveyDetailsHandler = () => {
        const surveyId = this.state.surveyId;
        console.log('Clicked searc!!!  - surveyId =  ' ,  surveyId)
        axios.get('http://localhost:8080/surveyapp/response/survey/'+surveyId)
        .then(response => {
            console.log('success : ' , response.data)
            this.setState({surveys2: response.data})

        }).catch(error => {
            console.log('error : ',error.message)
        })
    }
    render(){
        const { text2} = this.state
        return(
            <div>Surveys Component!
                <div>
                    <input type="text" value={text2} 
                           placeholder="Search Servey Here"
                           onChange={this.handleChangeForSurvey} 
                           name="surveyId" autoComplete="off">

                    </input>
                    {this.renderSuggestions2()}
                    <button onClick={this.fetchSurveyDetailsHandler}>Search</button>
                </div>
               <div className="container">
                   <table class="table">
                       <thead>
                           <th>Response Id</th>
                           <th>Customer Name</th>
                           <th>Email</th>
                           <th>Organization</th>
                           <th>Project</th>
                           {/* <th>Date Of Survey</th> */}
                       </thead>
                       <tbody>
                           {/* {
                               this.state.surveys.map(survry => 
                                    <tr>
                                        <td>{survry.survey_response_id}</td>
                                        <td>{survry.customer}</td>
                                        <td>{survry.survey_date}</td>
                                        <td>{survry.organization}</td>
                                        <td><button className="btn btn-success" onClick={() =>this.showSurvey(survry.survey_response_id)}>Show</button></td>
                                    </tr>
                                )
                           } */}
                           {
                               this.state.surveys2.map(survey => 
                                <tr>
                                <td>{survey.surveyResponseId}</td>
                                <td>{survey.customer.name}</td>
                                <td>{survey.customer.email}</td>
                                <td>{survey.customer.organization}</td>
                                <td>{survey.customer.project}</td>
                                {/* <td>{moment(survey.customer.dateOfFeedback).format('YYYY-MM-DD')}</td> */}
                                {/* <td>{survey.name}</td>
                                <td>{survey.email}</td>
                                <td>{survey.organization}</td>
                                <td>{survey.organization}</td> */}
                                <td><button className="btn btn-success" onClick={() =>this.showAnswers(survey.surveyResponseId)}>Show</button></td> 
                                </tr> 
                               )
                           }
                          
                       </tbody>
                   </table>
               </div>

            </div>
        )
    }
}

export default ViewSurveysComponent