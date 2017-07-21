import React from "react";

const ErrorMessages = props => {
  let messageNodes = props.messages.map((message, index) => {
    return (
      <li key={`error-message_${index}`}>
        {message}
      </li>
    );
  });

  return (
    <ul className="error-messages">
      {messageNodes}
    </ul>
  );
};

export default ErrorMessages;