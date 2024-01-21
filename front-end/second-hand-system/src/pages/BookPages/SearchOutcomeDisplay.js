import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Home from '../Home';
import List from '@mui/material/List';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Stack from '@mui/material/Stack';
import { Carousel } from 'antd';
import Grid from '@mui/material/Unstable_Grid2';
import { Radio, Space, Tabs } from 'antd';


const color = red[600];

const tabNames = ['全部','历史', '政治', '法律', '文学', '科普', '小说', '艺术', '经济', '哲学', '其他'];

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchOutcomeDisplay() {
  const [detailBooks, setDetailBooks] = React.useState([]);

  const [searchContent,setSearchContent] = React.useState("");
  const [tabPosition, setTabPosition] = React.useState('left');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  
  React.useEffect(() => {
    fetchData(searchContent,detailBooks,setDetailBooks);
  }, []);

  const handleTabClick = async (key) => {
    console.log('点击的标签:', tabNames[parseInt(key)-1]);
  
    const searchLabel = tabNames[parseInt(key)-1];
    
    const jsonData = JSON.stringify({
      searchLabel: searchLabel,
    });
    console.log(jsonData);
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      });
      console.log(3)
  
      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/books/searchByLabel`, {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据
  
      console.log(1);
  
      const Books = await response.json();
      console.log(Books);
      const detailBooks = Books.map(item => ({
        bookName : item.bookName.trim(),
        bookPrice: item.bookPrice,
        bookDiscount: item.bookDiscount,
        bookSurfacePic: item.bookSurfacePic.trim(),
      }));
  
      detailBooks.forEach(book => {
        book.bookName = truncateString(book.bookName, 16);
      });
  
      console.log("back to js")
      console.log(detailBooks);
      setDetailBooks(detailBooks); // 将获取的数据存储在detailData中
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }  
  };
  
  return (
  <Home>
    <Container>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Tabs
            tabPosition={tabPosition}
            items={tabNames.map((name, index) => {
              return {
                label: name,
                id: name,
                key: String(index + 1),
              };
            })}
            onTabClick={handleTabClick}
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="baseline"
          spacing={2}
        >
          <Container>
            <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
            </Carousel>
          </Container>
          <Container>
          <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3 // 这个属性可以调整按钮之间的间距
            }}>
              {detailBooks.map((book) =>
              (
                <SingleBook key={book.bookName} book={book} />)
              )}
            </Box>
          </Container>
        </Stack>
      </Stack>
    </Container>
  </Home>);
}

const SingleBook = ({book}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(1)
  return (
  <Card sx={{ maxWidth: 345,minWidth: 290 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          B
        </Avatar>
      }
      action={
        <>
          <IconButton aria-label="settings" onClick={handleExpandClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              handleClose();
              // 添加第一个选项的事件处理逻辑
            }}>
              <ErrorOutlineIcon/> 举报
            </MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              // 添加第二个选项的事件处理逻辑
            }}>
              <ProductionQuantityLimitsIcon />不感兴趣
            </MenuItem>
          </Menu>
        </>
      }
      title={book.bookName}
      titleTypographyProps={{ sx: { fontSize: '1.5rem' } }}
      /*subheader="September 14, 2016"*/
    />
    <CardMedia
      component="img"
      height="194"
      image={book.bookSurfacePic}
      alt="Book Surface Picture"
    />
    <CardContent>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Typography variant="h5" color={color}>
          ¥{(parseFloat(book.bookPrice) * (1 - parseFloat(book.bookDiscount))).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" style={{ textDecoration: 'line-through', marginLeft: '8px' }}>
          ¥{book.bookPrice}
        </Typography>
      </Stack>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <AddShoppingCartIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>)
}


function truncateString(str, maxLength) {
  // 检查字符串长度是否大于最大长度
  if (str.length > maxLength) {
    // 如果是，截取字符串并添加省略号
    return str.slice(0, maxLength) + '…';
  } else {
    // 如果不是，返回原字符串
    return str;
  }
}


const fetchData = async (searchContent,detailBooks,setDetailBooks) => {

  const jsonData = JSON.stringify({
    searchContent: searchContent,
  });
  console.log(1);
  try {
    let myHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(3)

    const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/books/searchByName`, {
      method: 'POST',
      headers: myHeaders,
      body: jsonData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //处理返回的数据

    console.log(1);

    const Books = await response.json();
    console.log(Books);
    const detailBooks = Books.map(item => ({
      bookName : item.bookName.trim(),
      bookPrice: item.bookPrice,
      bookDiscount: item.bookDiscount,
      bookSurfacePic: item.bookSurfacePic.trim(),
    }));

    detailBooks.forEach(book => {
      book.bookName = truncateString(book.bookName, 16);
    });

    console.log("back to js")
    console.log(detailBooks);
    setDetailBooks(detailBooks); // 将获取的数据存储在detailData中
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
