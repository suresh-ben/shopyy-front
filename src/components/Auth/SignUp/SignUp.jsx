import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useSignUp from "../../../hooks/useSignUp";

function SignUp() {
    
    const [ userName, setUserName ] = useState(null);
    const [ fName, setFName ] = useState(null);
    const [ lName, setLName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ mobNo, setMobnNo ] = useState(null);
    const [ error, setError ] = useState("");
    const { signUp } = useSignUp();
    const navigate = useNavigate();

    const UserSignUp = async (e) => {
        e.preventDefault();

        if(!userName || userName.length <= 0) {
          setError("Please provide name");
          return;
        }

        if(!fName || fName.length <= 0) {
          setError("Please provide First Name");
          return;
        }

        if(!lName || lName.length <= 0) {
          setError("Please provide Last Name");
          return;
        }

        if(!email || !isEmailValid(email)) {
          setError("INValied Email");
          return;
        }

        if(!password || password.length < 8) {
          setError("password length shold be greater than 8 characters");
          return;
        }

        if(!mobNo || mobNo.length <= 0) {
          setError("Please provide Mobile Number");
          return;
        }

        const response = await signUp(userName, fName, lName, email, password, mobNo);
        if(response.success) {
          console.log("Success");
          window.location.reload();
        } else {
          setError(response.err);
        }
    }

    function isEmailValid(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    return (
        <div className="sign-area">
          <h1 className="sign-head">Sign Up</h1>

          <form onSubmit={UserSignUp}>
              <input
                className="sign-input"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="User Name"
              />

              <div
                style={{width: '75%', margin: '.4rem', display: 'flex', justifyContent: 'center'}}
              >
                <input
                  className="sign-input-names"
                  type="text"
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                  placeholder="First Name"
                />

                <input
                  className="sign-input-names"
                  type="text"
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                  placeholder="Last Name"
                />
              </div>

              <input
                className="sign-input"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />

              <input
                className="sign-input"
                type="number"
                onChange={(e) => {
                  setMobnNo(e.target.value);
                }}
                placeholder="Mobile no"
              />

              <input
                className="sign-input"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />

              <button className="sign-button" type="submit">Sign Up</button>
              <p style={{textAlign: 'center', color: 'red', fontSize: 'small'}}>{error}</p>
            </form>
          </div>
    )
}

export default SignUp;