import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../services/Auth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    });
    navigate('/signin');
  };

  return (
    <MDBContainer fluid className="p-3">
      <MDBRow>
        <MDBCol md='6' className='mx-auto'>
          <h3 className="fw-normal mb-3 text-center" style={{ letterSpacing: '1px' }}>Register</h3>

          <form onSubmit={handleSubmit}>
            <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Name' 
              id='formControlLgName' 
              type='text' 
              size="lg"
              name="name"
              onChange={handleChange}
              value={formValues.name}
              required
            />

            <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Email address' 
              id='formControlLgEmail' 
              type='email' 
              size="lg"
              name="email"
              onChange={handleChange}
              value={formValues.email}
              required
            />

            <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Password' 
              id='formControlLgPassword' 
              type='password' 
              size="lg"
              name="password"
              onChange={handleChange}
              value={formValues.password}
              required
            />

            <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Confirm Password' 
              id='formControlLgConfirmPassword' 
              type='password' 
              size="lg"
              name="confirmPassword"
              onChange={handleChange}
              value={formValues.confirmPassword}
              required
            />

            <MDBBtn className="mb-4 w-100" color='info' size='lg' type="submit">Register</MDBBtn>
          </form>

          <p className='text-center'>
            Already have an account? <a href="/signin" className="link-info">Sign in here</a>
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
