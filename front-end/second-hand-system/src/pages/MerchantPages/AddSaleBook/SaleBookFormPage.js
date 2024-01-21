import * as React from 'react';
import { Container } from "@mui/material";
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
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


const SaleBookFormPage = () => {
  let { merchantId } = useParams();
  console.log(merchantId)

  const [books, setBooks] = useState([[]])
  
  //从后端获取在售书籍信息
  React.useEffect(() => {
    const getBookOnSale = async (event) => {
      const jsonData = JSON.stringify({
        merchantId: merchantId
      })
      
      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
    
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded//merchant/searchBook',{
          method: 'POST',
          headers: myHeaders,
          body: jsonData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //处理返回的数据
        const responseData = await response.json();
        console.log(responseData);
        const bookId = responseData.map(item => item.bookId);
        const name = responseData.map(item => item.bookName);
        const price = responseData.map(item => item.price);
        const discount = responseData.map(item => item.discount);
        const quantity = responseData.map(item => item.quantity);
        const condition = responseData.map(item => item.condition);
        const timeOnShelf = responseData.map(item => item.timeOnShelf);
        const bookImage = responseData.map(item => item.bookImage);
        const merchantId = responseData.map(item => item.merchantId);
        const combinedArray = merchantId.map((item, index) => {
          return [
            item,
            bookId[index],
            name[index],
            price[index],
            discount[index],
            quantity[index],
            condition[index],
            timeOnShelf[index],
            bookImage[index],
          ];
        });
        setBooks(combinedArray);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    getBookOnSale();
  },[merchantId]);


  /*const [books, setBooks] = useState([
    { bookId: '1', name: '茶业战争', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '2', name: '法律的悖论', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '3', name: 'Book 3', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },
    { bookId: '4', name: 'Book 4', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '5', name: 'Book 5', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '6', name: 'Book 6', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },
    { bookId: '7', name: 'Book 7', price: 10.5, discount: 0.2, quantity: 5, condition: '九成新', timeOnShelf: '2023-09-30', bookImage: "xxx" },
    { bookId: '8', name: 'Book 8', price: 15.8, discount: 0.1, quantity: 3, condition: '全新', timeOnShelf: '2023-05-27', bookImage: "xxx" },
    { bookId: '9', name: 'Book 9', price: 20.3, discount: 0.3, quantity: 2, condition: '七成新', timeOnShelf: '2024-01-13', bookImage: "xxx" },

  ]);*/

  //新增商品信息
  const [newBookId,setNewBookId] = React.useState('')
  const [newBookName, setNewBookName] = React.useState('');
  const [newBookPrice, setNewBookPrice] = React.useState(0);
  const [newBookDiscount, setNewBookDiscount] = React.useState(0);
  const [newBookQuantity, setNewBookQuantity] = React.useState(0);
  const [newBookCondition, setNewBookCondition] = React.useState('New');
  const [newBookImage, setNewBookImage] = React.useState('');
  const [newBookShow1, setNewBookShow1] = React.useState('');
  const [newBookShow2, setNewBookShow2] = React.useState('');
  const [newBookShow3, setNewBookShow3] = React.useState('');
  const [newBookTimeOnShelf, setNewBookTimeOnShelf] = React.useState('');
  const [newBookWriter, setNewBookWriter] = React.useState('');
  const [newISBN, setNewISBN] = React.useState('');
  const [newBookPublisher, setNewBookPublisher] = React.useState('');
  const [newBookPublishTime, setNewBookPublishTime] = React.useState('');

  //图书标签
  const [state, setState] = React.useState({
    History: false,
    Policy: false,
    Literature: false,
    Law: false,
    Science: false,
    Novel: false,
    Art: false,
    Economic: false,
    Philosophy: false,
    Else: false
  });
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { History, Policy, Literature, Law, Science, Novel, Art, Economic, Philosophy, Else } = state;


  const handleAddBook = async ({id,list}) => {  //新增图书
    
    const newBook = {
      bookId: id,
      name: newBookName,
      price: newBookPrice,
      discount: newBookDiscount,
      quantity: newBookQuantity,
      condition: newBookCondition,
      timeOnShelf: newBookTimeOnShelf,
      bookImg: newBookImage,
      label: list,
    };
    console.log(bookId);
    console.log(list)

    //数据传回后端
    addBook({newBookId: id,newBookName: newBookName,newBookPrice: newBookPrice,newBookDiscount: newBookDiscount,newBookQuantity: newBookQuantity,newBookCondition: newBookCondition,
      newBookTimeOnShelf: newBookTimeOnShelf,newBookImage: newBookImage,newBookWriter: newBookWriter,newISBN: newISBN,newBookPublisher: newBookPublisher,newBookPublishTime: newBookPublishTime,newBookLabel: list})

    //添加到图书列表
    setBooks(prevBooks => [...prevBooks, [merchantId,bookId,newBookName,newBookPrice,newBookDiscount,newBookQuantity,newBookCondition,newBookTimeOnShelf,newBookImage]]);
    console.log(books);

    // 清空输入框
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
    deleteBook({merchantId: merchantId, bookId: bookId});
  };

  //当前商品信息
  const [bookId,setBookId] = React.useState('');  
  const [name, setName] = React.useState('');  
  const [price, setPrice] = React.useState(0);  
  const [discount, setDiscount] = React.useState(0);  
  const [quantity, setQuantity] = React.useState(0);  
  const [condition, setCondition] = React.useState('New');  
  const [timeOnShelf, setTimeOnShelf] = React.useState('');  
  const [bookImage, setBookIamge] = React.useState(''); 


  const [openAdd, setOpenAdd] = React.useState(false);  //添加商品表单
  const handleAddClickOpen = () =>  {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
    // 在关闭对话框时重置状态
    setNewBookImages({
      surface: "",
      show1: "",
      show2: "",
      show3: "",
    });
  };
  const handleAddConfirm = () => {
    //生成bookId
    var timestamp = Date.now();
    console.log(timestamp);
    setBookId("B"+timestamp);
    let id = "B"+timestamp
    console.log(id);
    //读取bookLabel多选框
    let list = []
    if(state.Art){
      list.push("Art")
    }if(state.Economic){
      list.push("Economic")
    }if(state.History){
      list.push("History")
    }if(state.Law){
      list.push("Law")
    }if(state.Literature){
      list.push("Literature")
    }if(state.Novel){
      list.push("Novel")
    }if(state.Philosophy){
      list.push("Philosophy")
    }if(state.Policy){
      list.push("Policy")
    }if(state.Science){
      list.push("Science")
    }if(state.Else){
      list.push("Else")
    }
    console.log(list)
    handleAddBook({id: id, list: list});
    handleUpload(id)
    setOpenAdd(false);
    // 在关闭对话框时重置状态
    setNewBookImages({
      surface: "",
      show1: "",
      show2: "",
      show3: "",
    });
  }

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
  const handleUpdateClickOpen = (bookId,name,price,discount,quantity,condition,timeOnShelf,bookImage) => () =>  {
    setOpenUpdate(true);
    setBookId(bookId);
    setName(name);
    setPrice(price);
    setDiscount(discount);
    setQuantity(quantity);
    setCondition(condition);
    setTimeOnShelf(timeOnShelf);  
    setBookIamge(bookImage)
  };
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  const handleUpdateConfirm = () => {
    setOpenUpdate(false);
    updateBook({newBookId: bookId, newBookName: name, newBookPrice: price, newBookDiscount: discount, newBookQuantity: quantity, newBookCondition: condition, newBookTimeOnShelf: timeOnShelf,
                 newBookImage: bookImage, newBookShow1: newBookShow1, newBookShow2: newBookShow2, newBookShow3: newBookShow3})
    
  }


  //连接后端
  //---新增图书
  const addBook = async ({newBookId,newBookName,newBookPrice,newBookDiscount,newBookQuantity,newBookCondition,
                          newBookTimeOnShelf,newBookImage,newBookWriter,newISBN,newBookPublisher,newBookPublishTime,newBookLabel,}) => {
    console.log(newBookLabel);    
    
    const label = JSON.stringify(newBookLabel)
    const jsonData = JSON.stringify({
      merchantId: merchantId,
      bookId: newBookId,
      bookName: newBookName,
      price: newBookPrice,
      discount: newBookDiscount,
      quantity: newBookQuantity,
      condition: newBookCondition,
      timeOnShelf: newBookTimeOnShelf,
      bookImage: newBookImage,
      writer: newBookWriter,
      ISBN: newISBN,
      publisher: newBookPublisher,
      publishTime: newBookPublishTime,
      bookLabel: JSON.parse(label)
    })

    try{
      let myHeaders = new Headers({
        'Content-Type': 'application/json"'
      });
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/addBook',{
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
      });

      //处理返回的数据
      const responseData = await response.json();   
      console.log(responseData);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  //---删除图书
  const deleteBook = async ({merchantId,bookId}) => {
    console.log(bookId);

    const jsonData1 = JSON.stringify({
      merchantId: merchantId,
      bookId: bookId,
    })
    const jsonData2 = JSON.stringify({
      merchantId: merchantId,
    })

    try{
      let myHeaders = new Headers({
        'Content-Type': 'application/json"'
      });
      const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/deleteBook',{
        method: 'POST',
        headers: myHeaders,
        body: jsonData1,
      });
      console.log("back")
      //处理返回的数据
      const responseData1 = await response.json();
      console.log(responseData1);

      const response2 = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/searchBook',{
            method: 'POST',
            headers: myHeaders,
            body: jsonData2,
          });
          if (!response2.ok) {
            throw new Error(`HTTP error! status: ${response2.status}`);
          }
          //处理返回的数据
          const responseData2 = await response2.json();
          console.log(responseData2);
          const bookId = responseData2.map(item => item.bookId);
          const name = responseData2.map(item => item.bookName);
          const price = responseData2.map(item => item.price);
          const discount = responseData2.map(item => item.discount);
          const quantity = responseData2.map(item => item.quantity);
          const condition = responseData2.map(item => item.condition);
          const timeOnShelf = responseData2.map(item => item.timeOnShelf);
          const bookImage = responseData2.map(item => item.bookImage);
          const merchantId = responseData2.map(item => item.merchantId);
          const combinedArray = merchantId.map((item, index) => {
            return [
              item,
              bookId[index],
              name[index],
              price[index],
              discount[index],
              quantity[index],
              condition[index],
              timeOnShelf[index],
              bookImage[index],
            ];
          });
          setBooks(combinedArray);

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  //---更新售卖信息
  const updateBook = async ({newBookId,newBookName,newBookPrice,newBookDiscount,newBookQuantity,newBookCondition,newBookTimeOnShelf,newBookImage,newBookShow1,newBookShow2,newBookShow3}) => {
      console.log(newBookTimeOnShelf);

      const jsonData = JSON.stringify({
        merchantId: merchantId,
        bookId: newBookId,
        bookName: newBookName,
        price: newBookPrice,
        discount: newBookDiscount,
        quantity: newBookQuantity,
        condition: newBookCondition,
        timeOnShelf: newBookTimeOnShelf,
        bookImage: newBookImage,
        newBookShow1:newBookShow1,
        newBookShow2:newBookShow2,
        newBookShow3:newBookShow3,
      })

      try{
        let myHeaders = new Headers({
          'Content-Type': 'application/json'
        });
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/updateBook',{
          method: 'POST',
          headers: myHeaders,
          body: jsonData,
        });
        console.log("back")
        //处理返回的数据
        const responseData = await response.json();
        console.log(responseData);
        const bookId = responseData.map(item => item.bookId);
        const name = responseData.map(item => item.bookName);
        const price = responseData.map(item => item.price);
        const discount = responseData.map(item => item.discount);
        const quantity = responseData.map(item => item.quantity);
        const condition = responseData.map(item => item.condition);
        const timeOnShelf = responseData.map(item => item.timeOnShelf);
        const bookImage = responseData.map(item => item.bookImage);
        const merchantId = responseData.map(item => item.merchantId);
        const combinedArray = merchantId.map((item, index) => {
         return [
           item,
           bookId[index],
           name[index],
           price[index],
           discount[index],
           quantity[index],
           condition[index],
           timeOnShelf[index],
           bookImage[index],
         ];
       });
       setBooks(combinedArray);
     } catch (error) {
       console.error('There was a problem with the fetch operation:', error);
     }
  };

 
  //封面+三张图片
  const [newBookImages, setNewBookImages] = React.useState({
    surface: "",
    show1: "",
    show2: "",
    show3: "",
  });

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setNewBookImages((prevImages) => ({
        ...prevImages,
        [type]: file,
      }));
    }
  };


    
  const handleUpload = async (bookId) => {  //上传图片
    const formData = new FormData();
    if (true) {
      try {
        for (const [key, file] of Object.entries(newBookImages)) {
          formData.append(key, file);
        }
        formData.append("bookId",bookId);
        
        const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/merchant/bookImage', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("111")
        // 处理返回的数据，可能是上传成功的信息
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.result==="Upload successful!"){
          // 更新 avatarImage 状态，可能是上传成功后返回的图片链接
          console.log("success!")

        }
                
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

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
    marginBottom: 0
  }
  
  return (
  <Container>
    <Box
      style={boxheadStyle} sx={{ backgroundColor: '#2979ff', borderRadius:'10px', alignItems:"center", justifyItems: "center"}}
    >
      <React.Fragment>
        <Typography sx={{ color: '#ffffff', fontSize: "18px", fontWeight: "bold"}}>
          {merchantId + " 的在售书籍"}
        </Typography>
      </React.Fragment>    
    </Box>
    <Box 
      style={boxheadStyle} sx={{ marginTop: 5, borderRadius: '10px', alignItems:"center", justifyItems: "center"}}
    >
      <Card sx={{ width: 1100, margin: 2, alignItems:"center", justifyItems: "center"}}>
        <CardContent sx={{ justifyContent:"center", alignContent:"center" }}>
          <Typography sx={{ fontSize: 18, }}>
            欢迎来到你的在售书架！         
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{justifyContent:'center'}}>
            <Button 
              size="small" color="primary" 
              sx={{fontSize: 14, padding: '3px 8px'}} 
              onClick={handleAddClickOpen}
            >  
              有更多图书想售卖？&nbsp;&nbsp;&nbsp; 
              点击这里上架它们吧！
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft:1, marginTop:5}} >
      {books.map((item, index) => {
        return(
          <Box key={index}>
            <Card sx={{ maxWidth: 345, margin:2, }}>
              <CardActions>
                <Box style={{display: 'flex', width:"100%" , justifyContent: 'flex-end'}} sx={{ marginTop: 1, marginRight: 1}}>
                  <Button 
                    sx={{fontSize: 12, padding: '3px 3px', justifyItem: "center", alignItems:"center"}} 
                    
                    onClick={handleDeleteClickOpen(item[1])}
                    endIcon={<DeleteOutlineOutlinedIcon />}                      
                  >
                    下架图书
                  </Button>
                </Box>
              </CardActions>
              <CardActionArea sx={{height: 220}}>
                <Box style={{display: 'flex', justifyItems: "center", width:"100%", marginLeft: 12}}>
                  {console.log(item[8])}
                  <CardMedia
                    component="img"
                    height="110"
                    width="10rem"
                    image={"http://localhost:8080/SecondHandSystemAPIs_war_exploded/image/"+item[8]}
                    style={{ width: 100, marginLeft: 10}}
                  />
                  <Typography gutterBottom variant="h6" component="div" sx={{ alignSelf: 'center', marginLeft: '23px', width: '190px', marginRight:1}}>
                        {item[2]}
                  </Typography>
                </Box>
                <CardContent>
                  <Box style={{display: 'flex', justifyItems: "center", width:"100%", marginLeft: 20, margin: 2}}>
                    <Typography variant="body2" color="text.secondary"  style={{ fontSize: 15, width: '315px' }}>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          商品ID : {item[1]+"***"}&nbsp;&nbsp;&nbsp;
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          价格  {item[3]}&nbsp;&nbsp;&nbsp;
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          新旧程度 : {item[6]}&nbsp;&nbsp;&nbsp;
                        </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  style={{ fontSize: 15, width: '315px' }}>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          库存数量 : {item[5]}
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          折扣 : {item[4]}
                        </span>
                        <span style={{ display: 'block', marginBottom: '8px' }}>
                          上架时间 : {item[7]}
                        </span>
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box sx={{ justifyContent:'flex-end' }}>
                  <Button 
                    size="small" color="primary" 
                    sx={{ fontSize: 14, padding: '2px 8px', }} 
                    onClick={handleUpdateClickOpen(item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8])}
                  >  
                    修改销售信息
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
          {"你是否想要下架这件商品？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            如果你下架这件商品，则其他用户无法购买。如果要继续销售，请重新提交商品上架申请。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>取消</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            确定
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
        <DialogTitle>商品信息更新申请</DialogTitle>
        <DialogContent>
          <DialogContentText>
            你可以对该商品的销售信息进行修改:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookId"
            name="bookId"
            label="图书ID"
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
            label="图书名称"
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
            label="价格"
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
            label="折扣"
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
            label="库存数量"
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
            label="新旧程度"
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
            id="bookImage"
            name="bookImage"
            label="图书封面"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={bookImage}
            onChange={e =>setBookIamge(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label="上架时间"
            type="date"
            fullWidth
            variant="standard"
            defaultValue={timeOnShelf}
            InputLabelProps={{ shrink: true, }}
            InputProps={{ readOnly: true, }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>取消</Button>
          <Button onClick={handleUpdateConfirm} >提交</Button>
        </DialogActions>
      </Dialog>
    )}

    {/*添加商品表单 */}
    {openAdd && (
      <Dialog
        open={openAdd}
        onClose={handleAddClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleAddClose();
          },
        }}
      >
        <DialogTitle>商品上架申请</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请在此完善该商品的销售细节：
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="图书名称"
            type="text"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="价格"
            type="number"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookPrice(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="discount"
            name="discount"
            label="折扣"
            type="number"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookDiscount(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="库存数量"
            type="number"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="condition"
            name="condition"
            label="新旧程度"
            type="text"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookCondition(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            label="上架时间"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true, }}
            onChange={e =>setNewBookTimeOnShelf(e.target.value)}
          />
          
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="book-surface"
            label="图书封面"
            type="file"
            onChange={(e) => handleFileChange('surface', e)}
          />
          <label htmlFor="book-surface">
            <TextField
              autoFocus
              required
              margin="dense"
              id="bookImage"
              name="bookImage"
              label="图书封面"
              type="text"
              value={newBookImages.surface.name || ""}
              fullWidth
              variant="standard"
            />
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="book-show1"
            label="图书展示图片1"
            type="file"
            onChange={(e) => handleFileChange('show1', e)}
          />
          <label htmlFor="book-show1">
            <TextField
              autoFocus
              required
              margin="dense"
              id="bookImage"
              name="bookImage"
              label="图书展示图片1"
              type="text"
              value={newBookImages.show1.name || ""}
              fullWidth
              variant="standard"
            />
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="book-show2"
            label="图书展示图片2"
            type="file"
            onChange={(e) => handleFileChange('show2', e)}
          />
          <label htmlFor="book-show2">
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookImage"
            name="bookImage"
            label="图书展示图片2"
            type="text"
            value={newBookImages.show2.name || ""}
            fullWidth
            variant="standard"
          />
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="book-show3"
            label="图书展示图片3"
            type="file"
            onChange={(e) => handleFileChange('show3', e)}
          />
          <label htmlFor="book-show3">
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookImage"
            name="bookImage"
            label="图书展示图片3"
            type="text"
            value={newBookImages.show3.name || ""}
            fullWidth
            variant="standard"
          />
          </label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookWriter"
            name="bookWriter"
            label="作者"
            type="text"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookWriter(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="ISBN"
            name="ISBN"
            label="ISBN"
            type="text"
            fullWidth
            variant="standard"
            onChange={e =>setNewISBN(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookPublisher"
            name="bookPublisher"
            label="出版商"
            type="text"
            fullWidth
            variant="standard"
            onChange={e =>setNewBookPublisher(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookPUblishTime"
            name="bookPUblishTime"
            label="出版时间"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true, }}
            onChange={e =>setNewBookPublishTime(e.target.value)}
          />
          <FormControl sx={{ m: 2, marginLeft: 0}} component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{fontSize:'13px'}}>图书类别:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={History} onChange={handleChange} name="History" />
                }
                label="历史"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Policy} onChange={handleChange} name="Policy" />
                }
                label="政治"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Law} onChange={handleChange} name="Law" />
                }
                label="法律"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Literature} onChange={handleChange} name="Literature" />
                }
                label="文学"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Science} onChange={handleChange} name="Science" />
                }
                label="科普"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Novel} onChange={handleChange} name="Novel" />
                }
                label="小说"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Art} onChange={handleChange} name="Art" />
                }
                label="艺术"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Economic} onChange={handleChange} name="Economic" />
                }
                label="经济"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Philosophy} onChange={handleChange} name="Philosophy" />
                }
                label="哲学"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Else} onChange={handleChange} name="Else" />
                }
                label="其他"
              />
            </FormGroup>
            <FormHelperText>请为你的商品选择至少一项标签</FormHelperText>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>取消</Button>
          <Button onClick={handleAddConfirm} >提交</Button>
        </DialogActions>
      </Dialog>
    )}


  </Container>);
}


export default SaleBookFormPage;