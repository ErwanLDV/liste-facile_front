import React from 'react'
import './header.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function Header({ isLogged, loading, setIsLogged }) {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("User token");
    navigate('/');
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header">
      {!isMobile ?
        <div className="nav">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'font-bold' : ''
          }>Accueil</NavLink>
          <NavLink to="/todolists" className={({ isActive }) =>
            isActive ? 'font-bold' : ''
          }>Vos listes</NavLink>
          <NavLink to="/todolist/ajouter" className={({ isActive }) =>
            isActive ? 'font-bold' : ''
          }>Créer une nouvelle liste</NavLink>
        </div> : <div className='burger-icon' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>}
            </div>}
          {isOpen && <div className='burger-list'>
            <ul onClick={() => setIsOpen(!isOpen)}>
              <li><NavLink to="/" style={{ display: "block", padding: '8px', fontFamily: 'Sriracha' }}>Accueil</NavLink></li>
              <li><NavLink to="/todolists" style={{ display: "block", padding: '8px', fontFamily: 'Sriracha' }}>Vos listes</NavLink></li>
              <li><NavLink to="/todolist/ajouter" style={{ display: "block", padding: '8px', fontFamily: 'Sriracha' }}>Créer une nouvelle liste</NavLink></li>
            </ul>
          </div>}
      {!loading &&
        <div className="login">
          {!isLogged ? <Link to="/login">
            <button className="px-5 py-2.5 relative rounded group font-medium text-white inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span className="relative" style={{fontFamily: 'Sriracha'}}>Se Connecter</span>
            </button>
          </Link> :
            <button onClick={handleLogout} className="px-5 py-2.5 relative rounded group font-medium text-white inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
              <span className="relative" style={{fontFamily: 'Sriracha'}}>Déconnexion</span>
            </button>}

        </div>}
    </header>
  )
}
