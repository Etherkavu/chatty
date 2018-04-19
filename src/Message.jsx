
import React, { Component } from 'react';

class Message extends Component {
  render() {
  const textcolor = this.props.colour;
    return (
      <div className="message">
        <span style={{color: textcolor}} className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    )
  }
}

export default Message;