import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const defaultTheme = createTheme();

export default function CustomerCenter() {
  let { customerId } = useParams();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showFailureMessage, setShowFailureMessage] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [avatarImage, setAvatarImage] = React.useState('/image\/870d3733-bad7-4b87-a61e-8e0c94b75443_img1.jpg');
  const [nickname, setNickname] = React.useState('');  
  const [telephone, setTelephone] = React.useState(''); 
  const [address, setAddress] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 


  React.useEffect(() => {
    if (showSuccessMessage) {
      // 使用 setTimeout 等待两秒
      const timer = setTimeout(() => {
        // 两秒后将 showSuccessMessage 设置为 false，提示消息消失
        setShowSuccessMessage(false);
      }, 2000);

      // 清理定时器以防止内存泄漏
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  React.useEffect(() => {  //获取信息
    const getInformation = async (event) => {

      const jsonData = JSON.stringify({
        customerId: customerId
      })
      console.log(jsonData)
      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
        console.log(myHeaders)

        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/personalPage',{
          method: 'POST',
          headers: myHeaders,
          body: jsonData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //处理返回的数据
        const responseData = await response.json();
        console.log(responseData)
        console.log(responseData.nickname)
        
        setNickname(responseData.nickname);
        setTelephone(responseData.telephone);
        setAddress(responseData.address);
        setPassword(responseData.password);
        setAvatarImage(responseData.avatarImage);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    getInformation();

  }, [customerId]);


  const handleUpdateInformation = async (event) => {  //更新信息
    event.preventDefault();
  
    // convert form to JSON
    const jsonData = JSON.stringify({
      customerId: customerId,
      nickname: nickname,
      telephone: telephone,
      address: address,
      password: password,
      image: avatarImage
    });
  
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/updateInformation', {
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
      
      if (responseData.result === "Update Successful") {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate(`/customer/${customerId}`);
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
  
  const handleAvatar = async (event) => {  //更换头像
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file)
    const formData = new FormData();
    if (file) {
      try {
        console.log(nickname)
        formData.append("avatar", file);
        formData.append("customerId",customerId);
        formData.append("nickname",nickname);
        formData.append("password",password);
        formData.append("telephone",telephone);
        formData.append("address",address);

        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/uploadAvatar', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("111")
        // 处理返回的数据，可能是上传成功的信息
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.result==="Upload successful!"){
          // 更新 avatarImage 状态，可能是上传成功后返回的图片链接
          setAvatarImage(responseData.url);
        }
                
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

  }


  
  return (
    <ThemeProvider theme={defaultTheme}>
      {console.log(nickname)}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
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
              <Alert severity="success">信息更新成功</Alert>}
            {showFailureMessage && 
              <Alert severity="error">信息更新失败，请重试！</Alert>}
          </Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-input"
            type="file"
            onChange={handleAvatar}
          />
          <label htmlFor="avatar-input">
            
            <Avatar 
              sx={{ m: 1, bgcolor: 'primary.main', width: 70, height: 70 }}
              alt="Customer Avatar"
              src={"http:\/\/localhost:8080\/SecondHandSystemAPIs_war_exploded/"+avatarImage}
            >
            </Avatar>
          </label>
          <Typography component="h1" variant="h5">
            个人信息
          </Typography>
          <Box component="form" noValidate onSubmit={handleUpdateInformation} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="customerId"
                  label="用户ID"
                  name="CustomerId"
                  autoComplete="customerId"
                  value={telephone}
                  InputProps={{ readOnly: true, }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="昵称"
                  name="Nickname"
                  autoComplete="nickname"
                  value={nickname}
                  onChange={e =>setNickname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                  fullWidth
                  id="telephone number"
                  label="联系电话"
                  name="Telephone Number"
                  autoComplete="telephone"
                  value={telephone}
                  onChange={e =>setTelephone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="delivery address"
                  label="收货地址"
                  name="Delivery Address"
                  autoComplete="address"
                  value={address}
                  onChange={e =>setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" required>登录密码</InputLabel>
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
                    name='登录密码'
                    label="Password"
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpdateInformation}
            >
              修改信息
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );



}