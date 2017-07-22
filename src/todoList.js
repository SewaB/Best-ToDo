import React, { Component } from 'react';

class TodoList extends Component {
  render() {
  	
    return (
      <ul>
        {this.props.list.map(item => (
          <li key={item.id}>{item.todo + ". - " + this.props.added}</li>
        ))}
      </ul>
    );
  }
}

export default TodoList;