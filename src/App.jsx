import React, {Component} from 'react';


import Footer from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


require('../styles/application.scss');

function colourpicker(){
  const colours = ['#2E8B57','#556B2F' ,'#808000' ,'#6B8E23']
  const num = Math.floor(Math.random() * 3);
  return colours[num];
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0,
      nameColour: colourpicker()

    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', event => {
      const messageObject = JSON.parse(event.data);
      if (messageObject.messageType === 'message') {
        this.setState({
          messages: this.state.messages.concat(messageObject),
        })
      } else if (messageObject.messageType === 'notification') {
        const newName = messageObject.content
        messageObject.content =
          <div className="notification">
          <span className="notification-content"> { this.state.currentUser.name } has changed their name to: { messageObject.content }</span>
        </div>
        messageObject.username = ''
        this.setState({
          messages: this.state.messages.concat(messageObject),
        })
      } else if (messageObject.messageType === 'userCount') {
        this.setState({
          userCount: messageObject.count
        })
      }
    })
  }

  sendMessage(content) {
    const messageObject = {
      content,
    };
    this.socket.send(JSON.stringify(messageObject));
  }

  onSubmit(newSubmit, user, type) {
    const newMessage = {type: type, username: this.state.currentUser.name, content: newSubmit, colour: this.state.nameColour};
    const messages = this.state.messages.concat(newMessage)
    console.log(newMessage)
    this.sendMessage(newMessage)
    if (type === 'notification'){
      this.setState({
        currentUser: {name: newSubmit},
      })
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } count={ this.state.userCount} />
        <Footer currentUser={ this.state.currentUser } onSubmit={ this.onSubmit } />
      </div>
    );
  }
}

export default App;