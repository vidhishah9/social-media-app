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
  const [displayEmails, setdisplayEmails] = useState([]);
  const [showMessage, setshowMessage] = useState(false)
  const [idValue, setidValue] = useState('');
  const user = auth.currentUser;
  useEffect(() => {
    socket.on('displayUserIds', (ids) => {
      setdisplayIds(ids);
    });
  
    socket.on('displayEmails', (emails) => {
      setdisplayEmails(emails);
    });
    socket.on('private', (msg) => { //receive message from server  
    msg = "From: " + msg.email + " " + msg.text 
    messages.push(msg)
    setdisplayMessage((prevMessages) => [...prevMessages, msg]); // Update state properly

  
    });
    socket.on("sendEmailToClient", (data)=> {
      console.log(data);
    })
  
    // Cleanup listeners when the component unmounts
    return () => {
      socket.off('displayUserIds');
      socket.off('displayEmails');
      socket.off('private');
    };
  }, []);
  
  function onSubmit(event) {
    if (user) {
    } else {
      console.log("No user is signed in.");
    }
    event.preventDefault();
    setMessage(value); // Update the message state with the current value
    socket.emit("getID", { text: idValue });
    socket.emit("sendMessage", { text: value, email: user.email });
    var newvalue = "You " + user.email + ": " + value 
    setdisplayMessage((prevMessages) => [...prevMessages, newvalue]); // Update state properly
    var setemail =  user.email;
    socket.emit("sendEmail", { text: setemail });
  }

  return (
    <div>
      <ul>
        {displayIds.map((id, index) => (
          <button key={index} data-id={id} onClick={() => {setidValue(id); setshowMessage(true)}}>
            {displayEmails[index]}
          </button>
        ))}
      </ul>
      {showMessage && (
      <div>
        {displaymessage.map((id, index) => (
          <p id = "Message" key={index} data-id={id}>
            {id}
          </p>
        ))}
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />
        <button type="submit" disabled={isLoading}>Submit</button>
      </form>
      </div>
      )}

          <button type = "submit" onClick={() =>  setshowMessage(false)}>
            Exit
          </button>
     
    </div>
  );
}

