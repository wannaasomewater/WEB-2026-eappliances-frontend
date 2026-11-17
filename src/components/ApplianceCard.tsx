import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import type { ElectricalAppliance } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch  } from '../store';
import { deleteAppliance } from '../store/slices/applianceSlice';
import axios from 'axios';

interface Props { appliance: ElectricalAppliance; }

export const ApplianceCard: React.FC<Props> = ({ appliance }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const imageSrc = appliance.image ? appliance.image : '/assets/default-image.png';

  const handleLike = async () => {
    await axios.post(`/api/appliances/${appliance.id}/like`);
    alert('Лайк поставлен! (обновите страницу)');
  };

  return (
    <Card className="mb-3 shadow-sm h-100">
      <Card.Img variant="top" src={imageSrc} height="150" style={{ objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between">
          {appliance.name} <Badge bg="secondary">♥ {appliance.likes || 0}</Badge>
        </Card.Title>
        <Card.Text className="card-text-gray">
          Мощность: {appliance.power} Вт<br />Частота: {appliance.frequency} Гц
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">{appliance.price} ₽</span>
          <div>
            <Button variant="outline-danger" size="sm" className="me-2" onClick={handleLike} disabled={!isAuthenticated}>♥</Button>
            {isAuthenticated && <Button variant="danger" size="sm" onClick={() => dispatch(deleteAppliance(appliance.id))}>Удалить</Button>}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};