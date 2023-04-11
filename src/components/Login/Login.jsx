import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'

export default function Login({ isLogged, setIsLogged}) {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");

  const [stateLogin, setStateLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setStateLogin({
      ...stateLogin,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post(`${process.env.REACT_APP_BACK_API_BASE_URL}/auth/local`, {
        identifier: stateLogin.email,
        password: stateLogin.password,
      })
      .then(response => {
        console.log(response);
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        if (response.status === 200) {
          localStorage.setItem('User token', response.data.jwt);
          setStateLogin({
            email: "",
            password: "",
          });
          setMessage("");
          setIsLogged(true);
          setTimeout(() => {
            navigate("/todolists");
          }, 1000);
        }
        
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
        setMessage("Vérifier vos identifiants");
      });
  }
  return (
    <>
      <form className='form-inscription' onSubmit={handleSubmit}>
      {message && <span>{message}</span>}
      <input type="email" name='email' placeholder='Adresse email' value={stateLogin.email} onChange={handleChangeInput} required/>
      <input type="password" name='password' minLength={6} placeholder='Mot de passe' value={stateLogin.password} onChange={handleChangeInput} required />
      <button type='submit' className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Connexion</span>
        </button>
    </form>
    </>
  )
}
