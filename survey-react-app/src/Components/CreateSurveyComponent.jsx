import React,{Component} from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios';

class CreateSurveyComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : 'bhuvaneshk',
            surveyId : '1',
            surveys : [],
            users :[] ,
            inputval : [],
            suggestions : [],
            usersnew : [],
            usersnew2 : []
            
        }
      this.handleChange = this.handleChange.bind(this) 
      this.handleSurvey = this.handleSurvey.bind(this)
    }
    handleChange(event){
        let searchkey = event.target.value;
        let suggestions = [];
        let usersnew2 = [];
       // let eventName = event.target.name;
      
        console.log('search key -> ' , searchkey)
        axios.get(`http://localhost:8080/todoapi/users/name/${searchkey}`)
        .then(response => {
            console.log('axios call.. ', response.data);
            const users = response.data;
            this.setState({users : users});
        })
       this.state.users.map(user => {
           console.log('uname ---> ' , user.userName);
           usersnew2 = user.userName;
            this.setState({
                usersnew2 : usersnew2
            })
       })
        console.log('Uname: ' , this.state.usersnew2);

         if(searchkey.length > 0 ){
            const regex = new RegExp(`^${searchkey}`,'i');
            suggestions = this.state.users.sort().filter(v => regex.test(v));
            this.state.users.map(user => {
                console.log('Name : ',user.userName);
                this.setState({usersnew : user.userName})
                //userAnswers: this.state.userAnswers.push(this.state.value)
                this.setState({
                    usersnew : [user.userName]
                });
                
            })
            
            }
           console.log('usersnew : ',this.state.usersnew);  
    }

    handleSurvey(event){
        const searchkey = event.target.value;
        
        let eventName = event.target.name;
        console.log('search key -> ' , searchkey , ' eventName -> ' , eventName)
        axios.get(`http://localhost:8080/todoapi/survey/name/${searchkey}`)
        .then(response => {
            console.log('axios call.. ', response.data.id);
            console.log('Id  : ', response.data.id);
            this.setState({surveys : response.data})
            console.log('surveys -> ',this.state.surveys)
        })
    }

    userchanged(event){
         let searchkey = event.target.value;
         console.log('searchKey -> ' + searchkey);
        this.setState({users: searchkey});
    }
    onSubmit(values){
       let username = 'bhuvaneshk';
       let surveyName = 'Jan Survey';
       axios.get('')
    }
    render(){
        let {userName,surveyId} = this.state  
        let {users} = this.state
        return(
            <div className="container">
                 <div>Creating Survey..!</div>
                 {/* <input type="text" onChange={this.userchanged}></input>
                 <ul>
                    { this.state.users.map(user => <li>{user.id}</li>)}
                </ul> */}
                 {/* <table className="table">
                    <thead>
                        <th>Id</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                      { 
                     
                     this.state.users.map(user => 
                        
                        <tr key={user.id}>
                            <td>{user.userName}</td>
                        </tr>
                      )
                 
                     }  
                     </tbody>
                 </table>
                 */}
               
                
                 <Formik
                         initialValues={{
                           surveys:this.state.surveys,
                           users:this.state.users
                           
                        }}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                       
                        {
                            (props) => (
                               <Form>
                                   {/* <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                   <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/> */}
                                   
                                   <fieldset className="form-group">
                                       <label>Username</label>
                                       <Field className="form-control" type="text" name="userName" onChange={this.handleChange}/>
                                       <div>
                                            <ul>
                                                { this.state.users.map(user => <li>{user.userName}</li>)}
                                            </ul>
                                       </div>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <label>SurveyId</label>
                                       <Field className="form-control" type="text" name="surveyId" onChange={this.handleSurvey}/>
                                   </fieldset>
                                   <button className="btn btn-success" type="submit">Send</button>
                               </Form>
                               
                            )
                        }
                    </Formik>

            </div>
        )
    }
}

export default CreateSurveyComponent