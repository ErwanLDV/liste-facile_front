import React from 'react'
import './formNewList.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormNewList({userId}) {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');


  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSetNewTask = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('User token')

    if (input.trim().length >= 1) { 
    axios.post(`${process.env.REACT_APP_BACK_API_BASE_URL}/todolists`,
      {
        "data": {
          title: input.trim(),
          user: userId,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then(function (response) {
      if (response.status === 200) {
        navigate("/todolists")
        setMessage('');
      }
    })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
    }else {
      setMessage('Veuillez entrer un nom de liste');
      }
  }

  return (
    <div className="form-container">
      <form className="modal-form" onSubmit={handleSetNewTask}>
        {message && <p>{message}</p>}
          <input autoFocus type="text" minLength={1} onChange={handleChange} value={input} required/>
          <button type='submit' className="btn-submit">valider</button>
        </form>
    </div>
  )
}
