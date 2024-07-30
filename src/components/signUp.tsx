import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpDetail } from '../@types/users';
import { axiosInstance } from '../utils/axiosConfig';
import { useSnackbar } from './snackbar';

function SignUp() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstName && lastName && email && password && confirmPassword && gender && mobile && dob && address && check) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName, email, password, confirmPassword, gender, mobile, dob, address, check]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const checkMobile = (value: string) => {
    if (/^\d*$/.test(value)) {
      setMobile(value);
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (firstName && lastName && email && password && (password === confirmPassword) && gender && mobile && mobile.length == 10 && dob && address && check) {
      const dobObject = dayjs(dob);
      const formattedDate = dobObject.format('YYYY-MM-DD');

      const userDetail: SignUpDetail = {
        firstName,
        lastName,
        email,
        password,
        gender,
        mobile,
        formattedDate,
        profileUrl: profileUrl || null,
        address
      };

      axiosInstance.post('sign-up', userDetail).then((res) => {
        if (res.data) {
          openSnackbar('User Created Successfully', 'snackbar-success');
          navigate('/');
        }
      }).catch((err) => {
        openSnackbar(err.response.data, 'snackbar-error');
      })
    }
  }

  return (
    <>
      <Box className="centered-container">
        <Container className="padding-40-24 max-width-500">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className="sign-up-text font-weight-900 mb-16">Sign up</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="create-account-text font-size-12">Create an account to get started</Typography>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={12}>
              <InputLabel className="input-label font-size-12">Email Address</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !email ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="name@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={(isSubmitted && !email) || (isSubmitted && !validateEmail(email))}
                  helperText={(isSubmitted && !email && 'Enter Email') || (isSubmitted && !validateEmail(email) && 'Enter valid email')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel className="input-label font-size-12" htmlFor="outlined-adornment-password">Password</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      {showPassword ? <VisibilityOffIcon onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }} /> : <Visibility onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }} />}
                    </InputAdornment>
                  }
                  placeholder="Create a password"
                  name="password"
                  value={password}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onChange={(e) => setPassword(e.target.value)}
                  error={isSubmitted && !password}
                />
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !password && 'Enter Password'}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel className="input-label font-size-12" htmlFor="outlined-adornment-password" sx={{ visibility: 'hidden' }}>Confirm Password</InputLabel>
              <FormControl className="input-field" variant="outlined">
                <OutlinedInput
                  id='outlined-adornment-confirm-password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      {showConfirmPassword ? <VisibilityOffIcon onClick={handleClickShowConfirmPassword} sx={{ cursor: 'pointer' }} /> : <Visibility onClick={handleClickShowConfirmPassword} sx={{ cursor: 'pointer' }} />}
                    </InputAdornment>
                  }
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={isSubmitted && !confirmPassword}
                />
                {
                  !confirmPassword ?
                    <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !confirmPassword && 'Enter Confirm Password'}</FormHelperText> :
                    <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && confirmPassword && password !== confirmPassword && 'Password and Confirm Password does not match'}</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="input-field" style={{ marginBottom: isSubmitted && !gender ? 0 : 16 }}>
                <FormLabel className="input-label font-size-12">Gender</FormLabel>
                <RadioGroup sx={{ flexDirection: 'row' }} name='gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <FormHelperText sx={{ marginLeft: 0, color: '#d32f2f' }}>{isSubmitted && !gender && 'Please Select Gender'}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel className="input-label font-size-12">Mobile</InputLabel>
              <FormControl className="input-field" variant="outlined" style={{ marginBottom: isSubmitted && !mobile ? 0 : 16 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="1234567890"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => checkMobile(e.target.value)}
                  error={(isSubmitted && !mobile) || (isSubmitted && mobile.length < 10)}
                  helperText={(isSubmitted && !mobile && 'Enter Mobile Number') || (isSubmitted && mobile.length < 10 && 'Mobile number must have 10 digits')}
                  inputProps={{ maxLength: 10 }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Button className="primary-button mb-16" variant="contained" color="primary" disabled={disabled} onClick={handleSubmit}>Sign up</Button>
              <div className='text-center'>
                <Typography variant='caption'>Already a member? <Link to='/' className='text-decoration-none'>Sign in</Link></Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default SignUp;