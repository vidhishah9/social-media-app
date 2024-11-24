import React, { }  from 'react';
import { useState } from "react";
import { useEffect } from 'react';
// import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Register from "./register.js"
import {auth} from "./firebase";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import {Profile} from './profile';
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
        <div id =  "RegisterPage">
        {changetoLogin && (
              <h1 id = "RegisterPageTitle"> Login Page

                      <form onSubmit={handleSubmit}>
                      <label id = "LabelTtextEmail">Email:
                      <br></br>

                      <input id = "RegisterUserInput"
                      type="text" 
                      name="email" 
                      value={inputs.email || ""} 
                      onChange={handleChange}
                      />
                      </label>
                      <br></br>
                      <label id = "LabelTextPassword">Password:
                      <br></br>

                      <input id = "RegisterPassInput"
                          type="text" 
                          name="password" 
                          value={inputs.password || ""} 
                          onChange={handleChange}
                      />
                      </label>
                      <br></br>
                      <input id = "RegisterButton" type="submit" value = "Login"></input>
                    <button id = "CTLButton" type="submit" onClick ={setpage}>Change to Register</button>
        
                  </form>
                </h1>
          
      
        )}
      </div>
      

      </div>
    )
    }
