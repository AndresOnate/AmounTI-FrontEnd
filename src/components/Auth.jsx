import React, { useState } from "react"
import { useContext } from "react";
import { AmounTIContext } from "../AmounTIContext";
import { useNavigate } from "react-router-dom";


export default function Auth() {
    let [authMode, setAuthMode] = useState("signin");


    const navigate = useNavigate();

    const { setToken, login } = useContext(AmounTIContext);

    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    // Sign Up 
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleUserEmailChange = (event) => {
        console.log(event.target.value)
        setUserEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        console.log(event.target.value)
        setLastName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         const response = await fetch('http://localhost:8080/v1/auth', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ email, password })
         });
     
         if (response.ok) {
           const data = await response.json()
           const token = data.token;
           setToken(token);
           login();
           localStorage.setItem('isAuthenticated', true)
           localStorage.setItem('token', token)
           navigate('/home');
         } else {
           // Handle error
           // ...
         }
     };

     const handleSubmitSignUp = async (event) => {
        event.preventDefault();
         const response = await fetch('http://localhost:8080/v1/users', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({name, lastName, email, password })
         });
     
         if (response.ok) {
           const data = await response.json()
           console.log(data);
         } else {
           // Handle error
           // ...
         }
     };

  
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleUserEmailChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Doe"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={handleUserEmailChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary"  onClick={handleSubmitSignUp}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
}