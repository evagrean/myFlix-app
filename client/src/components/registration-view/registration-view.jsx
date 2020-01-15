//@ts-check
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://my-flix-evagrean.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        alert('Registration was successful. Please log in')
        window.open('/', '_self'); // with '_self' page will open in current tab
      })
      .catch(error => {
        return alert('Registration failed. Please make sure your username is at least 5 chars long' + error);
      });
  };

  return (
    <div className="registration-view">
      <Row className="justify-content-center">
        <Col>
          <Container className="container register-container border border-light shadow p-3 mb-5 rounded py-3 px-3">
            <h3 className="pb-2">Sign up for myFlix</h3>
            <Form className="registration-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" pattern="[a-zA-Z0-9]+" value={username} onChange={e => setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email adress" value={email} onChange={e => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" placeholder="01/01/1980" value={birthday} onChange={e => setBirthday(e.target.value)} required />
              </Form.Group>
              <Row className="justify-content-end">
                <Button className="sign-up-button ml-3 mr-3" variant="primary" type="submit" block onClick={handleRegister} >Sign up</Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <span>Already have an account?</span>
              <Link to={`/`}>
                <Button variant="link" className="login-link btn-lg">Login</Button>
              </Link>

            </Row>
          </Container>
        </Col>
      </Row>
    </div >

  );
}

// no props



