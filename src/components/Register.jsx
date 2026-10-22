import React, { useEffect, useState } from 'react'
import Inputfield from '../common/Inputfield'
import Passwordfield from '../common/Passwordfield';
import authService from "../services/AuthService";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Register = ({ onLogin }) => {
    const navigate=useNavigate();
    const [value, changeValue] = useState('');
    const [error, seterror] = useState('');
    const [username, setusername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setpassword] = useState('');
    const [passerror, setpasserror] = useState('');
    function handlechange(e) {
        changeValue(e.target.value);
    }
    function changename(e) {
        setusername(e.target.value);
    }
    function handlepassword(e) {
        setpassword(e.target.value);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (value === '') {
            seterror('');
        } else if (!emailRegex.test(value)) {
            seterror('Please enter a valid email address');
        } else {
            seterror('');
        }
    }, [value]);

    useEffect(() => {
        if (username === '') {
            setUsernameError('');
        } else if (username.length < 3) {
            setUsernameError('Username must contain at least 3 characters');
        } else {
            setUsernameError('');
        }
    }, [username]);

    useEffect(() => {
        if (password === '') {
            setpasserror('');
        } else if (password.length < 8) {
            setpasserror('password must be 8 characters long');
        } else {
            setpasserror('');
        }
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await authService.register({
                name: username,
                mail: value,
                pass: password,
            });

            toast.success(result.message || "Registration successful");
            if (onLogin) {
                onLogin();
            }
        } catch (err) {
            const data = err.response?.data;

            const message =
                data?.error?.message ||
                data?.errors?.[0]?.message ||
                data?.message ||
                "Something went wrong";

            toast.error(message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col h-full min-h-[560px]">

                <div className="text-center py-4
                bg-indigo-400/10
                border-b border-indigo-300/20
                text-indigo-100 text-2xl font-bold
                w-full rounded-t-2xl">
                    <h2>Register</h2>
                </div>
                <div className='flex-1'>
                    <Inputfield label="Email: " type="email" placeholder="Enter your email" value={value} handlechange={handlechange} error={error} required={true} name="mail" />
                    <Inputfield label="Name: " type="text" placeholder="Enter your name" username={username} changename={changename} error={usernameError} required={true} name="name" />
                    <Passwordfield name="pass" label="password" placeholder="enter password" value={password} error={passerror} handlepassword={handlepassword} required={true} />
                </div>

                <div className="mt-auto p-4">
                    <div className="mt-auto p-2 text-center text-indigo-100 text-sm">
                        <button
                            type="button"
                            onClick={onLogin}
                            className="text-indigo-300 hover:text-indigo-100
    hover:underline transition-colors"
                        >
                            Already have an account? Login
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-violet-600
    hover:from-indigo-400 hover:to-violet-500
    text-white font-semibold py-3 px-4
    rounded-lg border border-indigo-300/20
    shadow-lg shadow-indigo-950/40
    hover:shadow-indigo-500/20
    hover:scale-[1.02]
    active:scale-[0.98]
    transition-all duration-200
    focus:outline-none focus:ring-2
    focus:ring-indigo-400/50 focus:ring-offset-2
    focus:ring-offset-[#211B46]"
                    >
                        Register
                    </button>
                </div>
            </div>

        </form>
    )
}

export default Register
