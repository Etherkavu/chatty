import React, { Component } from 'react';



class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    }
    this.onEnter = this.onEnter.bind(this);
  }


  onEnter(event){
    if (event.key === 'Enter') {
      this.props.onSubmit(event.target.value)
    }
  }



  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ this.props.currentUser.name } />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onEnter}
        />
      </footer>
    )
  }
}


export default ChatBar;