import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  return (
    <div className="bottom-navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Лента</NavLink>
      <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>Добавление</NavLink>
      <NavLink to="/grid" className={({ isActive }) => (isActive ? 'active' : '')}>Плитка</NavLink>
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Вход</NavLink>
    </div>
  );
};
