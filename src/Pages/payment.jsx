import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ValidateForm from "./formValidate";

function Payment() {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const stripe = useStripe();
  const elements = useElements();

  const setFields = (field, value) => {
    setForm({
      ...form,
      [field] : value
    });

    if(!!error[field]){
      setError({
        ...error,
        [field] : null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   
    const checkError = ValidateForm(form);
    if(Object.keys(checkError).length > 0){
      setError(checkError);
    }
    else{
      console.log("form submitted");
    }

    if(!stripe || !elements) return; //stripePayment not yet loaded
    
    const card = {
      number: form.number,
      exp_month: form.month,
      exp_year: form.year,
      cvc: form.cvv,
    }; //API payload
    const { token, error } = await stripe.createToken({card});

    if (error) {
      console.error(error);
    } else {
      console.log('Token:', token);
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000, 
          currency: 'inr', 
          token: token.id,
        }),
      });

      const { clientSecret } = await response.json();

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: token.card.id,
      });

      if (error) {
        console.error('Payment confirmation error:', error.message);
      } else {
        console.log('Payment confirmed:', paymentIntent);
      }
    }
  };

  return (
    <div>
      <Row className="mt-3">
        <Col md="4"> </Col>
        <Col md="4" className="payment-form">
          <Form noValidate  onSubmit={handleSubmit}>
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
                  value={form.name}
                  onChange={(e) => setFields('name', e.target.value)}
                  isInvalid={!!error.name}
                />
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="number">
                <Form.Label>Card Number</Form.Label>
                <Form.Control 
                  required 
                  type="number" 
                  placeholder="Card Number" 
                  value={form.number}
                  onChange={(e) => setFields('number', e.target.value)}
                  isInvalid={!!error.number}
                  />
                  <Form.Control.Feedback type="invalid">
                  {error.number}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="month">
                <Form.Label>Month</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Month" 
                  value={form.month}
                  onChange={(e) => setFields('month', e.target.value)}
                  isInvalid={!!error.month}  
                />
                <Form.Control.Feedback type="invalid">
                  {error.month}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control 
                  required 
                  type="number" 
                  min="2023"
                  placeholder="Year"
                  value={form.year}
                  onChange={(e) => setFields('year', e.target.value)}
                  isInvalid={!!error.year}
                />
                <Form.Control.Feedback type="invalid">
                  {error.year}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="cvvs">
                <Form.Label>CVV</Form.Label>
                <Form.Control 
                  required 
                  type="number" 
                  placeholder="CVV" 
                  value={form.cvv}
                  onChange={(e) => setFields('cvv', e.target.value)}
                  isInvalid={!!error.cvv}
                />
                <Form.Control.Feedback type="invalid">
                  {error.cvv}
                </Form.Control.Feedback>
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
