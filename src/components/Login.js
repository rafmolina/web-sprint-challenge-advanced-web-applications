import React, { useEffect } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth'

class Login extends React.Component {

    state = {
      credentials: {
        username: "",
        password: "",
      }
    };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      }
    });
  };


   login = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post("api/login", this.state.credentials)
    .then((res) => {
      // console.log(res)
      localStorage.setItem("token" , res.data.payload);
      this.props.history.push("/protected")
    })
    .catch((err) => {
      console.log(err, "alert")
    })
  };



  render() {
  return (
    <div className="App">
    <form onSubmit={this.login}>
      <input 
      type="text"
      name="username"
      placeholder="username"
      value={this.state.credentials.username}
      onChange={this.handleChange} 
      />
      <input 
      type="password"
      name="password"
      placeholder="password"
      value={this.state.credentials.password}
      onChange={this.handleChange} 
      />
      <button>Log In</button>
    </form>
    </div>
  );
  }
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.