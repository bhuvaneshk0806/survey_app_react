import React,{Component} from 'react'

class FooterComponent extends Component{
    render(){
        return(
            <div style={{marginBottom:"100px"}}>
                <hr/>
                <footer className="footer-no-nav">
                    <span className="text-muted">Rights Reserved survey@nousinfo.com</span>
                </footer>
            </div>
        )
    }
}
export default FooterComponent