import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const existDialog = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.resetForm) {
            setUsername('');
            setPassword('');
        }
    }, [location]);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(authInfo => {
            if (authInfo && authInfo.token) {
                localStorage.setItem("wine_token", JSON.stringify(authInfo));
                navigate("/mywines");
            } else {
                existDialog.current.showModal();
            }
        });
    };

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="logo-container">
                        <img src="/images/capstone logo.png" alt="App Logo" className="app-logo" />
                    </div>
                    <fieldset className="mb-4">
                        <label htmlFor="inputUsername"> Username </label>
                        <input type="username" id="inputUsername"
                            value={username}
                            onChange={evt => setUsername(evt.target.value)}
                            className="form-control"
                            placeholder="Username"
                            required autoFocus
                            autoComplete="off" />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" id="inputPassword"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="Password"
                            autoComplete="off" />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="login-button">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <div className="loginLinks">
                <section className="link--register">
                    <Link className="register-link" to="/register">Not a member yet?</Link>
                </section>
            </div>
        </main>
    );
};
