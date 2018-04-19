import React, { Component } from 'react';



class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      user: '',
      userField: ''
    }
    this.contentChanger = this.contentChanger.bind(this);
    this.userChanger = this.userChanger.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.userUpdate= this.userUpdate.bind(this);
  }


  onEnter(event){
    if (event.key === 'Enter') {
      this.props.onSubmit(event.target.value, this.state.user, 'message')
      this.setState({content: ''})
    }
  }

  userUpdate(event){
    if (event.key === 'Enter') {
      this.props.onSubmit(event.target.value, this.state.user, 'notification')
      this.setState({userField: ''});
    }
  }

  userChanger(event){
    this.setState({userField: event.target.value});
  }

  contentChanger(event){
    this.setState({content: event.target.value});
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
        value= {this.state.userField}
        placeholder={ this.props.currentUser.name }
        onKeyPress={ this.userUpdate }
        onChange={ this.userChanger }
        />
        <input
          className="chatbar-message"
          value= {this.state.content}
          placeholder="Type a message and hit ENTER"
          onChange={ this.contentChanger }
          onKeyPress={ this.onEnter }
        />
      </footer>
    )
  }
}


export default ChatBar;