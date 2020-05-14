import React,{ Component } from "react";
import './NewServeyComponent.css'
import axios from 'axios'
class NewServeyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId : '',
            surveyId : '',

            name: '', 
            message: '',
            email: '' ,
            showForm : '',
            showSurvey : '',
            surveyName : '',
            surveyResponseId : '',
           // ratings : ['No Response','Very Dissatisfied','Dissatisfied','Neutral','Satisfied','Very Satisfied'],
        
        
            answers: [
                {
                  "questionId": 1,
                  "questionType": "Overall Satisfaction",
                  "description": "Overall Interactions with Nous as a service provider"
                },
                {
                  "questionId": 2,
                  "questionType": "Technical Expertise",
                  "description": "Nous’s ability to bring in technical expertise as required"
                },
                {
                  "questionId": 3,
                  "questionType": "Scope Management",
                  "description": "Nous’s ability to deliver the project as per agreed scope "
                },
                {
                  "questionId": 4,
                  "questionType": "Change Management",
                  "description": "Ability of Nous to anticipate / manage changes to your satisfaction"
                },
                {
                  "questionId": 5,
                  "questionType": "Project / Program  Management",
                  "description": "Nous is able to ensure good visibility provided on the status of Milestones, dependencies, resourcing and manage risks"
                },
                {
                  "questionId": 6,
                  "questionType": "Schedule Adherence",
                  "description": "Adherence to agreed timelines (Turnaround time)"
                },
                {
                  "questionId": 7,
                  "questionType": "Communication",
                  "description": "Proactive, consistent communication and on time reporting"
                },
                {
                  "questionId": 8,
                  "questionType": "Escalation Management",
                  "description": "Nous’s ability to respond to escalations / timely support from senior management as required"
                },
                {
                  "questionId": 9,
                  "questionType": "Technology Skills ",
                  "description": "Technology skills of Nous personnel with whom you interacted during the engagement"
                },
                {
                  "questionId": 10,
                  "questionType": "Innovation / Value Addition",
                  "description": "Ability of Nous to add value (Innovation, proactive ideas & productivity/process improvements)"
                },
                {
                  "questionId": 11,
                  "questionType": "Others",
                  "description": "What in your opinion differentiates Nous from similar service providers?"
                },
                {
                  "questionId": 12,
                  "description": "Where does Nous need to focus to improve its services?"
                },
                {
                  "questionId": 13,
                  "description": "How likely would you recommend a friend or business associate to use our services? YES Songly Recommend/YES"
                }


                
              ],
              options: [
                {
                  "value": 1,
                  "rating": "Very Bad",
                },{
                  "value": 2,
                  "rating": "Bad",
                },{
                  "value": 3,
                  "rating": "Moderate",
                },{
                  "value": 4,
                  "rating": "Good",
                },{
                  "value": 5,
                  "rating": "Very Good",
                }
              ]
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentWillMount(){
        const custId = this.props.match.params.custId
        const surveyId = this.props.match.params.surveyId
        console.log('custId -> ', custId , ' , surveyId -> ' , surveyId)
        this.setState({customerId:custId,surveyId:surveyId})
       
      }
      tableRow(question, i) {
        return(
          <tr>
            <td>{question.questionId}</td>
            <td>{question.questionType}</td>
            <td>{question.description}</td>
            <td contenteditable='true'>
              <select onChange={e => (question.rating = e.target.value)}>
                <option disabled selected value> </option>
                {this.state.options.map((option, j) => this.optionDropdown(option, j))}
              </select>
            </td>
            <td contenteditable='true'><input onChange={e => (question.answer = e.target.value)}/></td>
          </tr>
        );
      }
    
      optionDropdown(option) {
        return (<option value={option.value}>{option.rating}</option>)
      }
    
      submit = () =>{
        //the values which you want to send into API are available here;
        //check for this, you can see all the updated values this.state.data
       const  customerId = this.state.customerId;
       const surveyId = this.state.surveyId;
        var data = {
           description : 'Some description',
            answers : this.state.answers

        }
        console.log('data 1 -> ',this.state.answers);
        console.log('data to api -> ' , data);
        axios.post(`http://localhost:8080/surveyapp/surveys/${surveyId}/customerId/${customerId}/responses`,data)
        .then(response => {
            console.log('response from post => ',response.data)
            this.setState({showSurvey : true})
            this.setState({surveyResponseId : response.data.surveyResponseId})
            
        }).catch(error => {
            console.log('error => ', error.message)
        })
        
        // this;
        //debugger;
      }
    
      handleChange(key) {
        return function (e) {
          var state = {};
          state[key] = e.target.value;
          this.setState(state);
        }.bind(this);
        
      }
      
    //   handleSubmit(event) {
    //     var data = {
    //             name: this.state.name,
    //             email: this.state.email,
    //             message: this.state.message
    //       }
    //     alert('Hello ' + data.name + ', your message is: ' + data.message);
        
    //     /* POST DATAS TO PHP HERE...
    //       var xmlhttp = new XMLHttpRequest();
    //         xmlhttp.open("POST", "form/form-submit.php", true);
    //         xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");                  
    //          xmlhttp.send(data);
    //     */
    
    //     event.preventDefault();
    //   }

      componentDidMount(){
          this.setState({showForm : true})
          console.log('cust name : ',this.props.match.params.name, ' , survey ' , this.props.match.params.surveyName);
          let name = this.props.match.params.name;
          let surveyName = this.props.match.params.surveyName;
          this.setState({name : name,surveyName : surveyName});
      }
    render() {
        const name = this.state;
        const surveyName = this.surveyName;
        const respId = this.state.surveyResponseId
        return (
            <div className="Main">
            <div className="alert alert-success">
                 <p>Hello {this.state.name} welcome to {this.state.surveyName}</p> 
            </div>
          {/* <form onSubmit={this.handleSubmit}> */}
            {!this.state.showForm && <div>You have already submitted this survey..!</div>}
        {this.state.showSurvey && <div>You Have succesfully created Survey Response : {this.state.surveyResponseId}</div>} 
           {this.state.showForm && <div class="container">
               <div className="dummy">
                   <table className="table">
                       <tr>
                           <th>Name :</th>
                           <td>{this.state.name}</td>
                       </tr>
                       <tr>
                           <th>Organization :</th>
                           <td>Nous Info</td>
                       </tr>
                       <tr>
                           <th>Date Of Survey :</th>
                           <td>13-May-2020</td>
                       </tr>
                   </table>
               </div>
              
               
                <label>
                <div style={{width:"95%",marginLeft:"15px",color:"red"}}>
                        <strong><p>Considering all the aspects of your experience with Nous, please indicate your opinion vis-à-vis the specific statements mentioned in the table below. Please use the 5-point scale and indicate your response for each statement.</p></strong>
    </div>
                </label><br/>
                <div class="cantainer">
             <div>
              <table  class="table">
                <thead>
                  <th>ID#</th>
                  <th>Question Type</th>
                  <th>Description</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </thead>
                <tbody>
                  {this.state.answers.map((question, i) => this.tableRow(question, i))}
                </tbody>
              </table>
            </div><br/>
    
            <button onClick={this.submit}>Submit</button>
            
          </div>
        );
                
               
        </div> }
           
          {/* </form> */}
          </div>
        );
    }
}

export default NewServeyComponent