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
    {
      id : "3",
      username: "JimBob",
      content: "I found them!",
    },
  ]
    };

  }
  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <Footer currentUser={ this.state.currentUser } />
      </div>
    );
  }
}
export default App;