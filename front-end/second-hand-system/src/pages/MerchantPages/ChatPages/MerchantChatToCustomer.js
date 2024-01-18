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
import ChatToSingleCustomer from './ChatToSingleCustomer';
import img1 from "../../../images/img1.svg"
import img2 from "../../../images/img2.svg"

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

export default function MerchantChatToCustomer() {
  let { merchantId } = useParams();
  const [allCustomer, setAllCustomer] = React.useState([])

  React.useEffect(() => {
    const getCustomerList = async (event) => {
      const jsonData = JSON.stringify({
        merchantId: merchantId
      })
      
      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
    
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/chatToCustomerList',{
          method: 'POST',
          headers: myHeaders,
          body: jsonData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //处理返回的数据
        const responseData = await response.json();
        console.log("back to js")
        console.log(responseData)
        const customerIds = responseData.map(item => item.customerId);
        setAllCustomer(customerIds);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    getCustomerList();
  }, [merchantId]);


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
  const [lastContent, setLastContent] = React.useState([])
  React.useEffect(() => {
    const getLastMessage = async (event) => {
      const jsonData = JSON.stringify({
        customerId: customerId,
        merchantId: merchantId
      })
      
      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
    
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/lastMessage',{
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
       setLastContent(responseData);
       const lastMessage = responseData.map(item => item.lastMessage);
       const time = responseData.map(item => item.time);
       const imageC = responseData.map(item => item.imageC);
       const NICKNAMEC = responseData.map(item => item.NICKNAMEC);
       setLastContent([lastMessage,time,imageC,NICKNAMEC]);
     } catch (error) {
       console.error('There was a problem with the fetch operation:', error);
     }
   };
   getLastMessage();
   console.log(lastContent)
  },[merchantId,customerId]);

  //查询
  const lastMessage = lastContent[0]  
  const time = lastContent[1]
  const imageC = lastContent[2]
  const NICKNAMEC = lastContent[3]
  
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
          primary={NICKNAMEC}
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