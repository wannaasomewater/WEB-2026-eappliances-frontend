import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState  } from '../store';
import { addAppliance } from '../store/slices/applianceSlice';
import { useNavigate } from 'react-router-dom';

export const AddPage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [power, setPower] = useState(1000);
  const [price, setPrice] = useState(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Только для авторизованных!');
    dispatch(addAppliance({ name, power, frequency: 50, price, image: '', video: '' }));
    navigate('/');
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2>Добавление услуги</h2>
      {!isAuthenticated ? <p className="text-danger">Войдите, чтобы добавлять услуги.</p> : (
        <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          <Form.Group className="mb-3"><Form.Label>Название</Form.Label><Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Мощность (Вт)</Form.Label><Form.Control type="number" value={power} onChange={e => setPower(Number(e.target.value))} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Цена (₽)</Form.Label><Form.Control type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required /></Form.Group>
          <Button type="submit" className="btn-orange w-100">Добавить</Button>
        </Form>
      )}
    </Container>
  );
};