import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import SendIcon from "@mui/icons-material/Send.js";
import { Avatar, Space, Popover } from 'antd';
import { useParams } from 'react-router-dom';
import "../../../images/img.jpg"

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


function ChatCanvas({merchantId, nicknameM, customerId, nicknameC, message, fromWho,imageM,imageC}){
  console.log(merchantId)
  
  const boxcontentleftStle = {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '5vh',
    marginLeft: '70px',
  }
  const boxcontentrightStle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '5vh',
    marginRight: '70px',
  }

  if(fromWho==="merchant"){
    return(
        <Box 
          style={boxcontentrightStle}
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <React.Fragment>
            <Typography variant="body1" style={{ height:"35px", whiteSpace: 'pre', borderRadius:"5px", backgroundColor: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center" }}>{"  "+message+"  "}</Typography>
            <Typography variant="body1" style={{ whiteSpace: 'pre' }}>{"  "}</Typography>
            <Popover content={merchantId} title={nicknameM}>
              <Avatar alt={merchantId+"'s photo"} src={imageM} />
            </Popover>
          </React.Fragment>        
        </Box>
  )}
  if(fromWho==="customer"){
    return(
        <Box 
          style={boxcontentleftStle}
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: 'flex-start',
            whiteSpace: 'nowrap',
          }}
        >
          <React.Fragment>
            <Popover content={customerId} title={nicknameC}>
              <Avatar alt={customerId+"'s photo"} src={imageC} />
            </Popover>
            <Typography variant="body1" style={{ whiteSpace: 'pre' }}>{"  "}</Typography>
            <Typography variant="body1" style={{height:"35px", whiteSpace: 'pre', borderRadius:"5px", backgroundColor: "#e3f2fd", display: "flex", alignItems: "center", justifyContent: "center"}}>{"  "+message+" "}</Typography>

          </React.Fragment>
        </Box>
  )}
}


function Each({merchantId,nicknameM,customerId,nicknameC,message,fromWho,imageM,imageC}){  
  console.log(imageC)
  return <ChatCanvas  merchantId={merchantId} nicknameM={nicknameM} customerId={customerId} nicknameC={nicknameC} message={message} fromWho={fromWho} imageM={imageM} imageC={imageC}/>;
}


const ChatToSingleMerchant = () => {
  let { cm } = useParams();
  cm = cm.split("&")
  const customerId = cm[0]
  const merchantId = cm[1]
  //
  const [inputValue, setInputValue] = useState('');
  let [chatHistory, setChatHistory] = useState([]);
  const [showList, setShowList] = useState(true);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const sendMessage = (newMessage) => {
    setInputValue('');
    setShowList(false);
    const newChatHistory = [...chatHistory,[MERCHANTID, NICKNAMEM, CUSTOMERID, NICKNAMEC, newMessage, "merchant", IMAGEM, IMAGEC]]
    setChatHistory(newChatHistory);
    console.log(newChatHistory)
    console.log(chatHistory)
    return(
      <Container>
        <List sx={{marginLeft:20, marginTop:10, marginBottom:20, width: '100%', maxWidth: 800, bgcolor: 'transparent' }}>
        {
          newChatHistory.map((item, index) => {
            if(i<chatHistory.length){
              i=i+1
              return(
                <React.Fragment key={index}><Each merchantId={item[0]} nicknameM={item[1]} customerId={item[2]} nicknameC={item[3]} message={item[4]} fromWho={item[5]} imageM={item[6]} imageC={item[7]}/></React.Fragment>   
            );
          }})
        }
        </List>
      </Container> 
    )
  }

 //根据商家id和用户id查询沟通记录
  chatHistory = [
    [merchantId, 'get', customerId, 'rita', 'Hello!', "customer",  "../../../images/img.jpg", "../../../images/img.jpg"],
    [merchantId, 'get', customerId, 'rita', 'Hi, what can I do for you?', "merchant",  "../../../images/img.jpg", "../../../images/img.jpg"],
    [merchantId, 'get', customerId, 'rita', 'I want to know more about the book.', "customer",  "../../../images/img.jpg", "../../../images/img.jpg"],
    [merchantId, 'get', customerId, 'rita', 'I am glad to tell you.', "merchant", "../../../images/img.jpg", "../../../images/img.jpg"],
  ]
   var MERCHANTID = chatHistory[0][0]
   var NICKNAMEM = chatHistory[0][1]
   var CUSTOMERID = chatHistory[0][2]
   var NICKNAMEC = chatHistory[0][3]
   var message
   var fromWho
   var IMAGEM = chatHistory[0][6]
   var IMAGEC = chatHistory[0][7]


  const boxsendStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '5vh',
    backgroundColor: '#FFFFFF',
    marginBottom:20
  };
  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    width:'500px'
  };
  const boxheadStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '10vh',
    backgroundColor: '#FFFFFF'
  }
  
  let i = 0
  return (
    <Container className="chat-container">
      <Container className="header" style={{position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Box
        style={{backgroundColor:"#2979ff", borderRadius:"10px"}}
        sx={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
          marginTop: 2,
          width: 1150,
          height: 50,
          display: 'flex',
          position: 'absolute',
          top: 2,
        }}>
          <React.Fragment><Typography className="name" sx={{ marginTop:"2px", fontSize: '25px', fontWeight: "bold", color:"white",}}>{NICKNAMEC}</Typography></React.Fragment>
        </Box>
      </Container>
      <Container>
      
        <List sx={{marginLeft:20, marginTop:10, marginBottom:20, width: '100%', maxWidth: 800, bgcolor: 'transparent' }}>
        {
          chatHistory.map((item, index) => {
            if(i<chatHistory.length){
              console.log(i)
              console.log(item[0])
              i=i+1
              return(
                <React.Fragment key={index}><Each merchantId={item[0]} nicknameM={item[1]} customerId={item[2]} nicknameC={item[3]} message={item[4]} fromWho={item[5]} imageM={item[6]} imageC={item[7]}/></React.Fragment>   
            );
            
            }
        })}
        </List>
      </Container> 
    <Container className="chat-input" style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <Box
      style={boxsendStyle}
      sx={{
        width: 1200,
        height: 100,
        display: 'flex',
        position: 'absolute',
        bottom: 2,
      }}>
        <Space>
          <input
            style={inputStyle}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type your message..."
          />
          <Button 
            variant="contained" 
            onClick={() => sendMessage(inputValue)} 
            endIcon={<SendIcon />}
            size="small"
            sx={{ mt: 5, mb: 5, backgroundColor: "#2979ff", color: "#ffffff"}}>Send</Button>
        </Space>
      </Box >
      <Box style={{marginBottom: 0, backgroundColor: '#FFFFFF'}}>
        <Copyright justifyContent="center"/>
      </Box>
    </Container>
  </Container>
  );
}

export default ChatToSingleMerchant;