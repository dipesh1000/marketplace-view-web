import React from "react";
import { Accordion, Button, Card, Tab, Tabs } from "react-bootstrap";

function GigPackagesTabs({ item }) {
  return (
    <div className="gigPackageAccordian">
      <Accordion>
        <Accordion.Toggle eventKey="0">Click me!</Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}

export default GigPackagesTabs;
