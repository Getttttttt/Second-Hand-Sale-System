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


export default function CustomerChatToMerchantList() {
  let { customerId } = useParams();
  console.log(customerId)
  const [allMerchants, setAllMerchants] = React.useState([])

  React.useEffect(() => {
    const getMerchantList = async (event) => {
      const jsonData = JSON.stringify({
        customerId: customerId
      })
      console.log(jsonData)
      
      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
        console.log(myHeaders)

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
        console.log("back to js")
        console.log(responseData)
        const merchantIds = responseData.map(item => item.merchantId);
        setAllMerchants(merchantIds);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    getMerchantList();
  }, [customerId]);

  function Each({merchantId}){    
    return <Page merchantId={merchantId} customerId={customerId} />;
  }

  return (
    <Container>
      {allMerchants.map((item, index) => {
        return(
          <React.Fragment key={index}><Each merchantId={item}/></React.Fragment>   
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
    
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/lastMessage',{
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
        const imageM = responseData.map(item => item.imageM);
        const nicknameM = responseData.map(item => item.nicknameM);
        setLastContent([lastMessage,time,imageM,nicknameM]);
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
  const imageM = lastContent[2]
  const NICKNAMEM = lastContent[3]
  
  const [isDotVisible, setIsDotVisible] = React.useState(true);
  const handleLinkClick = () => {
    setIsDotVisible(false);
    ChatToSingleMerchant();
  };
  
  const mc = merchantId+"&"+customerId
  return (
  <Container>
     <List sx={{marginLeft:20, width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Space size={24}>
            <Badge dot invisible={isDotVisible ? undefined : "false"}>
              <Avatar alt={merchantId+"'s photo"} src={img1}/>
            </Badge>
          </Space>
        </ListItemAvatar>
        
        <a href={`/customer/chat/merchant/${ mc }`} style={{textDecoration: "none"}} onClick={() => handleLinkClick()}>
        <ListItemText
          primary=
          {
            <Typography 
              sx={{ display: 'inline', fontSize: "18px", fontFamily: "Arial", fontWeight: "bold" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {NICKNAMEM}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', fontSize:"14px"}}
                component="span"
                variant="body2"
                color="blue"
              >
                {merchantId}
              </Typography>
              {" — "+lastMessage}
              {"    "+time}
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