import React ,{ Component } from "react";
import Select from 'react-select';
import '../bootstrap.css';

class TableTest extends Component{
    constructor() {
        super();
        this.state = {
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
        }
      }
    
      render() {
        return(
          <div class="cantainer">
             <div>
              <table  class="table">
                <tbody>
                  {this.state.answers.map((question, i) => this.tableRow(question, i))}
                </tbody>
              </table>
            </div><br/>
    
            <button onClick={this.submit}>Submit</button>
            
          </div>
        );
      }
    
    
      tableRow(question, i) {
        return(
          <tr>
            <td>{question.id}</td>
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
        return (<option value={option.value}>{option.value}</option>)
      }
    
      submit = () =>{
        //the values which you want to send into API are available here;
        //check for this, you can see all the updated values this.state.data
        console.log('data 1 -> ',this.state.answers);
        // this;
        //debugger;
      }
}

export default TableTest