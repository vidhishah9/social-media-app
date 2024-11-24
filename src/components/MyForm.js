import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

import { auth } from "./firebase";

var messages = [];
export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [displaymessage, setdisplayMessage] = useState([""]);
  const [displayIds, setdisplayIds] = useState([]);
  const [idValue, setidValue] = useState('');
  
  const user = auth.currentUser;
  useEffect(() => {
    // Set up the displayUserIds listener
    socket.on('displayUserIds', (ids) => {
      setdisplayIds(ids);
    });
  
    socket.on('private', (msg) => { //receive message from server  
    socket.emit("getCustomData");
    var getEmail = ""
    socket.on("customDataResponse", (data) => {
      console.log("Received custom data from server:", data.email);
      getEmail = data.email
      msg = "From: " + getEmail + msg  
      messages.push(msg)
      setdisplayMessage((prevMessages) => [...prevMessages, msg]); // Update state properly

    });
    });
  
    // Cleanup listeners when the component unmounts
    return () => {
      socket.off('displayUserIds');
      socket.off('private');
    };
  }, []);
  
  function onSubmit(event) {

    if (user) {
      var setemail =  user.email;
      console.log("onSubmit here")
        socket.emit("sendEmail", { text: setemail }); // Send the current value to the server
    } else {
      console.log("No user is signed in.");
    }

    event.preventDefault();
    setMessage(value); // Update the message state with the current value
    socket.emit("getID", { text: idValue });
    socket.emit("sendMessage", { text: value });
    var newvalue = "You " + setemail + ": " + value 
    setdisplayMessage((prevMessages) => [...prevMessages, newvalue]); // Update state properly

  }

  return (
    <div>
      <ul>
        {displayIds.map((id, index) => (
          <button key={index} data-id={id} onClick={() => setidValue(id)}>
            {id}
          </button>
        ))}
      </ul>
      <div>
        {/* {displaymessage.length} */}
        {displaymessage.map((id, index) => (
          <p id = "Message" key={index} data-id={id}>
            {id}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>

     
      {/* <h1>{displaymessage}</h1> */}
    </div>
  );
}

