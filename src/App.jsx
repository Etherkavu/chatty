import React, {Component} from 'react';


import Footer from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


require('../styles/application.scss');

{/* Function called to assign a random colour to this session*/}

function colourpicker(){
  const colours = ['#2E8B57','#556B2F' ,'#808000' ,'#8FBC8F']
  const num = Math.floor(Math.random() * 3);
  return colours[num];
}

class App extends Component {
  constructor(props) {
    super(props);

{/* States:
      currentUser: can be set by the user freely, a notice will be published of     whom changed to what.
      messages: the collection of posts to be displayed.
      userCount: variable calculated on the server and sent to client.
      nameColour: random green colour for the users name, name coours are consistent between chat clients.
  */}

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0,
      nameColour: colourpicker()

    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

  {/* Connects to websocket */}

    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('message', event => {
      const messageObject = JSON.parse(event.data);

  {/* Main logic if
      if circut will check which type of message is being sent and handle properly.
    */}

      if (messageObject.messageType === 'message') {
        this.setState({
          messages: this.state.messages.concat(messageObject),
        })
      } else if (messageObject.messageType === 'notification') {
        const newName = messageObject.content
        messageObject.content =
          <div className="notification">
          <span className="notification-content"> { messageObject.username } has changed their name to: { messageObject.content }</span>
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

  {/* Sends object as a readable JSON string to server */}

    const messageObject = {
      content,
    };
    this.socket.send(JSON.stringify(messageObject));
  }


  onSubmit(newSubmit, user, type) {

  {/* Formats submitted info into single object*/}

    const newMessage = {type: type, username: this.state.currentUser.name, content: newSubmit, colour: this.state.nameColour};
    const messages = this.state.messages.concat(newMessage)
    this.sendMessage(newMessage)

    {/* Updates local user state is needed*/}

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