import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { FeedPage } from './pages/FeedPage';
import { GridPage } from './pages/GridPage';
import { Container } from 'react-bootstrap';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <Container className="mt-4 text-center">
    <h2>{title}</h2>
    <p className="text-muted">Эта страница находится в разработке.</p>
  </Container>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/grid" element={<GridPage />} />
        <Route path="/add" element={<PlaceholderPage title="Добавление услуги" />} />
        <Route path="/login" element={<PlaceholderPage title="Вход" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
