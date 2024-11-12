import React, { }  from 'react';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import Login from "./login.js"
import { useEffect } from 'react';

export default function Register() {
  // const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [changetoLogin, setchangetoLogin] = useState(false)
  const [changetoRegister, setchangetoRegister] = useState(true)

    function setpage() {
      setchangetoLogin(true)
      setchangetoRegister(false)
    }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
    .then((userCredential) => {
      alert("Succesfully registered, redirecting to login page")
      setchangetoRegister(false)
      setchangetoLogin(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

      }

    return (
      <div>
      <div>
        {changetoLogin && (
              <Login></Login>
        )}
      </div>
      <div>
        {changetoRegister && (

                    <form onSubmit={handleSubmit}>
                    <button type="submit" onClick={setpage}>Change to Login</button>
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
                      <input type="submit" value = "Register"></input>
            
                  </form>            
      
        )}
      </div>

      </div>
    )
    }
  
