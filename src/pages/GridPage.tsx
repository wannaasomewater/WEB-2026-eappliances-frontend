import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { ApplianceCard } from '../components/ApplianceCard';
import { mockAppliances } from '../mockData';
import type { ElectricalAppliance } from '../types';

export const GridPage: React.FC = () => {
  const [minPower, setMinPower] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<ElectricalAppliance[]>(mockAppliances);

  useEffect(() => {
    const result = mockAppliances.filter(item => item.power >= minPower);
    setFilteredData(result);
  }, [minPower]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Плитка с фильтром</h2>
      <Form.Group className="mb-4 p-3 bg-white rounded shadow-sm">
        <Form.Label>Минимальная мощность: <strong>{minPower} Вт</strong></Form.Label>
        <Form.Range min={0} max={3000} step={100} value={minPower} onChange={(e) => setMinPower(Number(e.target.value))} />
      </Form.Group>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Col key={item.id}>
              <ApplianceCard appliance={item} />
            </Col>
          ))
        ) : (
          <Col><p className="text-muted">Ничего не найдено.</p></Col>
        )}
      </Row>
    </Container>
  );
};
