import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInUser } from '../services/Auth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import logoImage from '../assets/riLogo.png';


const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await SignInUser(formValues);
      localStorage.setItem('user', JSON.stringify(payload));
      setUser(payload);
      navigate('/');
    } catch (error) {
      console.error('Sign in failed:', error);
      // Optionally, handle sign-in failure (e.g., show an error message)
    }
  };

  return (
    <MDBContainer fluid className="p-3">
      <MDBRow>
        <MDBCol md='6' className='mx-auto'>

          <div className='d-flex flex-row justify-content-center mt-4 mb-3'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            {/* <span className="h1 fw-bold">Logo</span> */}
          </div>

          <h3 className="fw-normal mb-3 text-center" style={{ letterSpacing: '1px' }}>Log in</h3>

          <form onSubmit={handleSubmit}>
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

            <MDBBtn className="mb-4 w-100" color='info' size='lg' type="submit">Login</MDBBtn>
          </form>

          <p className="text-center">
            <a className="text-muted" href="/forgotPassword">Forgot password?</a>
          </p>
          <p className='text-center'>
            Don't have an account? <a href="/register" className="link-info">Register here</a>
          </p>

        </MDBCol>

        <MDBCol md='6' className='d-none d-md-block px-0'>
          <img src={logoImage}
            alt="Login" className="w-100 vh-100" style={{ objectFit: '', objectPosition: 'left' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignIn;

