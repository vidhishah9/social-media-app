import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/register";

export default function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path = "/" element =  {<Register />}/>
          </Routes>
        </BrowserRouter>

    </div>
  );
}






