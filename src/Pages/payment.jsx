import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Payment() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <Row className="mt-3">
        <Col md="4"> </Col>
        <Col md="4" className="payment-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3 mt-3 payment-form-title">
              <Col md="12">
                <h2> Payment Form </h2>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Card Holder Name"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="number">
                <Form.Label>Card Number</Form.Label>
                <Form.Control required type="text" placeholder="Card Number" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="month">
                <Form.Label>Month</Form.Label>
                <Form.Control required type="text" placeholder="Month" />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control required type="text" placeholder="Year" />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="cvvs">
                <Form.Label>CVV</Form.Label>
                <Form.Control required type="text" placeholder="CVV" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col md="4"> </Col>
              <Col md="4">
                <Button type="submit">Pay Now</Button>
              </Col>
              <Col md="4"> </Col>
            </Row>
          </Form>
        </Col>
        <Col md="4"> </Col>
      </Row>
    </div>
  );
}

export default Payment;
