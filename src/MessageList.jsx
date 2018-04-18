import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
  const Messages = this.props.messages.map( messages => {
     return <Message
        key={ messages.id }
        username={ messages.username }
        content={ messages.content } />
    });

    return (
      <body>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <section className="posts">
            { Messages }
          </section>
        </main>
      </body>
    )
  }
}

export default MessageList;

