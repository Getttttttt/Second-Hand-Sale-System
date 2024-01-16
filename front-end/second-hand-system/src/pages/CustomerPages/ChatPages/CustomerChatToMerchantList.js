import * as React from 'react';
import { Box, Container } from "@mui/material";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import ChatToSingleCustomer from '../../MerchantPages/ChatPages/ChatToSingleCustomer';

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

export default function CustomerChatToMerchantList(customerId,{ allMerchants }) {
  allMerchants={1:"21377225",2:"21377006"}
  customerId = "21377225"

  const image = "xxx"  //查询商家
  const nickname =  "abc"
  
  return (
    <Container>
      <Page />

    </Container>
  )
}



function Page(){
  const image = "/node_modules/jsdom/lib/jsdom/browser/resources/image/img.jpg"
  const id = "merchantID"
  const nickname = "nickname"
  const lastMessage = "hello"  //查询
  const time = "2024-1-1 10:00:00"
  const communication = [
    ["21377223", 'get', "21377225", 'rita', 'Hello!', "customer"],
    ["21377223", 'get', "21377225", 'rita', 'Hi,what can I do for you?', "merchant"],
    ["21377223", 'get', "21377225", 'rita', 'I want to know more about the book.', "customer"],
  ]

  return (
  <Container>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <a href='/customer/chat/merchant/' className="no-underline">
          <ChatToSingleCustomer 
            communication={communication}
            image={image}  
          />
        <ListItemAvatar>
          <Space size={24}>
            <Badge dot>
              <Avatar alt={id+"'s photo"} src={image} />
            </Badge>
          </Space>
        </ListItemAvatar>
        <ListItemText
          primary={nickname}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {id}
              </Typography>
              {" — "+lastMessage+"    "+time}
            </React.Fragment>
          }
        />
        </a>
      </ListItem>
      <Divider variant="inset" component="li" />
      
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Space size={24}>
            <Badge dot>
              <Avatar alt={id+"'s photo"} src={image} />
            </Badge>
          </Space>
        </ListItemAvatar>
        <ListItemText
          primary={nickname}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {id}
              </Typography>
              {" — "+lastMessage+"    "+time}
            </React.Fragment>
          }
        />
      </ListItem>
      </List>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          position: 'absolute',
          bottom: 2,
          justifyContent: 'center',
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Box>
      
  </Container>
  );

}