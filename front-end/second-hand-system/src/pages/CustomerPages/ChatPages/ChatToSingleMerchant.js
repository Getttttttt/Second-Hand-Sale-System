import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { CustomerServiceFilled, UserOutlined } from '@ant-design/icons';
import SendIcon from "@mui/icons-material/Send.js";
import { Avatar, Badge, Space, Popover } from 'antd';

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


function ChatCanvas(merchantId, nicknameM, customerId, nicknameC, message, fromWho,image){
  /*const image = "/node_modules/jsdom/lib/jsdom/browser/resources/image/img.jpg"
  const id = "ID"
  const nickname = "nickname"
  const message = "hello!"
  const fromWho = "customer"*/
  
  const boxcontentleftStle = {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100vh',
    marginLeft: '160px',
  }
  const boxcontentrightStle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100vh',
    marginRight: '160px',
  }

  if(fromWho==="customer"){  
    return(
      <Container sx={{justifyContent: 'flex-end'}}>
        <Box 
          style={boxcontentrightStle}
          sx={{
            marginTop: 13,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <space>
            <Popover content={merchantId} title={nicknameM}>
              <Button type="primary">{message}</Button>
            </Popover>
            <d>  </d>
            <Avatar alt={merchantId+"'s photo"} src={image} />

          </space>
        </Box>
      </Container>
  )
  }
  if(fromWho==="merchant"){
    return(
      <Container>
        <Box 
          style={boxcontentleftStle}
          sx={{
            marginTop: 13,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <space>
            <Avatar alt={merchantId+"'s photo"} src={image} />
            <d>  </d>
            <Popover content={merchantId} title={nicknameM}>
              <Button type="primary">{message}</Button>
            </Popover>

          </space>
        </Box>
      </Container>
    )
  }
}




export default function ChatToSingleMerchant({ communication },image) {
  
  var merchantId
  var nicknameM
  var customerId
  var nicknameC
  var message
  var fromWho

  communication.map((item, index) => (
    merchantId = item[0],
    nicknameM = item[1],
    customerId = item[2],
    nicknameC = item[3],
    message = item[4],
    fromWho = item[5] 
  ))
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  /*const [messages, setMessages] = useState([]);
  const [inputValue,setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // 处理发送消息
  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        content: inputValue,
        sender: 'user', // 假设用户发送的消息
        timestamp: new Date().getTime() // 当前时间戳
      };
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };*/

  const boxsendStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100vh'
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
    height: '100vh'
  }

  const sendMessage = () => {
    ChatCanvas(merchantId, nicknameM, customerId, nicknameC, message, fromWho, image = {image} );
    setInputValue('');
    setChatHistory(...chatHistory,inputValue)
  }
  
  return (
    <container className="chat-container">
      <container className="header" style={{position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: 'lightgray' }}>
        <Box
        style={{backgroundColor:"lightblue"}}
        sx={{
          display:'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
          marginTop: 2,
          width: 1500,
          height: 50,
          display: 'flex',
          position: 'absolute',
          top: 2,
        }}>
        <p class="name" style={{ fontSize: '20px', fontWeight: "bold" }}> {nicknameM}</p>
        </Box>
      </container>
      <ChatCanvas 
        merchantId={merchantId}
        nicknameM = {nicknameM}
        customerId = {customerId}
        nicknameC = {nicknameC}
        message = {message}
        fromWho = {fromWho}
        image = {image} 
      />
    <container className="chat-input" style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <Box
      style={boxsendStyle}
      sx={{
        width: 1500,
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
          <d>  </d>
          <Button 
            onClick={sendMessage} 
            endIcon={<SendIcon />}
            variant="contained"
            size="small"
            sx={{ mt: 5, mb: 5 }}>Send</Button>
        </Space>
      </Box>
    </container>
  </container>
  );
}
