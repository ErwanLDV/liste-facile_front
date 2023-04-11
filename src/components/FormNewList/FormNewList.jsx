import React, { useEffect } from 'react'
import './formNewList.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormNewList({userId}) {
  const [input, setInput] = useState('');
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const userToken = localStorage.getItem('User token')
    axios.get(`${process.env.REACT_APP_BACK_API_BASE_URL}/users`,{
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then(function (response) {
      // en cas de réussite de la requête
      console.log(response);
    })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
  },[])

  const handleSetNewTask = (e) => {
    e.preventDefault();
    console.log('je click', userId);
    const userToken = localStorage.getItem('User token')
    axios.post(`${process.env.REACT_APP_BACK_API_BASE_URL}/todolists`,
      {
        // Les données à mettre à jour pour la tâche (par exemple, le titre ou la description)
        "data": {
          title: input,
          user: userId,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then(function (response) {
      // en cas de réussite de la requête
      console.log(response);
      if (response.status === 200) {
        navigate("/todolists")
      }
    })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
  }

  return (
    <div className="form-container">
      <form className="modal-form">
          <input autoFocus type="text" onChange={handleChange}/>
          <button onClick={handleSetNewTask} className="btn-submit">valider</button>
        </form>
    </div>
  )
}
