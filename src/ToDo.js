import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import firebase from 'firebase';
import moment from 'moment';
import toastr from 'toastr';
import Task from './CompleteTask'

class ToDo extends Component {
  constructor(props){
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.state = {
      user:'',
      todo:'',
      list:[],
      text:'',
      added:'',
      total:'',
      key:'',
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    const {uid} = user
    firebase.database().ref('Users/' + uid).once('value')
     .then(snapshot=>{
      if(snapshot.val()){
            this.setState({
            user, 
            list:snapshot.val().list || [],
          })
        } else {
        this.setState({user})
      }})
    }else {
      this.props.history.push('/Login')
    }
   })
  }

  signOut(){
   	firebase.auth().signOut()
  }
  onInputChange(e){
    this.setState({todo:e.target.value});
  }

  addToDo(e){
    const { uid } = this.state.user;
    const newList = {
      todo: this.state.todo,
      added: moment().format('DD MMM YYYY')
    };
    let list = this.state.list.concat(newList)

    firebase.database().ref('Users/' + uid)
    .update({
      list,
    });
       
    this.setState((prevState) => ({
      list,
      todo:'',
    }));

  }

  doneTask(){ 
   toastr.success('Hell Yeah!!!')
  }
  deleteTask(){
  
   toastr.error('Hell No!!!')
  }

  addList(){
    return(
      <div className="ul">
      <ul type="none">
        {this.state.list.map((item,key) => (
          <li className="li" key={key}>
             <b>{item.added + item.todo}</b>
          <div className="done">
            <img src='/check-128.png' width="32px" height="32px" alt="pic" onClick={()=>this.doneTask()} />
            <img src='/Close-128.png' width="32px" height="32px" alt="pic" onClick={()=>this.deleteTask()}/>
            </div>  
          </li>
       ))}
      </ul>
      </div>
      )
    }

  render() {
  	let show;
    if(this.state.user){
  		show = <Button className="signout" onClick={()=>this.signOut()}> Sign out </Button>
    } 

    return (
      <div>
        <label  className="control-label">What are you gonna do now? I hope, Keep rollig,rolling,rolling!</label>
        <Task />
          <div className="input-group">
            <input 
            type="text" 
            className="form-control" 
            placeholder='For example - 200 pull-ups' 
            aria-describedby="sizing-addon2"
            value={this.state.todo}
            onChange={this.onInputChange} 
            />
            <Button className="addBtn" onClick={()=>this.addToDo()}>Add</Button>
          </div>
        <div>
          {this.addList()}
    		  {show}
      
        </div>
     </div>
    );
  }
}

export default ToDo;