import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './update-view.scss';

export function UpdateView(props) {
  const { user } = props;

  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://my-flix-evagrean.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Birthday: birthday,
      Email: email
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const data = res.data;
        alert('Your profile data was updated successfully');
        localStorage.setItem('user', data.Username);
        window.open(`/users/${localStorage.getItem('user')}`);
      })
      .catch(error => {
        alert('error updating user ' + error);
      });

  }

  return (
    <div className="update-view justify-content-center">
      <span className="d-flex align-items-center mb-4">
        <Link to={`/users/${user}`}>
          <i className="material-icons">arrow_back_ios</i>
        </Link>
        <h1 className="">Update {user}'s profile</h1>
      </span>
      <p className="lead pl-3 mb-4 warning">Please make sure you fill in every input field before pressing update-button.
      If you want to keep some data as it is, fill in original data again.</p>



      <Row className="justify-content-center">

        <Col>
          <Container className="container update-container border-0 mt-0">
            <Form className="update-form">
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" placeholder="Update username or repeat original" onChange={e => updateUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Update password or repeat original" onChange={e => updatePassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="text" placeholder="Update your email adress or repeat original" onChange={e => updateEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control required type="date" placeholder="Update your birthday or repeat original" onChange={e => updateBirthday(e.target.value)} />
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

UpdateView.propTypes = {
  user: PropTypes.string.isRequired
}