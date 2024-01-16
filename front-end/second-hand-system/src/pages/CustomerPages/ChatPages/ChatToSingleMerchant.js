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
import { useParams } from 'react-router-dom';

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


function ChatCanvas(merchantId, nicknameM, customerId, nicknameC, message, fromWho,imageM,imageC){
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
            <Popover content={customerId} title={nicknameM}>
              <Typography variant="body1">{message}</Typography>
            </Popover>
            <Avatar alt={merchantId+"'s photo"} src={imageC} />

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
            <Avatar alt={merchantId+"'s photo"} src={imageM} />
            <Popover content={merchantId} title={nicknameM}>
              <Typography variant="body1">{message}</Typography>
            </Popover>

          </space>
        </Box>
      </Container>
    )
  }
}




const ChatToSingleMerchant = () => {
  let { mc } = useParams();
  mc = mc.split("&")
  const merchantId = mc[0]
  const customerId = mc[1]
  
  //根据商家id和用户id查询沟通记录
  const c = [
    ["21377223", 'get', "21377225", 'rita', 'Hello!', "customer", "customer", "../../../images/img.jpg", "../../../images/img.jpg"],
    ["21377223", 'get', "21377225", 'rita', 'Hi, what can I do for you?', "merchant", "customer", "../../../images/img.jpg", "../../../images/img.jpg"],
    ["21377223", 'get', "21377225", 'rita', 'I want to know more about the book.', "customer", "customer", "../../../images/img.jpg", "../../../images/img.jpg"],
  ]
  var MERCHANTID
  var NICKNAMEM
  var CUSTOMERID
  var NICKNAMEC
  var message
  var fromWho
  var IMAGEM
  var IMAGEC

  function Each({merchantId,nicknameM,customerId,nicknameC,message,fromWho,imageM,imageC}){  
    return <ChatCanvas  merchantId={merchantId} nicknameM={nicknameM} customerId={customerId} nicknameC={nicknameC} message={message} fromWho={fromWho} imageM={imageM} imageC={imageC}/>;
  }

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
    ChatCanvas(MERCHANTID, NICKNAMEM, CUSTOMERID, NICKNAMEC, message, "customer", IMAGEC);
    setInputValue('');
    setChatHistory(...chatHistory,inputValue)
  }
  
  return (
    <Container className="chat-container">
      <Container className="header" style={{position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Box
        style={{backgroundColor:"#2979ff"}}
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
        <p className="name" style={{ fontSize: '20px', fontWeight: "bold", color:"white" }}> {NICKNAMEM}</p>
        </Box>
      </Container>
      <Container>
      {
        c.map((item, index) => {
          console.log(item)
          return(
            
            <React.Fragment key={index}><Each merchantId={item[0]} nicknameM={item[1]} customerId={item[2]} nicknameC={item[3]} message={item[4]} fromWho={item[5]} imageM={item[6]} imageC={item[7]}/></React.Fragment>   
          );
          })
      }
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
            onClick={sendMessage} 
            endIcon={<SendIcon />}
            variant="contained"
            size="small"
            sx={{ mt: 5, mb: 5 }}>Send</Button>
        </Space>
      </Box>
      <Copyright justifyContent="center"/>
    </Container>
  </Container>
  );
}



export default ChatToSingleMerchant;