import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (action === "Sign Up" && !name) {
        setError('Name is required for Sign Up');
        return;
    }
    if (!email || !password) {
        setError('Email and Password are required');
        return;
    }

    const url = action === "Sign Up" ? '/user/signup' : '/user/login';
    const body = action === "Sign Up" ? { name, email, password } : { email, password };

    try {
        const response = await fetch(`http://localhost:5000${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSuccess(`${action} successful!`);
        console.log(data);
    } catch (error) {
        setError('An error occurred: ' + error.message);
    }

        e.preventDefault();
        setError('');
        setSuccess('');

        // Simple validation
        if (action === "Sign Up" && !name) {
            setError('Name is required for Sign Up');
            return;
        }
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }

        // Simulate a successful login/signup
        setSuccess(`${action} successful!`);
        console.log('Email:', email);
        console.log('Password:', password);
        if (action === "Sign Up") {
            console.log('Name:', name);
        }
    };

    return (
        <div className="App">
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} className="inputs">
                {action === "Login" ? null : 
                <div className="input">
                    <input type="text" placeholder="Enter Name"  value={name} onChange={(e) => setName(e.target.value)} />
                </div>}
                
                <div className="input">
                    <input type="email" placeholder="Enter E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                
                <div className="submit-container">
                    <button type="submit" className="submit">{action}</button>
                    <div className="toggle-action" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                        {action === "Login" ? "Switch to Sign Up" : "Switch to Login"}
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;
