import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
  const Messages = this.props.messages.map( messages => {
     return <Message
        key={ messages.id }
        username={ messages.username }
        content={ messages.content }
        colour= {this.props.colour} />
    });

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p href="/" className="user-counter"> {this.props.count} Users online</p>
        </nav>
        <main className="messages">
          <section className="posts">
            { Messages }
          </section>
        </main>
      </div>
    )
  }
}

export default MessageList;

