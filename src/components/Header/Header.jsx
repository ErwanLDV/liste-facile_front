import React from 'react'
import './header.css'
import { NavLink,Link,useNavigate } from 'react-router-dom'

export default function Header({ isLogged, loading, setIsLogged }) {
const navigate = useNavigate();

const handleLogout = () => {
  setIsLogged(false);
  localStorage.removeItem("User token");
  navigate('/');
}

  return (
    <header className="header">
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
      </div>
      {!loading &&
      <div className="login">
        {!isLogged ? <Link to="/login">
        <button className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span className="relative">Se Connecter</span>
        </button>
        </Link> :
        <button onClick={handleLogout} className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
        <span className="relative">Déconnexion</span>
      </button>}

      </div>}
    </header>
  )
}
