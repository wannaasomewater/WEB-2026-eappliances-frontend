import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ApplianceCard } from '../components/ApplianceCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState  } from '../store';
import { fetchAppliances } from '../store/slices/applianceSlice';

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.appliances);

  useEffect(() => { dispatch(fetchAppliances(0)); }, [dispatch]);

  if (status === 'loading') return <Container className="text-center mt-5"><Spinner animation="border" variant="warning" /></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Лента товаров</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((item) => <Col key={item.id}><ApplianceCard appliance={item} /></Col>)}
      </Row>
    </Container>
  );
};