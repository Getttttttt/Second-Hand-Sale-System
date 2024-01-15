import React from 'react';
import { Container } from '@mui/material';
import { MainData, DetailData } from './store';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const OrderInfo = styled.div`
  color: black;
  margin-bottom: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const BookCover = styled.img`
  width: 240px;
  height: 360px;
  margin-right: 20px;
  border: 1px solid black; /* 添加黑色边框 */
  margin-bottom: 20px; 
  margin-right:40px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px; /* 添加封面图框和文字之间的间隔 */
`;

const BookInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 0.6;
`;

const BookAttribute = styled.p`
  color: #333; /* 浅灰色 */
`;

const BookValue = styled.p`
  color: #333; /* 深灰色 */
`;
const BookWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BookLabel = styled(BookAttribute)`
  margin-right: 5px;
`;

const BookInfoValue = styled(BookValue)`
`;

const PriceAndQuantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #ccc; /* 灰色边框 */
  border-radius: 20px; /* 圆角边框 */
  padding: 0.5px 15px; /* 内边距 */
  margin-right: 80px;
  margin-bottom: 20px;
`;

const PriceLabel = styled.p`
  font-size: 16px;
  color: #888; /* 灰色文本 */
`;

const PriceValue = styled.p`
  font-size: 24px;
  color: red; 
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc; /* 灰色边框 */
  border-radius: 20px; /* 圆角边框 */
  padding: 0.5px 15px; /* 内边距 */
  margin-bottom: 20px;
`;

const QuantityLabel = styled.p`
  font-size: 16px;
  color: #888; 
`;

const QuantityValue = styled.p`
  font-size: 24px;
  color: red; 
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const ArrowIcon = styled(FaChevronDown)`
  margin-left: 5px;
`;

const MediaCard = styled.div`
  display: flex;
  align-items: center;
`;

function formatPrice(price) {
  const formattedPrice = price.toLocaleString("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  });

  return formattedPrice;
}

const SinglePurchasedBookStatusPage = () => {
  const { orderID } = useParams();
  const [order, setOrder] = React.useState(null);
  const [showImages, setShowImages] = React.useState(false);

  React.useEffect(() => {
    const foundOrder = DetailData.find(item => item.MainData === orderID);
    setOrder(foundOrder);
  }, [orderID]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const toggleImages = () => {
    setShowImages(!showImages);
  };

  return (
    <Wrapper>
      <OrderInfo>
        <p>订单号：{order.MainData}  | 订单时间：{order.orderTime}</p>
      </OrderInfo>
      <BookInfo>
        <MediaCard>
          <BookCover src={order.bookSurfacePic} alt="封面" />
        </MediaCard>
        <BookDetails>
          <BookTitle>{order.bookName}</BookTitle>
          <BookInfoWrapper>
           <BookWrapper>
              <BookLabel>作者：</BookLabel>
              <BookInfoValue>{order.bookAuthor}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>ISBN：</BookLabel>
                <BookInfoValue>{order.bookISBN}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>出版社：</BookLabel>
                <BookInfoValue>{order.bookPublisher}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>出版时间：</BookLabel>
                <BookInfoValue>{order.bookPublishTime}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>分类：</BookLabel>
                <BookInfoValue>{order.bookLabels.join(', ')}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>新旧程度：</BookLabel>
                <BookInfoValue>{order.bookdegree}</BookInfoValue>
            </BookWrapper>
          </BookInfoWrapper>
          <PriceAndQuantity>
        <PriceWrapper>
          <PriceLabel>订单售价：</PriceLabel>
          <PriceValue>{formatPrice(order.orderPrice)}</PriceValue>
        </PriceWrapper>
        <QuantityWrapper>
          <QuantityLabel>图书数量：</QuantityLabel>
          <QuantityValue>×{order.orderNum}</QuantityValue>
        </QuantityWrapper>
      </PriceAndQuantity>
      <ViewDetailsButton onClick={toggleImages} style={{ backgroundColor: showImages ? 'lightblue' : 'lightblue' }}>
        {showImages ? '收起详情' : '查看书籍图片详情'}
        {showImages ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </ViewDetailsButton>
        </BookDetails>
      </BookInfo>
      {showImages && order.bookImages.map(image => (
        <img
          key={image}
          src={image}
          alt="书籍图片"
          style={{maxWidth: '100%',height: 'auto',display: 'block',margin: '0 auto',marginTop:'10px' }}
        />
      ))}
    </Wrapper>
  );
};

export default SinglePurchasedBookStatusPage;




