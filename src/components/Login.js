import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';   
import { AuthContext } from './AuthContext';
import '../css/Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const verify = async (event) => {
        event.preventDefault(); 

        if (!email || !password) {
            setError('Email and password are required.');

            setTimeout(()=>{
                setError('');
            },2000)
            return;
        }

        setLoading(true);

        if(email==='admin@gmail.com' && password==='Admin123'){
            navigate('/admin');
        }

        try {
            const response = await fetch('http://localhost:8000/users/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: email, password: password }),
            });

            if (response.ok) {
                const userData = await response.json(); 
                login(userData); 

                localStorage.setItem('currentUser', JSON.stringify(userData)); 

                navigate('/home'); 
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='loginBody'>
        <div className='FromLogin' style={{display:'flex',justifyContent:'center',marginTop:'6%'}}>
            <form onSubmit={verify} style={{display:'inline-block'}}>
                <h1>Login</h1>
            <div className='LoginInput'>
                <input
                    type='text'
                    name='Email'
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                /><br></br>
                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                /><br></br>
                <button className='LoginButton' type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button> 
                </div> 
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>If not a user ?<a href='/register'>Register here</a></p>
            </form>
        </div>
        </div>
    );
};

export default Login;