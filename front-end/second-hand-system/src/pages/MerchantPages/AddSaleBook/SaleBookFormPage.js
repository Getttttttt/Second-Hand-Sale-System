import * as React from 'react';
import { Container } from "@mui/material";
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from "@mui/icons-material/Send.js";
import { Avatar, Space, Popover  } from 'antd';
import { useParams } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


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


function SaleBookFormPage() {
  let { merchantId } = useParams();

  const [books, setBooks] = useState([
    { bookId: '1', name: '茶业战争', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '2', name: '法律的悖论', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '3', name: 'Book 3', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },
    { bookId: '4', name: 'Book 4', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '5', name: 'Book 5', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '6', name: 'Book 6', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },
    { bookId: '7', name: 'Book 7', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '8', name: 'Book 8', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '9', name: 'Book 9', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },

  ]);

  const [newBookId,setNewBookId] = React.useState('')
  const [newBookName, setNewBookName] = React.useState('');
  const [newBookPrice, setNewBookPrice] = React.useState(0);
  const [newBookDiscount, setNewBookDiscount] = React.useState(0);
  const [newBookQuantity, setNewBookQuantity] = React.useState(0);
  const [newBookCondition, setNewBookCondition] = React.useState('New');
  const [newBookImage, setNewBookImage] = React.useState('');
  const [newBookTimeOnShelf, setNewBookTimeOnShelf] = React.useState('');


  const handleNameChange = (bookId, newName) => {
    setBooks(prevBooks => {
      const updatedBooks = prevBooks.map(book => {
        if (book.bookId === bookId) {
          console.log({ ...book, name: newName })
          return { ...book, name: newName };
        }
        return book;
      });
      return updatedBooks;
    });
  };

  const handlePriceChange = (bookId, newPrice) => {  //调整图书价格
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.bookId === bookId) {
        return { ...book, price: newPrice };
      }
      return book;
    }));
  };

  const handleDiscountChange = (bookId, newDiscount) => {  //调整折扣
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.bookId === bookId) {
        return { ...book, discount: newDiscount };
      }
      return book;
    }));
  };

  const handleQuantityChange = (bookId, newQuantity) => {  //调整库存数量
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.bookId === bookId) {
        return { ...book, quantity: newQuantity };
      }
      return book;
    }));
  };

  const handleConditionChange = (bookId, newBookCondition) => {  //调整书籍状态
    setBooks(prevBooks => prevBooks.map(book => {
      if (book.bookId === bookId) {
        return { ...book, condition: newBookCondition };
      }
      return book;
    }));
  };

  const handleAddBook = () => {  //新增图书
    const newBook = {
      bookId: newBookId,
      name: newBookName,
      price: newBookPrice,
      discount: newBookDiscount,
      quantity: newBookQuantity,
      condition: newBookCondition,
      timeOnShelf: newBookTimeOnShelf,
      bookImg: newBookImage
    };
    //添加到图书列表
    setBooks(prevBooks => [...prevBooks, newBook]);
    // 清空输入框
    setNewBookId('')
    setNewBookName('');
    setNewBookPrice(0);
    setNewBookDiscount(0);
    setNewBookQuantity(0);
    setNewBookCondition('New');
    setNewBookImage('');
  };

  const handleDeleteBook = (bookId) => {  //下架图书
    console.log(bookId)
    setBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookId));
    setOpenDelete(false);
    console.log(openDelete)
  };

  //当前商品信息
  const [bookId,setBookId] = React.useState('');  
  const [name, setName] = React.useState('');  
  const [price, setPrice] = React.useState(0);  
  const [discount, setDiscount] = React.useState(0);  
  const [quantity, setQuantity] = React.useState(0);  
  const [condition, setCondition] = React.useState('New');  
  const [timeOnShelf, setTimeOnShelf] = React.useState('');  

  const [openDelete, setOpenDelete] = React.useState(false);  //下架商品弹窗
  const handleDeleteClickOpen = (bookId) => () => {
    setOpenDelete(true);
    setBookId(bookId);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const handleDeleteConfirm = () => {
    setOpenDelete(false);
    handleDeleteBook(bookId);
  }

  const [openUpdate, setOpenUpdate] = React.useState(false);  //更新商品销售信息表单
  const handleUpdateClickOpen = (bookId,name,price,discount,quantity,condition,timeOnShelf) => () =>  {
    setOpenUpdate(true);
    setBookId(bookId);
    setName(name);
    setPrice(price);
    setDiscount(discount);
    setQuantity(quantity);
    setCondition(condition);
    setTimeOnShelf(timeOnShelf);  
  };
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  const handleUpdateConfirm = () => {
    setOpenUpdate(false);
    handleNameChange(bookId, name);
    handlePriceChange(bookId, price);
    handleDiscountChange(bookId, discount);
    handleQuantityChange(bookId, quantity);
    handleConditionChange(bookId, condition);
  }

  const [openAdd, setOpenAdd] = React.useState(false);  //添加商品表单
  const handleAddClickOpen = () =>  {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };
  const handleAddConfirm = () => {
    handleAddBook()
    setOpenAdd(false);
  }

  
  //box
  const boxheadStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: '7vh',
    
  }
  const boxbottomStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: '3vh',
  }
  
  return (
  <Container>
    <Box
      style={boxheadStyle} sx={{ backgroundColor: '#2979ff', borderRadius:'10px', alignItems:"center", justifyItems: "center"}}
    >
      <React.Fragment>
        <Typography sx={{ color: '#ffffff', fontSize: "18px", fontWeight: "bold"}}>
          {merchantId + "'s Books OnSale"}
        </Typography>
      </React.Fragment>    
    </Box>
    <Box 
      style={boxheadStyle} sx={{ marginTop: 5, borderRadius: '10px', alignItems:"center", justifyItems: "center"}}
    >
      <Card sx={{ width: 1100, margin: 2, alignItems:"center", justifyItems: "center"}}>
        <CardContent>
          <Typography sx={{fontSize: 18, fontWeight: 'bold', justifyContent: "center" }}>
            Welcome to your book-shelf!         
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{justifyContent:'center'}}>
            <Button 
              size="small" color="primary" 
              sx={{fontSize: 14, padding: '3px 8px'}} 
              onClick={handleAddClickOpen}
            >  
              More book to sell?&nbsp;&nbsp;&nbsp; 
              Click here to put them on shelf!
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft:1, marginTop:5}} >
      {books.map((item, index) => {
        return(
          <Box key={index}>
            <Card sx={{ maxWidth: 345, margin:2 }}>
              <CardActions>
                <Box style={{display: 'flex', width:"100%" , justifyContent: 'flex-end'}} sx={{ marginTop: 1, marginRight: 1}}>
                  <Button 
                    sx={{fontSize: 12, padding: '3px 3px', justifyItem: "center", alignItems:"center"}} 
                    onClick={handleDeleteClickOpen(item.bookId)}
                    endIcon={<DeleteOutlineOutlinedIcon />}                      
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
              <CardActionArea>
                <Box style={{display: 'flex', justifyItems: "center", width:"100%", marginLeft: 15}}>
                  <CardMedia
                    component="img"
                    height="110"
                    width="10rem"
                    image={item.bookImage}
                    style={{ width: 100, marginLeft: 10}}
                  />
                  <Typography gutterBottom variant="h5" component="div" sx={{ alignSelf: 'center', marginLeft: '25px', width: '200px', }}>
                        {item.name}
                  </Typography>
                </Box>
                <CardContent>
                  <Box style={{display: 'flex', justifyItems: "center", width:"100%", marginLeft: 20, margin: 2}}>
                    <Typography variant="body2" color="text.secondary"  style={{ fontSize: 15, width: '315px' }}>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          bookId: {item.bookId}&nbsp;&nbsp;&nbsp;
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          price: {item.price}&nbsp;&nbsp;&nbsp;
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          condition: {item.condition}&nbsp;&nbsp;&nbsp;
                        </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  style={{ fontSize: 15, width: '315px' }}>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          quantity: {item.quantity}
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          discount: {item.discount}
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          time: {item.timeOnShelf}
                        </span>
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box sx={{justifyContent:'flex-end'}}>
                  <Button 
                    size="small" color="primary" 
                    sx={{fontSize: 14, padding: '2px 8px'}} 
                    onClick={handleUpdateClickOpen(item.bookId,item.name,item.price,item.discount,item.quantity,item.condition,item.timeOnShelf)}
                  >  
                    Alter
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Box>
        );
    })}

    </Box>
    <Box style={boxbottomStyle} sx={{ backgroundColor: '#ffffff', alignItems: "center", marginBottom: 0 }} >
      <Copyright justifyContent="center"/>
    </Box>

    {/*下架商品提示窗 */}
    {openDelete && (
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to pull this book off shelves?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you pull this it off shelves, then you can no longer sell this book,
            unless you reshelve it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )}

    {/*更新商品销售信息表单 */}
    {openUpdate && (
      <Dialog
        open={openUpdate}
        onClose={handleUpdateClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleUpdateClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can alter the details of the books you are selling:
          </DialogContentText>
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookId"
            name="bookId"
            label="BookId"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={bookId}
            InputProps={{ readOnly: true, }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={e =>setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={price}
            onChange={e =>setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="discount"
            name="discount"
            label="Discount"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={discount}
            onChange={e =>setDiscount(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={quantity}
            onChange={e =>setQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="condition"
            name="condition"
            label="Condition"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={condition}
            onChange={e =>setCondition(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label="Time"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={timeOnShelf}
            InputLabelProps={{ shrink: true, }}
            InputProps={{ readOnly: true, }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm} >Subscribe</Button>
        </DialogActions>
      </Dialog>
    )}

    {/*添加商品表单 */}
    {openAdd && (
      <Dialog
        open={openAdd}
        onClose={handleAddClickOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleAddClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add the details of the book you want to sell:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookId"
            name="bookId"
            label="BookId"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={bookId}
            onChange={e =>setNewBookId(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={e =>setNewBookName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={price}
            onChange={e =>setNewBookPrice(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="discount"
            name="discount"
            label="Discount"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={discount}
            onChange={e =>setNewBookDiscount(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={quantity}
            onChange={e =>setNewBookQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="condition"
            name="condition"
            label="Condition"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={condition}
            onChange={e =>setNewBookCondition(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label="Time"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={timeOnShelf}
            InputLabelProps={{ shrink: true, }}
            onChange={e =>setNewBookTimeOnShelf(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddConfirm} >Subscribe</Button>
        </DialogActions>
      </Dialog>
    )}


  </Container>);
}


export default SaleBookFormPage;