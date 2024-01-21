import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
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
import {Alert} from '@mui/material';
import {AlertTitle} from '@mui/material';
import { Height } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Home from '../../Home';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Java Get
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegisterForCustomer() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    // convert form to JSON
    const jsonData = JSON.stringify({
      telephone: data.get('telephone'),
      password: data.get('password'),
      nickname: data.get('nickname'),
      address: data.get('address'),
    });
  
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/signUpNewUser', {
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
      
      if (responseData.message === "Insert Successful") {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/customer/validate/signin');
        }, 2000);
      }

      else {
        setShowFailureMessage(true);
        setTimeout(() => {
          setShowFailureMessage(false);
        }, 2000);
      }


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
    <Home>
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
              height:50,
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {showSuccessMessage && 
              <Alert severity="success">Page'll navigate to Sign In after 2s</Alert>}
            {showFailureMessage && 
              <Alert severity="error">Please try again</Alert>}
          </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            注册成为客户
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="昵称"
                  name="nickname"
                  autoComplete="昵称"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                  fullWidth
                  id="telephone number"
                  label="手机号码"
                  name="telephone"
                  autoComplete="telephone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="delivery address"
                  label="配送地址"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name='password'
                    label="密码"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="我希望收到邮件通知"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              注册
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/customer/validate/signin" variant="body2">
                  已经有了账号? 去登陆
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </Home>
  );
}