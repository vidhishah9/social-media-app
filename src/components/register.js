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
      <div id = "RegisterPage">
        {changetoRegister && (

                <h1 id = "RegisterPageTitle"> Register Page
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
                      <input id = "RegisterButton" type="submit" value = "Register"></input>
                      <br></br>
                      <button id = "CTLButton" type="submit" onClick={setpage}>Change to Login</button>

            
                  </form>   
                </h1>         
      
        )}
      </div>

      </div>
    )
    }
  
