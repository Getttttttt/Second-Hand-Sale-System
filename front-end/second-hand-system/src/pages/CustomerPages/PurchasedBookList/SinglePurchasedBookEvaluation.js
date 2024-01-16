import React from 'react';
import { Container } from '@mui/material';
import { Typography,  Box, TextField, Button  } from '@mui/material';
import { MainData, DetailData } from './store';
import { useParams } from 'react-router-dom';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RecommendIcon from '@mui/icons-material/Recommend';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';

const SinglePurchasedBookEvaluation = () => {
  const { orderID } = useParams();
  const [order, setOrder] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [evaluation, setEvaluation] = React.useState('');
  
  React.useEffect(() => {
    const foundOrder = DetailData.find(item => item.MainData === orderID);
    setOrder(foundOrder);
  }, [orderID]);

  if (!order) {
    return <div>订单未找到</div>;
  }
  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleEvaluationChange = (event) => {
    setEvaluation(event.target.value);
  };
  const handleSubmit = () => {
    // 在这里处理提交逻辑
    console.log('评价等级：', rating);
    console.log('评价内容：', evaluation);
  };

  if (order.estimationScale === -1) {
    // 显示评价表单
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div style={{ width: '80%', backgroundColor: '#E3F2FD', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black', display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>
              评价详情
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <AutoStoriesIcon sx={{ mr: 1 }} />
              订单号：
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 30 }}>
              {order.MainData}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <AddBusinessIcon sx={{ mr: 1 }} />
                商家号：
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              {order.merchantNumber}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '1rem' }}>
                <div style={{ width: '180px', height: '240px', border: '0.5px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginLeft: '3rem', marginTop: '1rem'}}>
                  <img src={order.bookSurfacePic} alt="商品封面" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'black', fontSize: '1rem' , wordBreak: 'break-word', marginTop: '1.5rem'}}>
                  {order.bookName}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: '#333', fontSize: '0.8rem' , wordBreak: 'break-word'}}>
                  作者：{order.bookAuthor} | ISBN：{order.bookISBN} | {order.bookdegree}
                </Typography>
              </div>
              <div>
                <Box sx={{ border: '1px solid', p: 2 ,mt: 5,ml:3 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      评价等级：
                    </Typography>
                    <Rating name="rating" value={rating} onChange={handleRatingChange} />
                  </div>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    评价内容：
                  </Typography>
                  <Box sx={{ minWidth: 600 }}>
                    <Card variant="outlined" sx={{ minWidth: 500, height: '156px' }}>
                      <CardContent>
                        <TextField
                          id="outlined-multiline-static"
                          label="快来分享购书体验吧~"
                          multiline
                          rows={4}
                          value={evaluation}
                          onChange={handleEvaluationChange}
                          variant="outlined"
                          sx={{ mt: 0, width: '100%' }}
                        />
                     </CardContent>
                   </Card>
                  </Box>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      提交评价
                    </Button>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // 显示评价内容
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
              <AddBusinessIcon sx={{ mr: 1 }} />
              商家号：{order.merchantNumber}
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
}

export default SinglePurchasedBookEvaluation;
