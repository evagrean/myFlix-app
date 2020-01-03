import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './update-view.scss';

export function UpdateView(props) {
  const { user } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://my-flix-evagrean.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const updatedData = response.data;
        console.log(updatedData);
        console.log('user data was updated successfully');
        alert('Your profile data was updated succsessfully');
      })
      .catch(error => {
        console.log('error updating user data');
        alert('Oops, something went wrong. Please try again');
      });
  };


  return (
    <div className="update-view justify-content-center">
      <span className="d-flex align-items-center mb-4">
        <Link to={`/users/${user}`}>
          <i className="material-icons">arrow_back_ios</i>
        </Link>
        <h1 className="">Update {user}'s profile</h1>
      </span>
      <Row className="justify-content-center">
        <Col>
          <Container className="container update-container border-0 mt-0">
            <Form className="update-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Update username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Update password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Update your email adress" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" placeholder="Update your birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
              <Row className="justify-content-end">
                <Button className="update-btn mr-3" variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
              </Row>
            </Form>
          </Container>
          <Container className="mt-4">
            <Row className="d-flex align-items-center justify-content-center">
              <span>Want to delete your myFlix account?</span>
              <Link to={`/users/${user}`}>
                <Button variant="link" className="unregister-btn">Delete</Button>
              </Link>

            </Row>
          </Container>
        </Col>
      </Row>
    </div>


  );



}

