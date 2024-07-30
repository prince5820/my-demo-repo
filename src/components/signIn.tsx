import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Button, Container, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosConfig';
import { useSnackbar } from './snackbar';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { openSnackbar } = useSnackbar();
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (pathName === '/') {
      if (email && password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (email) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [email, password]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (email && password) {
      axiosInstance.get(`sign-in/${email}`).then((res) => {
        if (res.data) {
          const user = res.data[0];
          if (user.email === email && user.password === password) {
            openSnackbar('User logged in successfully', 'snackbar-success');
            navigate('/dashboard');
          } else {
            openSnackbar('Email and Password does not match', 'snackbar-error');
          }
        }
      }).catch((err) => {
        openSnackbar(err.response.data, 'snackbar-error');
      })
    }
  }

  const handleForgotPassword = () => {
    setIsSubmitted(true);
    if (email) {
      axiosInstance.get(`forgot-password/${email}`).then((res) => {
        if (res) {
          openSnackbar(res.data, 'snackbar-success');
          navigate('/');
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
          <Grid container spacing={1}>
            {
              pathName === '/' &&
              <Grid item xs={12}>
                <Typography className="welcome-text font-weight-900">Welcome!</Typography>
              </Grid>
            }
            <Grid item xs={12}>
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
            </Grid>
            {
              pathName === '/' &&
              <Grid item xs={12}>
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
              </Grid>
            }
            {
              pathName === '/' ?
                <Grid item xs={12}>
                  <Button className='primary-button mb-16' variant='contained' color='primary' onClick={handleSubmit} disabled={disabled}>Login</Button>
                  <div className='text-center mb-16'>
                    <Typography variant='caption'>Not a member? <Link to='/sign-up' className='text-decoration-none'>Register Now</Link></Typography>
                  </div>
                  <div className='text-center'>
                    <Typography variant='caption'><Link to='/forgot-password' className='text-decoration-none'>Forgot Password?</Link></Typography>
                  </div>
                </Grid> :
                <Grid item xs={12}>
                  <Button className='primary-button mb-16' variant='contained' color='primary' onClick={handleForgotPassword} disabled={disabled}>Forgot Password</Button>
                </Grid>
            }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default SignIn;