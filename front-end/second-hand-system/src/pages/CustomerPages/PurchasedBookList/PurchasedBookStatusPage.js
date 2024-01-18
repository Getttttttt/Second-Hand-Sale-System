import * as React from 'react';
import { Container, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { MainData, DetailData } from './CustomerListStore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function PurchasedBookStatusPage() {
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const currentDate = new Date();
  const options = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const formattedDate = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}`;
    options.push(formattedDate);
  }

  const renderOrderItem = (order) => {
    return (
      <React.Fragment key={order.bookID}>
        <Typography variant="caption" display="block" gutterBottom sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold',backgroundColor: 'lightblue'}}>
          订单号：{order.MainData} | 订单时间：{order.orderTime}
        </Typography>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar 
              alt={order.bookName}
              src={order.bookSurfacePic}
              variant="square"
              sx={{ width: 80, height: 100 , marginRight: '20px' }}
            >
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link
                to={`/customer/purchased/${order.MainData}`}
                style={{
                  cursor: 'pointer',
                  color: 'black',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}
              >
                {order.bookName}
              </Link>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" ,color: 'grey'}}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  作者：{order.bookAuthor} | 出版社：{order.bookPublisher}
                </Typography>
                <br />
                <br />
                <Typography
                  sx={{ display: "inline" ,
                        color: 'red', 
                        marginRight: '30px'}}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  数量：×{order.orderNum} 
                </Typography>
                <Typography
                  sx={{
                    display: "inline",
                    color: 'red', 
                    marginRight: '100px'
                  }}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  价格：{new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(order.orderPrice)} 
                </Typography>
                <Typography
                  sx={{ display: "inline" ,
                          color: 'grey',
                          marginRight: '30px'}}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  新旧程度：{order.bookdegree} 
                </Typography>
                <Typography
                  sx={{ display: "inline" ,
                          color: 'grey',
                          marginRight: '30px'}}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  订单状态：{order.orderStatus}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ float: 'right' }}>
                  {order.estimationScale === -1 ? (
                    <Button variant="outlined" href={`/customer/purchased/evaluation/${order.MainData}`}>
                      立即评价
                    </Button>
                  ):(
                    <Button variant="outlined" href={`/customer/purchased/evaluation/${order.MainData}`}>
                      查看评价
                    </Button>
                  )}
                </Stack>
              </React.Fragment>
            }            
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  };

  return (
    <Container>
      <br/>
      <div style={{ display: "flex", gap: "100px" }}>
        <Autocomplete
          disablePortal
          id="status-autocomplete"
          options={["已完成", "正在进行"]}
          value={selectedStatus}
          onChange={(event, newValue) => {
            setSelectedStatus(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="订单状态" style={{ width: "300px" }}/>}
        />
        <Autocomplete
          disablePortal
          id="time-autocomplete"
          options={options} 
          value={selectedTime}
          onChange={(event, newValue) => {
            setSelectedTime(newValue);
          }}
          freeSolo // 允许自行输入
          renderInput={(params) => (
            <TextField {...params} label="订单时间" style={{ width: "300px" }} />
          )}
        />
      </div>
      <List>
        {DetailData.filter((order) => {
          if (selectedStatus && order.orderStatus !== selectedStatus) {
            return false;
          }
          if (selectedTime && order.orderTime.split(" ")[0].slice(0, 7) !== selectedTime) {
            return false;
          }
          return true;
        }).map((order) => renderOrderItem(order))}
      </List>
    </Container>
  );
}







