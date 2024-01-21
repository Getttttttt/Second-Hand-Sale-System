import * as React from 'react';
import { Container, Stack } from "@mui/material";
import { useParams,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Alert from '@mui/material/Alert';
import { Carousel } from 'antd';
import axios from 'axios';


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
  margin-right:10px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px; /* 添加封面图框和文字之间的间隔 */
  align-items: flex-start;
`;

const BookInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 0.6;
  margin-left:7px;
`;

const BookAttribute = styled.p`
  color: #333; /* 浅灰色 */
`;

const BookValue = styled.p`
  color: #333; /* 深灰色 */
`;
const BookWrapper = styled.div`
  display: flex;
  align-items:flex-start;
`;

const BookLabel = styled(BookAttribute)`
  margin-right: 5px;
`;

const BookInfoValue = styled(BookValue)`
`;

const BookNum = styled.span`
  font-weight: bold; /* 加粗 */
  font-style: italic; /* 斜体 */
  color: green; /* 绿色 */
`;

const PriceAndQuantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #ccc; /* 灰色边框 */
  border-radius: 20px; /* 圆角边框 */
  padding: 0.5px 15px; /* 内边距 */
  margin-right: 60px;
  margin-bottom: 20px;
  margin-top: 12px;
`;

const PriceLabel = styled.p`
  font-size: 16px;
  color: #888; /* 灰色文本 */
`;

const PriceValue = styled.p`
  font-size: 24px;
  color: red; 
`;


function formatPrice(price) {

  const formattedPrice = price.toLocaleString("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  });

  return formattedPrice;
}
const OldPrice = styled.span`
  color: gray;
  text-decoration: line-through;
  margin-right: 5px;
`;

const CarouselWrapper = styled.div`
  width: 400px; /* 设置框图的宽度 */
  height: 410px; /* 设置框图的高度 */
  border: 1px solid #ccc; /* 设置框图的边框样式 */
  overflow: hidden; /* 隐藏超出框图范围的内容 */
  margin-right:40px;
`;
const contentStyle= {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  border: '1px solid #000',
};


export default function SingleBookDispley() {
  const navigate = useNavigate();
  const { bookID } = useParams();
  const [book, setBook] = React.useState(null);
  const [images,setImages] = React.useState(null);
  const [oldPrice,setOldPrice] = React.useState(0);
  const [newPrice,setNewPrice] = React.useState(0);
  const [userNum, setUserNum] = React.useState(1);
  const [addToCartStatus, setAddToCartStatus] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const customerID='18810392015';

  const handlePayment = async ({ customerID, bookID, userNum }) => {
    console.log(customerID)
    console.log(1);
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/books/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID:customerID,
        bookID: bookID,
        userNum: userNum,
      })
    });
    console.log(response);
    if (response.ok) {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('error');
    }
    console.log(`/books/payment/${paymentStatus}`);
    navigate(`/books/payment/${paymentStatus}`);
  };

  const handleAddToCart = async ({ customerID, bookID, userNum }) => {
    console.log(userNum)
    console.log(bookID)
    console.log(customerID)
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/BookBacket/insertBacketBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID:customerID,
        bookID: bookID,
        userNum: userNum,
      })
    });
    console.log(response)
    if (response.ok) {
      setAddToCartStatus('success');
    } else {
      setAddToCartStatus('error');
    }
    {addToCartStatus === 'success' && (
      <Alert severity="success">添加成功</Alert>
    )}
    {addToCartStatus === 'error' && (
      <Alert severity="error">添加失败</Alert>
    )}
  };

  const handleIncreaseQuantity = () => {
    if (userNum < book.bookNum) {
      setUserNum(prevNum => prevNum + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (userNum > 1) {
      setUserNum(prevNum => prevNum - 1);
    }
  };
  
  const fetchData = async () => {
    console.log(12);
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      console.log(3)

      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/books/searchByBookID?bookID=${bookID}`, {
        method: 'GET',
        headers: myHeaders
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据

      console.log(1);

      const book = await response.json();
      const images = [book.bookSurfacePic, ...book.bookImages];
      const oldPrice = book.bookPrice;
      const newPrice = book.bookPrice*(1-book.bookDiscount);
      
      console.log("back to js")
      console.log(book);
      setBook(book); 
      setImages(images);
      setOldPrice(oldPrice);
      setNewPrice(newPrice);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <OrderInfo>
        <p>商品ID：{book.bookID}  | 商家ID：{book.merchantID} </p>
      </OrderInfo>
      <BookInfo>
        <CarouselWrapper>
          <Carousel autoplay dots>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Image ${index + 1}`} style={contentStyle} />
              </div>
            ))}
          </Carousel>
        </CarouselWrapper>
        <BookDetails>
          <BookTitle>{book.bookName}</BookTitle>
          <BookInfoWrapper>
           <BookWrapper>
              <BookLabel>作者：</BookLabel>
              <BookInfoValue>{book.bookAuthor}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>ISBN：</BookLabel>
                <BookInfoValue>{book.bookISBN}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>出版社：</BookLabel>
                <BookInfoValue>{book.bookPublisher}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>出版时间：</BookLabel>
                <BookInfoValue>{book.bookPublishTime}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>上架时间：</BookLabel>
                <BookInfoValue>{book.bookShelfTime}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>库存数量：</BookLabel>
                <BookInfoValue>仅剩<span style={{color: 'green', fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px'}}>{book.bookNum}</span>本</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>分类：</BookLabel>
                <BookInfoValue>{book.bookLabels.join(', ')}</BookInfoValue>
            </BookWrapper>
            <BookWrapper>
                <BookLabel>新旧程度：</BookLabel>
                <BookInfoValue>{book.bookdegree}</BookInfoValue>
            </BookWrapper>
          </BookInfoWrapper>
          <PriceAndQuantity>
        <PriceWrapper>
          <PriceLabel>订单售价：</PriceLabel>
          {newPrice !== oldPrice ? (
          <>
            <OldPrice>{formatPrice(oldPrice)}</OldPrice>
            <PriceValue>{formatPrice(newPrice)}</PriceValue>
          </>
        ) : (
          <PriceValue>{formatPrice(newPrice)}</PriceValue>
        )}
        </PriceWrapper>
        <div style={{ marginTop: '0px' }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>选购数量</Button>
            <Button onClick={handleDecreaseQuantity}>
              <ArrowDropDownIcon style={{ color: userNum > 1 ? 'blue' : 'gray'}} />
            </Button>
            <Button>{userNum}</Button>
            <Button onClick={handleIncreaseQuantity}>
              <ArrowDropUpIcon style={{ color: userNum < book.bookNum ? 'blue' : 'gray' }} />
            </Button>
          </ButtonGroup>
        </div>
      </PriceAndQuantity>
      
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Button variant="contained" sx={{ width: '280px' ,height: '50px', border: '1px solid white' }} onClick={() => handleAddToCart({customerID:customerID,bookID:book.bookID,userNum:userNum})}>添加购物车</Button>
          <Button variant="contained" sx={{ width: '280px' ,height: '50px', border: '1px solid white' }} onClick={() => handlePayment({customerID:customerID,bookID:book.bookID,userNum:userNum})}>立即购买</Button>    
        </Stack>
        </BookDetails>
      </BookInfo>
    </Wrapper>
  );
};