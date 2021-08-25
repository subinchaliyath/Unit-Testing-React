import React from 'react'
import axios from 'axios'
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            result:null,
            errMsg:''
        }
    }
    getUserDetails = async() => {
        try {
            let result = await axios.get(`https://api.github.com/users/${this.state.username}`)
            if(result){
                this.setState({result:result.data})
            }
        } catch (error) {
            this.setState({errMsg:error.data.message})
        }
    }
    render(){
        const {username,errMsg,result} =this.state
    return (
        <div className="container">
            <h2 data-test='user_heading' >{this.props.component}</h2>
            <input data-test='user_input' type="text"  className="form-control" placeholder="Enter username" value={username} onChange={(e)=>this.setState({username:e.target.value})}/>
            <button data-test='user_button' className="btn btn-primary" onClick={()=>this.getUserDetails()}>View User Details</button>
            <hr/>
            {errMsg&&<h1 data-test="user_errMsg" style={{color:'red'}}>{errMsg}</h1>}
            {result&&(
                <div data-test="user_result">
                    <h4 data-test='user_name'>Name : {result.name}</h4>
                    <img  data-test='user_image'src={result.avatar_url} alt={result.name}/>
                </div>
            )}
        </div>
    )}
}

export default User

