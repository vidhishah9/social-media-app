import React, { }  from 'react';
// import { useEffect } from 'react';
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth} from "firebase/auth";
// import {MyForm} from "./MyForm.js";
import { socket } from '../socket';

export function Profile() {
    const [Email, setEmail] = useState("")
    const auth = getAuth();
        console.log("Useeffect")
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email;
                setEmail(email)
                // socket.on("connect", () => {
                //   socket.emit("sendEmail", { text: Email }); // Send the current value to the server
                // });    
          
        
            } 
            });   

          return (
      
            <div>

            <h1>Your Chat</h1>
            <p>{Email}</p>
            </div>
          )
    
      
}
//rendering proces works by first starting with return, then going back to useffect, then calling return again due to state change