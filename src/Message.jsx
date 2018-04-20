
import React, { Component } from 'react';

{/* Basic message structure */}
class Message extends Component {
  render() {
  const colour= this.props.colour;
    return (
      <div className="message">
        <span style={{color:colour}} className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    )
  }
}

export default Message;