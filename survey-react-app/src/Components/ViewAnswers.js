import React, { Component } from 'react'
import axios from 'axios'

class ViewAnswers extends Component {
    constructor(props){
        super(props)
        this.state = {
        answers : [],
        questions : {
            1 : "Question 1",
            2 : "Question 2"
        }
        }
        

    }
    componentDidMount(){
        let answers = []
     const responseId = this.props.match.params.responseid
       console.log('id given -> ' , responseId)
       axios.get('http://localhost:8080/surveyapp/responses/id/'+responseId)
       .then(response => {
           console.log('data => ' , response.data)
           answers = response.data.answers
           this.setState({answers : answers})
           console.log('answers => ',answers)
       }).catch(error =>
        console.log('error => ', error.message)
        )

    }
    goBack = () => {
        console.log('clicked back')
        this.props.history.push(`/surveys`)
    }
    render(){
        const qids = this.state.questions
        return(
            <div className = "container">
                <p>Welcome to View Answers</p>
                <table class="table">
                    <thead>
                        <th>Id</th>
                        <th>Answer</th>
                        <th>Rating</th>
                    </thead>
                { 
                this.state.answers.map(answer => 
                <tr>
                    <td>{answer.answerId}</td>
                    <td>{answer.answer}</td>
                    <td>{answer.rating}</td>
                    
                </tr>)  }
            </table>
           <button onClick onClick={() =>this.goBack()}>Back to Survey</button>
            </div>
        );
    }
}

export default ViewAnswers;