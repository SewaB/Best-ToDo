import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import firebase from 'firebase';
import moment from 'moment';
import TodoList from './todoList'

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
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }else {
        this.props.history.push('/Login')
      }})
  }

  signOut(){
   	firebase.auth().signOut()
  }

  onInputChange(e){
    this.setState({todo:e.target.value});
  }

  addToDo(e){
    e.preventDefault();
    const newList = {
      todo: this.state.todo,
      id: Date.now()
    };
    this.setState((prevState) => ({
      list: prevState.list.concat(newList),
      todo: '',
      added:moment().format('DD MMM YYYY'),
    }));
    const { uid } = this.state.user
    firebase.database().ref('List/')
    .push({ 
      todo:this.state.todo,
      addAt:moment().format('DD MMM YYYY hh:mm a'),
      user:uid,
    });
  }
  render() {
   	let show;
  	if(this.state.user){
  		show = <Button className="signout" onClick={()=>this.signOut()}> Sign out </Button>
    } 
    return (
      <div>
        <label  className="control-label">What are you gonna do now? I hope, Keep rollig,rolling,rolling!</label>
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
          <TodoList list={this.state.list} added={this.state.added} />
    		  {show}
        </div>
     </div>
    );
  }
}

export default ToDo;