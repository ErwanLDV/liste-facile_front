import React from 'react'
import './home.css'
import Logo from '../../assets/images/Checklist.jpg'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export default function Home({ isLogged }) {
  return (
    <motion.div initial={{ y: -1000, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7 }} className="home-container">
      <h1 className="title">LISTE FACILE</h1>
      <p className="subtitle">L'application qui vous facilite la vie !</p>
      <div className="img-container">
        <div className="logo-todolist">
          <img src={Logo} alt="to do list" />
        </div>
        <div className="home-list">
          <ul>
            <li>Connectez vous</li>
            <li>Gérer vos listes</li>
            <li>N'oubliez plus une chose à faire</li>
          </ul>
        </div>

      </div>
      {!isLogged &&
        <div className="home-inscription">
          <p>Toujours pas inscrit ?</p>
          <Link to="/inscription">
            <motion.button initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .8 } }}
              className="btn-inscription"
            >Inscription</motion.button>
          </Link>
        </div>}
    </motion.div>
  )
}
