import * as React from 'react';
import { Box, Container } from "@mui/material";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Space } from 'antd';
import ChatToSingleCustomer from './ChatToSingleCustomer';


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

export default function MerchantChatToCustomer({ merchantId, allCustomer }) {
  allCustomer=new Array("21377223","21377006","21377227","21377226")
  merchantId = "21377223"
  function Each({customerId}){    
    return <Page merchantId={merchantId} customerId={customerId} />;
  }

  return (
    <Container>
      {allCustomer.map((item, index) => {
        return(
          <React.Fragment key={index}><Each customerId={item}/></React.Fragment>   
        );
      })}
    </Container>  
    )
}

function Page({merchantId,customerId}){
  
  //查询
  const imageM = "../../../images/img.jpg"
  const imageC = "../../../images/img.jpg"
  const NICKNAMEM = "nicknameM"
  const NiCKNAMEC = "nicknameC"
  const lastMessage = "hello"  //查询
  const time = "2024-1-1 10:00:00"
  
  const [isDotVisible, setIsDotVisible] = React.useState(true);
  const handleLinkClick = (merchantId,customerId) => {
    setIsDotVisible(false);
    ChatToSingleCustomer(merchantId,customerId);
  };
  
  const cm = customerId+"&"+merchantId
  console.log(cm)
  return (
  <Container>
     <List sx={{marginLeft:20, width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
          <Space size={24}>
            <Badge dot invisible={isDotVisible ? undefined : "false"}>
              <Avatar alt={customerId+"'s photo"} src={imageC} />
            </Badge>
          </Space>
        </ListItemAvatar>
        
        <a href={`/merchant/chat/merchant/${ cm }`} style={{textDecoration: "none"}} onClick={() => handleLinkClick(merchantId,customerId)}>
        <ListItemText
          primary={NiCKNAMEC}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {customerId}
              </Typography>
              {" — "+lastMessage+"    "+time}
            </React.Fragment>
          }
        />
        </a>
      </ListItem>
      <Divider variant="inset" component="li" />
      
      
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
        <Copyright sx={{marginLeft:55, mt: 5 }} />
      </Box>
  </Container>
  );

}