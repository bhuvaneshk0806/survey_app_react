import React,{Component} from 'react'

class WelcomeComponent extends Component {
    componentDidMount(){
        let answers = []
     const username = this.props.match.params.username
    }
    render(){
        return(
        <div className="alert alert-success">Welcome <strong>{this.props.match.params.username}</strong> to Customer Survey App.</div>
        )
    }
}

export default WelcomeComponent