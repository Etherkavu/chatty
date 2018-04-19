import React, {Component} from 'react';


import Footer from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


require('../styles/application.scss');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id : "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
      ]
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: this.state.messages.length+1, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  onSubmit(newSubmit) {
      const newMessage = {id: this.state.messages.length+1, username: this.state.currentUser.name, content: newSubmit};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <Footer currentUser={ this.state.currentUser } onSubmit={ this.onSubmit } />
      </div>
    );
  }
}
export default App;