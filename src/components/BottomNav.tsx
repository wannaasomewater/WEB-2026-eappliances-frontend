import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState  } from '../store';
import { logout } from '../store/slices/authSlice';
import { resetFilters } from '../store/slices/filterSlice';

export const BottomNav: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    dispatch(logout());
    dispatch(resetFilters());
    navigate('/');
  };

  return (
    <div className="bottom-navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Лента</NavLink>
      <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>Добавление</NavLink>
      <NavLink to="/grid" className={({ isActive }) => (isActive ? 'active' : '')}>Плитка</NavLink>
      {isAuthenticated ? (
        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Выход</a>
      ) : (
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Вход</NavLink>
      )}
    </div>
  );
};