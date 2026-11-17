import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { ApplianceCard } from '../components/ApplianceCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState  } from '../store';
import { fetchAppliances } from '../store/slices/applianceSlice';
import { setMinPower } from '../store/slices/filterSlice';

export const GridPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { minPower } = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.appliances);

  useEffect(() => { dispatch(fetchAppliances(minPower)); }, [dispatch, minPower]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Плитка с фильтром</h2>
      <Form.Group className="mb-4 p-3 bg-white rounded shadow-sm">
        <Form.Label>Минимальная мощность: <strong>{minPower} Вт</strong></Form.Label>
        <Form.Range min={0} max={3000} step={100} value={minPower} onChange={(e) => dispatch(setMinPower(Number(e.target.value)))} />
      </Form.Group>
      {status === 'loading' ? <Spinner animation="border" variant="warning" /> : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.length > 0 ? items.map((item) => (
            <Col key={item.id}><ApplianceCard appliance={item} /></Col>
          )) : <Col><p className="text-muted">Ничего не найдено.</p></Col>}
        </Row>
      )}
    </Container>
  );
};