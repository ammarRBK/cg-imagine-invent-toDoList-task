import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServerAPI from '../apis/ServerAPI';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  afterAuthUser(){
    this.props.inOrOut= false;
    this.props.history.push('/Tasks');
  };

  handleSubmit(event){
    event.preventDefault();
    const user={
      username: this.state.username,
      password: this.state.password
    };
    user.username && user.password? 
    axios.post(ServerAPI.url + 'users/signin', user)
      .then( response =>{
        console.log(response.data);
        response.data === "user authintecated" ? 
         this.afterAuthUser() : 
        console.error("cannot login");
        
      })
      .catch(err =>{
        console.error(err);
      })
      : alert("please fillout your information");
  }

  render() {
    return (
      <div class="container">
       <form onSubmit={this.handleSubmit}>
         <div className="form-group">
          <label> Username: </label>
          <input type="text" className="form-control" name="username" 
          value={this.state.username} placeholder="Enter your username"
          onChange={this.handleChange} required/>
         </div>
         <div className="form-group">
          <label> Password: </label>
          <input type="password" className="form-control" name="password" 
          value={this.state.password} placeholder="Enter your password" 
          onChange={this.handleChange} required/>
         </div>
         <button type="submit" className="btn btn-default">Submit Login</button>
       </form>
      </div>
    );
  }
}

export default Login;