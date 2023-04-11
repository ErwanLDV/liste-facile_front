import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Inscription from './components/Inscription/Inscription';
import Todolists from './components/Todolists/Todolists';
import Login from './components/Login/Login';
import Todolist from './components/Todolist/Todolist';
import FormNewList from './components/FormNewList/FormNewList';
import ProtectedRoute from './utils/ProtectedRoute';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState()

  useEffect(() => {
    const userToken = localStorage.getItem('User token');

    // Vérifier si le token est présent dans le local storage
    if (userToken) {
      axios.get(`${process.env.REACT_APP_BACK_API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setIsLogged(true);
          setUserId(response.data.id)
        })
        .catch((error) => {
          console.log(error);
          setIsLogged(false);
          localStorage.removeItem("User token");
        }).finally(() => {
          setLoading(false);
        });
    } else {
      setIsLogged(false);
      setLoading(false);
    }
  }, []);


  return (
    <div className="App custom">
      <Header isLogged={isLogged} setIsLogged={setIsLogged} loading={loading} />
      <Routes>
        <Route path='/' element=<Home isLogged={isLogged} /> />
        <Route path='/login' element=<Login isLogged={isLogged} setIsLogged={setIsLogged} /> />
        <Route path='/inscription' element=<Inscription setIsLogged={setIsLogged} setUserId={setUserId}/> />
      
        {/* ------------ Protected Routes --------------- */}
        <Route
          path="/todolists"
          element={(
            <ProtectedRoute redirectPath="/login" isLogged={isLogged}>
              <Todolists />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/todolist/ajouter"
          element={(
            <ProtectedRoute redirectPath="/login" isLogged={isLogged}>
             <FormNewList userId={userId} />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/todolist/:id"
          element={(
            <ProtectedRoute redirectPath="/login" isLogged={isLogged}>
              <Todolist />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
