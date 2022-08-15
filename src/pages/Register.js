import React, { useState } from "react";
import { useAuth } from "../contexts/UserAuth";
import "../styles/Register.css";


const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {auth, registerWithEmailAndPassword, googleLogin} = useAuth();
 
  console.log("hi")


  return (
    <div className="register">
      <div className="register__container">
        <input
          type="email"
          className="register__textBox"
          placeholder="name@example.com"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register__textBox"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__btn" onClick={registerWithEmailAndPassword(auth, email, password)}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={googleLogin}
        >
          Register with Google
        </button>
      </div>
    </div>
  );
}
export default Register;