import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './todolists.css'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { motion, AnimatePresence  } from 'framer-motion';

export default function Todolists() {
  const [loading, setLoading] = useState(true);
  const [todolists, setTodolists] = useState([]);
  const [reload, setReload] = useState(false);
  console.log(todolists);
  const userToken = localStorage.getItem('User token')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_API_BASE_URL}/users/me?populate=*`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      })
      .then(function (response) {
        // en cas de réussite de la requête
        console.log(response);
        setTodolists(response.data.todolists)
      })
      .catch(function (error) {
        // en cas d’échec de la requête
        // console.log(error);
      })
      .finally(function () {
        // dans tous les cas
        setLoading(false);
      });
  }, [reload])


  const handleClickDelete = (id) => {
    console.log('je delete');
    axios.delete(`${process.env.REACT_APP_BACK_API_BASE_URL}/todolists/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      })
      .then(function (response) {
        // en cas de réussite de la requête
        console.log(response);
        setReload(!reload);
      })
      .catch(function (error) {
        // en cas d’échec de la requête
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
  }


  const submit = (param) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Vous êtes sûr ?</h1>
            <p>Voulez vous vraiment supprimer cette liste?</p>
            <div className="btns-confirm">
              <button className="btn-no" onClick={onClose}>Non</button>
              <button className="btn-yes"
                onClick={() => {
                  handleClickDelete(param); 
                  onClose();
                }}
              >
                Oui
              </button>
            </div>
          </div>
        );
      }
    });
  };


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
      <h1 className='title-liste'>{todolists.length > 0 ? 'Vos listes' : 'Vous n\'avez pas de listes'}</h1>
      <AnimatePresence>
      {todolists && todolists.map((item, index) => (
        <motion.div className="row" key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x:-200}} transition={{ duration: .4, delay: index * 0.15 }}>
          <Link className="my-custom-class" to={`/todolist/${item.id}`}>
            <div className="card">
              <h4>{item.title}</h4>
              <button id='noclick' onClick={(e) => {e.preventDefault();submit(item.id);}}>supprimer</button>
            </div>
          </Link>
        </motion.div>
      ))}
      </AnimatePresence>
      </>)}
    </>
  )
}
