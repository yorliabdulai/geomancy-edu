import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { auth } from '../../firebaseConfig'; // Import the Firebase auth module
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the createUserWithEmailAndPassword function

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  width: 500px;
  margin: auto;
  margin-top: 100px;

  & > .MuiTextField-root {
    width: 100%;
  }

  & > .MuiButton-root {
    width: 100%;
    height: 50px;
    background-color: #2a72cc;

    :hover {
      background-color: #0d52a7;
    }
  }
`;

const SignupPage = () => {
  const init = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  };

  const [formdata, setFormdata] = useState(init);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSignup = async () => {
    const { email, password } = formdata;

    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // You can store additional user data in Firestore if needed
      // For example: addUserToFirestore(user.uid, formdata);

      console.log('User created:', user.uid);
      setFormdata(init); // Reset the form data
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <FormBox>
        <h1>Sign up Page</h1>
        <TextField
          onChange={handleChange}
          label="First Name"
          variant="outlined"
          name="first_name"
          value={formdata.first_name}
        />
        <TextField
          onChange={handleChange}
          label="Last Name"
          variant="outlined"
          name="last_name"
          value={formdata.last_name}
        />
        <TextField
          onChange={handleChange}
          label="Username"
          variant="outlined"
          name="username"
          value={formdata.username}
        />
        <TextField
          onChange={handleChange}
          label="Email Id"
          variant="outlined"
          name="email"
          value={formdata.email}
        />
        <TextField
          onChange={handleChange}
          label="Password"
          variant="outlined"
          name="password"
          value={formdata.password}
          type="password"
        />
        <Button onClick={handleSignup} variant="contained" color="primary">
          Create my Account!
        </Button>
        {error && <p>{error}</p>}
      </FormBox>
    </div>
  );
};

export default SignupPage;
