import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <div className="visibility-filter-input">
    <Form.Group controlId="formBasicFilterInput" className="mb-4">
      <Form.Control className="search" onChange={e => props.setFilter(e.target.value)} value={props.visibilityFilter.trim()} placeholder="Search..." />
    </Form.Group>

  </div>

}

export default connect(null, { setFilter })(VisibilityFilterInput);



