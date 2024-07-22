import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <>
      <Container className="image-section max-width-500">
        <img className="login-image" src="/images/login.png" alt="login image" />
      </Container>
      <Container className="padding-40-24 max-width-500">
        <Typography className="welcome-text font-weight-900">Welcome!</Typography>
        <div className="margin-top-bottom-24">
          <TextField variant="outlined" label="Email Address" className="input-field" />
          <FormControl className="input-field" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput id='outlined-adornment-password' type='password' endAdornment={
              <InputAdornment position="end">
                <VisibilityOffIcon />
              </InputAdornment>
            } label="Password" />
          </FormControl>
        </div>
        <div className='margin-top-bottom-24'>
          <Button className='primary-button mb-16' variant='contained' color='primary'>Login</Button>
          <div className='not-a-member-section'>
            <Typography variant='caption'>Not a member? <Link to='/signUp' className='text-decoration-none'>Register Now</Link></Typography>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SignIn;