import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from 'react-bootstrap';

class Registration extends Component {
	constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user:''
    }
  }
  
 componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) { 
        this.props.history.push('/ToDo')
      } 
      console.log(user)
   });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onClickSave = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then()
    .catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    })
  }

  onEnterPassword = (e) => {
    if (e.key === 'Enter') {
      this.onClickSave()
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
          onChange={this.onChangeEmail} 
          value={this.state.email} 
          onKeyPress={this.onEnterEmail}
        />
        <br/>
        <input 
          placeholder=" password"
          type="text" 
          ref='password'
          onChange={this.onChangePassword} 
          value={this.state.password} 
          onKeyPress={this.onEnterPassword}
        />
        </div>
        <div>
        <Button onClick={()=>this.onClickSave()}>Make an Account</Button>
        </div>
      
      </div>
    )
  }
}
export default Registration;

 

  