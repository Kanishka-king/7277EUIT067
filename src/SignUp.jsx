import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
// taken from react js documentation
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = React.useState({
    companyName: '',
    ownerName: '',
    rollNo: '',
    ownerEmail: '',
    accessCode:"",
    allowExtraEmails: false,
  });

  const [formErrors, setFormErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          name: value.trim() ? '' : 'First Name is required',
        }));
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? '' : 'Invalid email address',
        }));
        break;

      case 'password':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
        }));
        break;

      case 'confirmPassword':
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: value === formData.password ? '' : 'Passwords do not match',
        }));
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      validateField(fieldName, formData[fieldName]);
      newFormErrors[fieldName] = formErrors[fieldName];
    });

    setFormErrors(newFormErrors);

    const hasErrors = Object.values(newFormErrors).some((error) => error !== '');
console.log("Hi");
    try {
      
        console.log('Hi');
        const response = await axios.post('http://localhost:8080/api/v1/auth/register', formData);
        console.log('Form submitted successfully:', response.data);
        navigate('/login');
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className='signn'>
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    InputProps={{
                      style: { borderColor: 'green' }, // Set the border color to green
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    InputProps={{
                      style: { borderColor: 'green' }, // Set the border color to green
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputProps={{
                      style: { borderColor: 'green' }, // Set the border color to green
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            InputProps={{
              style: { borderColor: 'green' },
            }}
          />
        </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    InputProps={{
                      style: { borderColor: 'green' }, // Set the border color to green
                    }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    
                  </TextField>
                </Grid>
               
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
                disabled={Object.values(formErrors).some((error) => error !== '')}

>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
