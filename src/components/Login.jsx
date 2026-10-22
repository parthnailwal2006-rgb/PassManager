import React, { useEffect, useState } from 'react'
import Inputfield from '../common/Inputfield'
import Passwordfield from '../common/Passwordfield';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from "../services/AuthService";
import toast from "react-hot-toast";
import { addtostorage } from '../redux/features/auth/AuthSlice';

const Login = ({ onRegister }) => {
   const navigate = useNavigate(); 
   const dispatch = useDispatch();
  const [value, changeValue] = useState('');
  const [error, seterror] = useState('');
  const [username, setusername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setpassword] = useState('');
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authService.login({
        name: username,
        mail: value,
        pass: password,
      });
      dispatch(addtostorage(result));
      toast.success(result.message || "Login successful");
      navigate('/home');
      
      
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
        {/* Heading */}
        <div
          className="text-center py-4 bg-indigo-400/10
      border-b border-indigo-300/20 text-indigo-100
      text-2xl font-bold w-full"
        >
          <h2>Login</h2>
        </div>

        {/* Input fields */}
        <div className="flex-1">
          <Inputfield
            label="Email:"
            type="email"
            placeholder="Enter your email"
            value={value}
            handlechange={handlechange}
            error={error}
            required={true}
            name="mail"
          />

          <Inputfield
            label="Name:"
            type="text"
            placeholder="Enter your name"
            username={username}
            changename={changename}
            error={usernameError}
            required={true}
            name="username"
          />

          <Passwordfield
            name="pass"
            label="Password"
            placeholder="Enter password"
            password={password}
            handlepassword={handlepassword}
            required={true}
          />
        </div>

        {/* Bottom actions */}
        <div className="mt-auto p-4">
          <div className="pb-3 text-center text-sm text-indigo-100">
            <button
              type="button"
              onClick={onRegister}
              className="text-indigo-300 hover:text-indigo-100
          hover:underline transition-colors"
            >
              Don't have an account? Register
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500
        to-violet-600 hover:from-indigo-400 hover:to-violet-500
        text-white font-semibold py-3 px-4 rounded-lg
        border border-indigo-300/20 shadow-lg
        shadow-indigo-950/40 hover:shadow-indigo-500/20
        hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 focus:outline-none
        focus:ring-2 focus:ring-indigo-400/50
        focus:ring-offset-2 focus:ring-offset-[#211B46]"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );

}

export default Login
