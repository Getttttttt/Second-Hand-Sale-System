import React from 'react';
import { Container } from '@mui/material';
import { Typography,  Box, TextField, Button  } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RecommendIcon from '@mui/icons-material/Recommend';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SingleSaledBookEvaluation = () => {
  const { orderID } = useParams();
  const [order, setOrder] = React.useState(null);
  
  const fetchData = async () => {
    console.log(12);
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      console.log(3)

      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/evaluationDetail?orderID=${orderID}`, {
        method: 'GET',
        headers: myHeaders
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据

      console.log(1);

      const order = await response.json();
      
      console.log("back to js")
      console.log(order);
      setOrder(order); // 将获取的数据存储在detailData中
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!order) {
    return <div>订单未找到</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div style={{ width: '80%', backgroundColor: '#E3F2FD', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black', display: 'flex', alignItems: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
            <RecommendIcon sx={{ marginRight: '0.7rem' }} />
                评价详情
        </Typography>
        </div>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <AutoStoriesIcon sx={{ mr: 1 }} />
          订单号：{order.MainData}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          用户ID：{order.customerID}
        </Typography>

        <Box sx={{ border: '1px solid', p: 2, mt: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              评价等级：
            </Typography>
            {<Rating name="read-only" value={order.estimationScale} readOnly />}
          </div>
          
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            评价内容：
          </Typography>
          <Box sx={{ minWidth: 500 }}>
            <Card variant="outlined" sx={{ minWidth: 500, height: '100px' }}>
              <CardContent>
                <Typography>{order.evaluation}</Typography>
              </CardContent>
            </Card>
          </Box>
       </Box>
      </div>
    </div>
  );
}
export default SingleSaledBookEvaluation;