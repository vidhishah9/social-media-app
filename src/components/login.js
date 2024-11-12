import React, { }  from 'react';
import { useState } from "react";
import { useEffect } from 'react';
// import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Register from "./register.js"
import {auth} from "./firebase";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Profile from './profile.js';
import Chat from './chat.js'
import { socket } from '../socket.js';

export default function Login() {
  
    const [inputs, setInputs] = useState({});
    const [showProfile, setShowProfile] = useState(false)
    const [changetoLogin, setchangetoLogin] = useState(true)
    const [changetoRegister, setchangetoRegister] = useState(false)

    function setpage() {
      setchangetoLogin(false)
      setchangetoRegister(true)
    }
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
        signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            setShowProfile(true)
            setchangetoLogin(false)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        }
   
 
        
    return (
    <div>
      <div>
        {showProfile && (
        <div>
          <Profile></Profile>
          <Chat></Chat>
          </div>
        )}

      </div>
        <div>
      {changetoRegister && (
              <Register></Register>
        )}
      </div>
        <div>
        {changetoLogin && (
                      <form onSubmit={handleSubmit}>
                      <button type="submit" onClick ={setpage}>Change to Register</button>
                      <label>Enter your email:
                      <input 
                      type="text" 
                      name="email" 
                      value={inputs.email || ""} 
                      onChange={handleChange}
                      />
                      </label>
                      <label>Enter your password:
                      <input 
                          type="text" 
                          name="password" 
                          value={inputs.password || ""} 
                          onChange={handleChange}
                      />
                      </label>
                      <input type="submit" value = "Login"></input>
          
                  </form>
          
      
        )}
      </div>
      

      </div>
    )
    }
