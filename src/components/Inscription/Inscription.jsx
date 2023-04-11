import React from 'react'
import { useState } from 'react'
import './inscription.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Inscription({setIsLogged, setUserId}) {
  const [stateInscription, setStateInscription] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const baseURL = process.env.REACT_APP_BACK_API_BASE_URL;
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setStateInscription({
      ...stateInscription,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stateInscription.password === stateInscription.repeatPassword) {

      axios.post(`${baseURL}/auth/local/register`, {
        username: stateInscription.username,
        email: stateInscription.email,
        password: stateInscription.password,
      }).then(response => {
        console.log(response);
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        if (response.status === 200) {
          localStorage.setItem('User token', response.data.jwt);
          setUserId(response.data.user.id)
          setStateInscription({
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
          })
          setIsLogged(true);
          setTimeout(() => {
            navigate("/todolists");
          }, 1000);
        }
      })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
    }
  }
  return (
    <form className='form-inscription' onSubmit={handleSubmit}>
      <input type="text" name='username' placeholder="Pseudo" value={stateInscription.username} onChange={handleChangeInput} required/>
      <input type="email" name='email' placeholder='Adresse email' value={stateInscription.email} onChange={handleChangeInput} required/>
      <input type="password" name='password' minLength={6} placeholder='Mot de passe' value={stateInscription.password} onChange={handleChangeInput} required/>
      <input type="password" name='repeatPassword' minLength={6} placeholder='Répéter le mot de passe' value={stateInscription.repeatPassword} onChange={handleChangeInput} required/>
      <button type='submit' className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Valider</span>
        </button>
    </form>
  )
}
