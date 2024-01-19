import * as React from 'react';
import { Container, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
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
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function SaledBookStatusPage() {
  const { merchantID } = useParams();
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [DetailData, setDetailData] = React.useState([]);
  const [deleteResult, setDeleteResult] = React.useState(null);

  const currentDate = new Date();
  const options = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const formattedDate = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}`;
    options.push(formattedDate);
  }

  console.log(2)

  const fetchData = async () => {
    console.log(1);
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      console.log(3)

      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/orderList?merchantID=${merchantID}`, {
        method: 'GET',
        headers: myHeaders
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据

      console.log(1);

      const Data = await response.json();
      console.log(Data);
      const DetailData = Data.map(item => ({
        bookImages: item.bookImages[0].split(","),
        bookISBN: item.bookISBN.trim(),
        orderNum: item.orderNum,
        orderStatus: item.orderStatus.trim(),
        bookAuthor: item.bookAuthor.trim(),
        bookPublishTime: item.bookPublishTime,
        bookName: item.bookName.trim(),
        bookID: item.bookID.trim(),
        evaluation: item.evaluation.trim(),
        MainData: item.MainData.trim(),
        customerID: item.customerID.trim(),
        bookSurfacePic: item.bookSurfacePic.trim(),
        orderTime: item.orderTime,
        bookLabels: item.bookLabels.map(label => label.trim()),
        estimationScale: item.estimationScale,
        orderPrice: item.orderPrice,
        bookdegree: item.bookdegree.trim()
      }));
      console.log("back to js")
      console.log(DetailData);
      setDetailData(DetailData); // 将获取的数据存储在detailData中
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEvaluation = async (orderID) => {
    try {
      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/evaluationDelete?orderID=${orderID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setDeleteResult(true); // 删除成功
      } else {
        setDeleteResult(false); // 删除失败
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setDeleteResult(false); // 删除失败
    }
    {deleteResult === true && (
      <Alert severity="success">评论删除成功</Alert>
    )}
    {deleteResult === false && (
      <Alert severity="error">评论删除失败</Alert>
    )}
  };
  

  const renderOrderItem = (order) => {
    return (
      <React.Fragment key={order.bookID}>
        <Typography variant="caption" display="block" gutterBottom sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold',backgroundColor: 'lightblue'}}>
          订单号：{order.MainData} | 订单时间：{order.orderTime} | 用户ID：{order.customerID}
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
                to={`/merchant/saled/book/${order.MainData}`}
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
                    <Button disabled>
                      未评价
                    </Button>
                  ) : (
                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button href={`/customer/purchased/evaluation/${order.MainData}`}>
                      查看评价
                    </Button>
                    <Button onClick={handleDeleteEvaluation(order.MainData)}>
                      删除评价
                    </Button>
                  </ButtonGroup>
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
        {DetailData && DetailData.filter((order) => {
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