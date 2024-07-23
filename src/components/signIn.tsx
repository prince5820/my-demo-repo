import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Button, Container, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig';
import { useSnackbar } from './snackbar';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { openSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (email && password) {
      axiosInstance.get(`sign-in/${email}`).then((res) => {
        if (res.data) {
          const user = res.data[0];
          if (user.email === email && user.password === password) {
            localStorage.setItem('userId', user.id);
            openSnackbar('User logged in successfully', 'snackbar-success');
          } else {
            openSnackbar('Email and Password does not match', 'snackbar-error');
          }
        }
      }).catch((err) => {
        openSnackbar(err.response.data, 'snackbar-error');
      })
    }
  }

  return (
    <>
      <Box className="centered-container flex-direction-column">
        <Container className="image-section max-width-500">
          <img className="login-image" src="/images/login.png" alt="login image" />
        </Container>
        <Container className="padding-40-24 max-width-500">
          <Typography className="welcome-text font-weight-900">Welcome!</Typography>
          <div className="margin-top-bottom-24">
            <TextField
              variant="outlined"
              label="Email Address"
              className="input-field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={isSubmitted && !email}
              helperText={isSubmitted && !email && 'Enter Email'}
              style={{ marginBottom: isSubmitted && !email ? 0 : 16 }}
            />
            <FormControl className="input-field" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    {showPassword ? <VisibilityOffIcon onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }} /> : <Visibility onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }} />}
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={isSubmitted && !password}
              />
              <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !password && 'Enter Password'}</FormHelperText>
            </FormControl>
          </div>
          <div className='margin-top-bottom-24'>
            <Button className='primary-button mb-16' variant='contained' color='primary' onClick={handleSubmit}>Login</Button>
            <div className='not-a-member-section'>
              <Typography variant='caption'>Not a member? <Link to='/sign-up' className='text-decoration-none'>Register Now</Link></Typography>
            </div>
          </div>
        </Container>
      </Box>
    </>
  )
}

export default SignIn;