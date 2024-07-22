import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [mobile, setMobile] = useState<number | null>(null);
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  }

  return (
    <>
      <Box className="centered-container">
        <Container className="padding-40-24 max-width-500">
          <Typography className="sign-up-text font-weight-900 mb-16">Sign up</Typography>
          <Typography className="create-account-text font-size-12">Create an account to get started</Typography>
          <div className="margin-top-bottom-24">
            <div>
              <InputLabel className="input-label font-size-12">First Name</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !firstName ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={isSubmitted && !firstName}
                  helperText={isSubmitted && !firstName && 'Enter First Name'}
                />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Last Name</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !lastName ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={isSubmitted && !lastName}
                  helperText={isSubmitted && !lastName && 'Enter Last Name'}
                />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Email Address</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !email ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="name@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={isSubmitted && !email}
                  helperText={isSubmitted && !email && 'Enter Email'}
                />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12" htmlFor="outlined-adornment-password">Password</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput
                  id='outlined-adornment-password'
                  type='password'
                  endAdornment={
                    <InputAdornment position="end">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  }
                  placeholder="Create a password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={isSubmitted && !password}
                />
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !password && 'Enter Password'}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput
                  id='outlined-adornment-confirm-password'
                  type='password'
                  endAdornment={
                    <InputAdornment position="end">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  }
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={isSubmitted && !confirmPassword}
                />
                {
                  !confirmPassword ?
                    <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !confirmPassword && 'Enter Confirm Password'}</FormHelperText> :
                    <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && confirmPassword && password !== confirmPassword && 'Password and Confirm Password does not match'}</FormHelperText>
                }
              </FormControl>
            </div>
            <div>
              <FormControl className="input-field" style={{ marginBottom: isSubmitted && !gender ? 0 : 16 }}>
                <FormLabel className="input-label font-size-12">Gender</FormLabel>
                <RadioGroup sx={{ flexDirection: 'row' }} name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !gender && 'Please Select Gender'}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Mobile</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !mobile ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="1234567890"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(Number(e.target.value))}
                  error={isSubmitted && !mobile}
                  helperText={isSubmitted && !mobile && 'Enter Mobile Number'}
                />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">DOB</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="input-field"
                  name="dob"
                  value={dob}
                  onChange={(date) => setDob(date)}
                />
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !dob && 'Enter DOB'}</FormHelperText>
              </LocalizationProvider>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Profile Url (optional)</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  name="profileUrl"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <InputLabel className="input-label font-size-12">Address</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !address ? 0 : 16 }}>
                <TextField
                  type="text"
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={isSubmitted && !address}
                  helperText={isSubmitted && !address && 'Enter Address'}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className='input-field'>
                <FormControlLabel control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />} label={
                  <>
                    I've read and agree with the
                    <Link className="text-decoration-none" to='#'> Terms and Conditions </Link>
                    and the
                    <Link className="text-decoration-none" to='#'> Privacy Policy.</Link>
                  </>
                } />
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !check && 'Please Confirm Terms and Conditions'}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="margin-top-bottom-24">
            <Button className="primary-button mb-16" variant="contained" color="primary" onClick={handleSubmit}>Sign up</Button>
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