import React, { useState } from 'react';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { updateSignInData } from '../../../state/signInDataSlice';
import {Alert} from '@mui/material';
import {AlertTitle} from '@mui/material';
import { Height } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInForCustomer() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signInData = useSelector((state) => state.signInData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = JSON.stringify({
      telephone: data.get('telephone'),
      password: data.get('password'),
    });

    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/signIn', {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 处理返回的数据
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.message === "Search Successful") {
        dispatch(updateSignInData({ customerID: data.get('telephone') }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/customer');
        }, 2000);
      }

      else {
        setShowFailureMessage(true);
        setTimeout(() => {
          setShowFailureMessage(false);
        }, 2000);
      }
      
      console.log(signInData.customerID);
  
      // 执行下一步操作
      // 例如：更新UI或状态等
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              height:60,
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {showSuccessMessage && 
              <Alert severity="success">Page'll navigate to Customer Center after 2s</Alert>}
            {showFailureMessage && 
              <Alert severity="error">Account no exist or Password incorrect.</Alert>}
          </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in as Customer
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Telephone Number"
              name="telephone"
              autoComplete="telephone"
              autoFocus
            />
            <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          required
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name='password'
                    label="Password"
                  />
                </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/customer/validate/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}