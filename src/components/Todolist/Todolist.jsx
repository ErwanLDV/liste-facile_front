import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './todolist.css'
import LogoTrash from '../../assets/images/trash-can.png'
import Modal from './Modal'
import { AnimatePresence, motion } from 'framer-motion'



export default function Todolist() {
  const { id } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [TitleList, setTitleList] = useState("");
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  // je rend visible le token pour mes requetes
  const userToken = localStorage.getItem('User token')

  // charger les datas
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_API_BASE_URL}/todolists/${id}?populate=*`,
      {
        headers: {
          Authorization:
            `Bearer ${userToken}`,
        },
      })
      .then(function (response) {
        setTitleList(response.data.data.attributes.title);
        setTaskList(response.data.data.attributes.tasksList.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // dans tous les cas
      });
  }, [reload, id])

  // PUT tache checked
  const handleCheck = (e, closeParam) => {
    const taskId = e.target.id
    axios.put(`${process.env.REACT_APP_BACK_API_BASE_URL}/tasks/${taskId}`,
      {
        "data": {
          isClose: !closeParam,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then(function (response) {
      if (response.status === 200) {
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
  };

  // delete task

  const handleDeleteTask = (itemId) => {
    axios.delete(`${process.env.REACT_APP_BACK_API_BASE_URL}/tasks/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ).then(function (response) {
      if (response.status === 200) {
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
    <div>
      <div className="checkList">
        <div className="title">{TitleList}</div>
        <button className="btn-new-task" onClick={() => setIsOpen(true)}>Ajouter une tache</button>
        <div className="list-container">
          <AnimatePresence>
            {taskList.map((item, index) => (
              <motion.div className={item.attributes.isClose ? 'list-container-div-checked' : 'list-container-div'} key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -200 }} transition={{ duration: .4, delay: index * 0.15 }}>
                <input id={item.id} type="checkbox" onChange={(e) => handleCheck(e, item.attributes.isClose)} checked={item.attributes.isClose} />
                <span className={item.attributes.isClose ? 'checked' : ''}>{item.attributes.title}</span>
                <button className="delete-task" onClick={() => handleDeleteTask(item.id)} ><img src={LogoTrash} alt="Logo-poubelle" /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {isOpen &&
        <Modal setIsOpen={setIsOpen} idtodolist={id} setReload={setReload} reload={reload} />}
    </div>
  )
}
