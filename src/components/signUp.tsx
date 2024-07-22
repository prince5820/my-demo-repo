import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignUp() {
  return (
    <>
      <Box className="centered-container">
        <Container className="padding-40-24 max-width-500">
          <Typography className="sign-up-text font-weight-900 mb-16">Sign up</Typography>
          <Typography className="create-account-text font-size-12">Create an account to get started</Typography>
          <div className="margin-top-bottom-24">
            <div>
              <InputLabel className="input-label font-size-12">Name</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput type="text" placeholder="Name" />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Email Address</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput type="text" placeholder="name@email.com" />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12" htmlFor="outlined-adornment-password">Password</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput id='outlined-adornment-password' type='password' endAdornment={
                  <InputAdornment position="end">
                    <VisibilityOffIcon />
                  </InputAdornment>
                } placeholder="Create a password" />
              </FormControl>
            </div>
            <div>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput id='outlined-adornment-confirm-password' type='password' endAdornment={
                  <InputAdornment position="end">
                    <VisibilityOffIcon />
                  </InputAdornment>
                } placeholder="Confirm password" />
              </FormControl>
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label={
                <>
                  I've read and agree with the
                  <Link className="text-decoration-none" to='#'> Terms and Conditions </Link>
                  and the
                  <Link className="text-decoration-none" to='#'> Privacy Policy.</Link>
                </>
              } />
            </div>
          </div>
          <div className="margin-top-bottom-24">
            <Button className="primary-button mb-16" variant="contained" color="primary">Sign up</Button>
            <div className='not-a-member-section'>
              <Typography variant='caption'>Already a member? <Link to='/' className='text-decoration-none'>Sign in</Link></Typography>
            </div>
          </div>
        </Container>
      </Box>
    </>
  )
}

export default SignUp;