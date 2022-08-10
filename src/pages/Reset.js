import React, {useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth, sendPasswordResetEmail } from "../contexts/UserAuth";
import "../styles/Reset.css";
import Loader from "../components/Loader";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);

    
    if (loading) return <Loader/>;
    

    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"/>
                <button
                    className="reset__btn"
                    onClick={() => sendPasswordReset(email)}>
                        Send Password Reset Email
                    </button>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
            </div>
        </div>
    );
}

export default Reset;