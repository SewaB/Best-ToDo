import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from 'react-bootstrap'

const provider = new firebase.auth.GoogleAuthProvider();

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      user: null,
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) { 
        this.props.history.push('/ToDo')
      } 
          
    });
  }

  loginWithGoogle(){
   firebase.auth().signInWithRedirect(provider);
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onClickLogin = (e) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then()
      .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
      
  }

  onEnterPassword = (e) => {
    if (e.key === 'Enter') {
      this.onClickLogin()
    }
  }

  onEnterEmail = (e) => {
    if (e.key === 'Enter') {
      this.refs.password.focus()
    }
  }

  render() {
    return (
      <div>
      <div className="search-bar">
        <input 
          placeholder=" email"
          type="text" 
          onChange={()=>this.onChangeEmail()} 
          value={this.state.email} 
          onKeyPress={()=>this.onEnterEmail()}
        />
        <br/>
        <input 
          placeholder=" password"
          type="text" 
          ref='password'
          onChange={()=>this.onChangePasswor()} 
          value={this.state.password} 
          onKeyPress={()=>this.onEnterPassword()}
        />
        <br/>
        </div>
        <div>
        <Button className="btn" onClick={()=> this.onClickLogin()}>Login</Button> 
        <Button className="btn" onClick={()=>this.loginWithGoogle()}>Sync with Google Account</Button>
      </div>
      </div>
    )
  }
}

export default Login;
