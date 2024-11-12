import React, { }  from 'react';
// import { useEffect } from 'react';
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth} from "firebase/auth";
export default function Profile() {


    const [Email, setEmail] = useState("")
    const auth = getAuth();
        console.log("Useeffect")
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email;
                setEmail(email)
                console.log("Rerender1")
        
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