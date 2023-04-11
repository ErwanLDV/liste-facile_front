import React from 'react'
import './todolist.css'
import { useState } from 'react';
import axios from 'axios';

export default function Modal({ setIsOpen, idtodolist, setReload, reload }) {
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value)
  }

   // Ajouter une tache 
   const handleSetNewTask = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem('User token')
    axios.post(`${process.env.REACT_APP_BACK_API_BASE_URL}/tasks`,
      {
        "data": {
          title: input,
          todolist: idtodolist,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then(function (response) {
      if (response.status === 200) {
        setIsOpen(false);
        setReload(!reload)
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
    <div className='modal-container'>
      <div className="modal-background" onClick={() => setIsOpen(false)}></div>
      <div className="modal-form-container">
        <form className="modal-form">
          <button onClick={() => setIsOpen(false)} id="close-btn" type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Close menu</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <input autoFocus type="text" onChange={handleChange}/>
          <button onClick={handleSetNewTask} className="btn-submit">valider</button>
        </form>
      </div>

    </div>
  )
}
