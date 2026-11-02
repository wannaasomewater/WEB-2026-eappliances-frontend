import React from 'react';
import { Card, Button } from 'react-bootstrap';
import type { ElectricalAppliance } from '../types';

interface Props {
  appliance: ElectricalAppliance;
}

export const ApplianceCard: React.FC<Props> = ({ appliance }) => {
  const imageSrc = appliance.image ? appliance.image : '/assets/default-image.jpg';
  const hasVideo = !!appliance.video;

  return (
    <Card className="mb-3 shadow-sm h-100">
      {hasVideo ? (
        <video width="100%" height="150" controls>
          <source src={appliance.video} type="video/mp4" />
        </video>
      ) : (
        <Card.Img variant="top" src={imageSrc} height="150" style={{ objectFit: 'cover' }} />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{appliance.name}</Card.Title>
        <Card.Text className="card-text-gray">
          Мощность: {appliance.power} Вт<br />
          Частота: {appliance.frequency} Гц
        </Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold">{appliance.price} ₽</span>
          <Button className="btn-orange">Подробнее</Button>
        </div>
      </Card.Body>
    </Card>
  );
};
