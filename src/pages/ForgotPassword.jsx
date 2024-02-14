import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send a request to your backend to handle the password reset email
    console.log(`Password reset link sent to ${email}`);
    // Reset email field after submission
    setEmail('');
  };

  return (
    <MDBContainer fluid className="p-3">
      <MDBRow>
        <MDBCol md='6' className='mx-auto'>

          <div className='d-flex flex-row justify-content-center mt-4 mb-3'>
            <h2>Forgot Password</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <MDBInput 
              wrapperClass='mb-4 w-100' 
              label='Email Address' 
              id='formControlLgEmail'
              type='email'
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              />
        <MDBBtn className="mb-4 w-100" color='info' size='lg' type="submit">Send Reset Link</MDBBtn>
      </form>

    </MDBCol>
  </MDBRow>
</MDBContainer>
);
}

export default ForgotPassword;

