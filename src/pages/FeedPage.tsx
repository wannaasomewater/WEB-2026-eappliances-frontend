import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ApplianceCard } from '../components/ApplianceCard';
import { mockAppliances } from '../mockData';

export const FeedPage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Лента товаров</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {mockAppliances.map((item) => (
          <Col key={item.id}>
            <ApplianceCard appliance={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
