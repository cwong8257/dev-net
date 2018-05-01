import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <div>
    <img src={spinner} alt="Loading..." className="d-block mx-auto" style={{ width: '200px' }} />
  </div>
);

export default Spinner;
