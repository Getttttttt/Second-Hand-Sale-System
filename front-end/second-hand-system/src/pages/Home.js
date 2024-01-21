import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/logo.svg'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import GradingIcon from '@mui/icons-material/Grading';

const drawerWidth = 180;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function mapString(inputString) {
  if (inputString === "Customer") {
    return "/customer";
  } else if (inputString === "Book") {
    return "/home";
  } else if (inputString === "Merchant" ){
    return "/merchant";
  } else if (inputString === 'Customer Sign In'){
    return "/"
  }
}


function Home({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signInData = useSelector((state) => state.signInData);

  const pages = ['主页', '客户中心', '商家中心'];

  const settings = ['资料', '账号', '面板', '退出'];

  /*
  if (signInData.customerID !== '') {
    settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Merchant'];
  }
  else if(signInData.merchantID !== ''){
    settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  }
  else {
    settings = ['Customer Sign In', ' Customer Register', 'Dashboard', 'Logout'];
  }*/
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log(signInData)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('搜索内容:', searchTerm);
    // 在这里添加搜索的逻辑
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickCustomerRegister = () => {
    navigate('/customer/validate/register');
  };

  const handleClickCustomerSignIn = () => {
    navigate('/customer/validate/signin');
  };

  const handleClickMerchantRegister = () => {
    navigate('/merchant/validate/register');
  };

  const handleClickMerchantSignIn = () => {
    navigate('/merchant/validate/signin');
  };

  const handleClickCustomerShoppingBucket = () => {
    navigate('/customer/bookbacket/'+signInData.customerID);
  };

  const handleClickCustomerChatting = () => {
    navigate('/customer/chat/'+signInData.customerID);
  };

  const handleClickCustomerOrderList = () => {
    navigate('/customer/purchased/'+signInData.customerID);
  };

  const handleClickMerchantAddBook = () => {
    navigate('/merchant/addsalebook/'+signInData.merchantID);
  };

  const handleClickMerchantChatting = () => {
    navigate('/merchant/chat/'+signInData.merchantID);
  };

  const handleClickMerchantOrderList = () => {
    navigate('/merchant/saled/'+signInData.merchantID);
  };

  return (
    <Container maxWidth="String" >
      <AppBar position="fixed" open={open}>
        <Container maxWidth="String">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src = {logo}  mx-auto="True" d-block="True" width={50} height={50}></img>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logo}></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to={mapString(page)}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Search>
                <SearchIconWrapper onClick={handleSearch}>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="搜索书籍……"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </Search>
            </Box>
            <Box sx={{ flexGrow: 0 ,margin: 2}}><p>   </p></Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link to={mapString(setting)}>
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </Link>              
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {signInData.customerID !== "" ?
        (<List>
            <ListItem key="购物车" disablePadding>
              <ListItemButton onClick={handleClickCustomerShoppingBucket}>
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="购物车" />
              </ListItemButton>
            </ListItem>
            <ListItem key="商家沟通" disablePadding>
              <ListItemButton onClick={handleClickCustomerChatting}>
                <ListItemIcon>
                  <ChatIcon/>
                </ListItemIcon>
                <ListItemText primary="商家沟通" />
              </ListItemButton>
            </ListItem>
            <ListItem key="订单记录" disablePadding>
              <ListItemButton onClick={handleClickCustomerOrderList}>
                <ListItemIcon>
                  <GradingIcon/>
                </ListItemIcon>
                <ListItemText primary="订单记录" />
              </ListItemButton>
            </ListItem>
        </List>) :
        (<List>
          <ListItem key="客户登录" disablePadding>
            <ListItemButton onClick={handleClickCustomerSignIn}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="客户登录" />
            </ListItemButton>
          </ListItem>
          <ListItem key="客户注册" disablePadding>
            <ListItemButton onClick={handleClickCustomerRegister}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="客户注册" />
            </ListItemButton>
          </ListItem>
      </List>)
        }
        <Divider />
        {signInData.merchantID !== "" ?
        (<List>
            <ListItem key="添加商品" disablePadding>
              <ListItemButton onClick={handleClickMerchantAddBook}>
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="添加商品" />
              </ListItemButton>
            </ListItem>
            <ListItem key="客户沟通" disablePadding>
              <ListItemButton onClick={handleClickMerchantChatting}>
                <ListItemIcon>
                  <ChatIcon/>
                </ListItemIcon>
                <ListItemText primary="客户沟通" />
              </ListItemButton>
            </ListItem>
            <ListItem key="订单记录" disablePadding>
              <ListItemButton onClick={handleClickMerchantOrderList}>
                <ListItemIcon>
                  <GradingIcon/>
                </ListItemIcon>
                <ListItemText primary="订单记录" />
              </ListItemButton>
            </ListItem>
        </List>) :
        (<List>
          <ListItem key="商家登录" disablePadding>
            <ListItemButton onClick={handleClickMerchantSignIn}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="商家登录" />
            </ListItemButton>
          </ListItem>
          <ListItem key="商家注册" disablePadding>
            <ListItemButton onClick={handleClickMerchantRegister}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="商家注册" />
            </ListItemButton>
          </ListItem>
      </List>)
        }
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          {children}
      </Main>
    </Container>
  );
}
  


export default Home;