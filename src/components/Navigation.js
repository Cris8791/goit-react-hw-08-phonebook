import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adaugă aceasta pentru a folosi navigatorul

  const handleLogout = async () => {
    await dispatch(logOut());
    navigate('/login'); // Redirecționează utilizatorul la pagina de login după logout
  };

  return (
    <nav>
      <Link to="/contacts">Contacts</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
