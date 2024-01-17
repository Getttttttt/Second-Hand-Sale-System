import * as React from 'react';
import { Box, Container } from "@mui/material";
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Space } from 'antd';
import ChatToSingleMerchant from './ChatToSingleMerchant';

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


export default function CustomerChatToMerchantList() {
  let { customerId } = useParams();
  
  const getMerchantList = async (event) => {
    const jsonData = JSON.stringify({
      customerId: customerId
    })
    
    try{
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
  
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/chatToMerchantList',{
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据
      const responseData = await response.json();
      console.log(responseData);
      setAllMerchants(responseData);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const [allMerchants, setAllMerchants] = React.useState([])

  function Each({merchantId}){    
    return <Page merchantId={merchantId} customerId={customerId} />;
  }

  return (
    <Container>
      {getMerchantList}

      {allMerchants.map((item, index) => {
        return(
          <React.Fragment key={index}><Each merchantId={item}/></React.Fragment>   
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
    ChatToSingleMerchant(merchantId,customerId);
  };
  
  const mc = merchantId+"&"+customerId
  return (
  <Container>
     <List sx={{marginLeft:20, width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
          <Space size={24}>
            <Badge dot invisible={isDotVisible ? undefined : "false"}>
              <Avatar alt={merchantId+"'s photo"} src={imageM} />
            </Badge>
          </Space>
        </ListItemAvatar>
        
        <a href={`/customer/chat/merchant/${ mc }`} style={{textDecoration: "none"}} onClick={() => handleLinkClick(merchantId,customerId)}>
        <ListItemText
          primary={NICKNAMEM}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', fontSize:"14px"}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {merchantId}
              </Typography>
              {" — "+lastMessage+"    "+time}
            </React.Fragment>
          }/>
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