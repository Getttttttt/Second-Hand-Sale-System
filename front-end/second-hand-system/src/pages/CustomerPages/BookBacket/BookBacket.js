import * as React from 'react';
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';


export default function BookBacket() {
  const { customerID } = useParams();
  const [cartItems, setCartItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [selectAll, setSelectAll] = React.useState(false);

  const cartHeaderStyle = {
    backgroundColor: '#87CEFA',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  };
  const cartItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '0',
  };

  const cartItemHeaderStyle = {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '2rem',
    margin: '0',
    padding: '0.01rem 0.01rem',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: '0.1rem',
    borderTopRightRadius: '0.1rem',
  };

  const merchantIDStyle = {
    fontSize: '0.8rem',
    color: 'black',
  };

  const bookIDStyle = {
    fontSize: '0.8rem',
    color: 'black',
    marginLeft: '0.5rem',
  };

  const bookCoverStyle = {
    width: '8rem',
    height: '10rem',
    objectFit: 'cover',
    marginRight: '1rem',
  };

  const bookInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    marginBottom: '0.5rem',
  };

  const bookNameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const bookAuthorStyle = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem',
  };

  const bookPriceStyle = {
    fontSize: '1.5rem',
    color: 'red',
    marginBottom: '0.5rem',
  };

  const deleteButtonStyle = {
    marginLeft: 'auto',
  };

  const handleSelectItem = (bookID) => {
    if (selectedItems.includes(bookID)) {
      setSelectedItems(selectedItems.filter((id) => id !== bookID));
    } else {
      setSelectedItems([...selectedItems, bookID]);
    }
  };

  const increaseQuantity = async (itemId) => {
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/BookBacket/updateQuantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID: customerID,
        bookID: itemId,
        delta: 1
      })
    });
    const data = await response.json();
    return data;
  };

  const decreaseQuantity = async (itemId) => {
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/BookBacket/updateQuantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID: customerID,
        bookID: itemId,
        delta: -1
      })
    });
    const data = await response.json();
    return data;
  };

  const deleteItem = async (itemId) => {
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/BookBacket/deleteBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID: customerID,
        bookID: itemId
      })
    });
    const data = await response.json();
    return data;
  };

  const placeOrder = async (selectedItems) => {
    const totalPrice = selectedItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    const response = await fetch('http://localhost:8080/SecondHandSystemAPIs_war_exploded/order/placeOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerID: customerID,
        items: selectedItems,
        totalPrice: totalPrice
      })
    });
    const data = await response.json();
    return data;
  };
   
  const fetchData = async () => {
    console.log(1);
    try {
      let myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      console.log(3)

      const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/BookBacket/booklist?customerID=${customerID}`, {
        method: 'GET',
        headers: myHeaders
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //处理返回的数据
      
      const data = await response.json();

      console.log(data);
      
      const cartItems = data.map((item) => ({
        bookISBN: item.bookISBN.trim(),
        bookNum: item.bookNum,
        bookAuthor: item.bookAuthor.trim(),
        bookName: item.bookName.trim(),
        bookID: item.bookID.trim(),
        merchantID: item.merchantID.trim(),
        bookSurfacePic: item.bookSurfacePic.trim(),
        bookPrice: item.bookPrice,
        bookdegree: item.bookdegree.trim(),
      }));
      setCartItems(cartItems);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allBookIDs = cartItems.map((item) => item.bookID);
      setSelectedItems(allBookIDs);
    } else {
      setSelectedItems([]);
    }
  };

  const calculateTotalPrice = (selectedItems) => {
    let totalPrice = 0;
    selectedItems.forEach((itemId) => {
      const selectedItem = cartItems.find((item) => item.id === itemId);
      totalPrice += selectedItem.price * selectedItem.quantity;
    });
    setTotalPrice(totalPrice);
  };

  const handleIncreaseQuantity = async (itemId) => {
    await increaseQuantity(customerID, itemId);
    const updatedCartItems = await fetchData();
    setCartItems(updatedCartItems);
    calculateTotalPrice(selectedItems);
  };

  const handleDecreaseQuantity = async (itemId) => {
    await decreaseQuantity(customerID, itemId);
    const updatedCartItems = await fetchData();
    setCartItems(updatedCartItems);
    calculateTotalPrice(selectedItems);
  };

  const handleDeleteItem = async (itemId) => {
    await deleteItem(customerID, itemId);
    const updatedCartItems = await fetchData();
    setCartItems(updatedCartItems);
    calculateTotalPrice(selectedItems);
  };

  const handlePlaceOrder = async () => {
    await placeOrder(customerID, selectedItems);
    setSelectedItems([]);
    setTotalPrice(0);
  };

  return (
    <div>
      <div className="cart-header" style={cartHeaderStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          <AddShoppingCartIcon style={{ fontSize: '2.5rem', verticalAlign: 'middle' }} />{' '}
          <span style={{ marginLeft: '1rem' }}>我的购物车</span>
        </h2>
      </div>
      <div className="cart">
      {cartItems.map((item) => (
        <Card variant="outlined" key={item.bookID} style={cartItemStyle}>
          <div style={cartItemHeaderStyle}>
            <p style={merchantIDStyle}>商家ID: {item.merchantID} | 商品ID: {item.bookID}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <input type="checkbox" checked={selectedItems.includes(item.bookID)} onChange={() => handleSelectItem(item.bookID)} />
            <img src={item.bookSurfacePic} alt={item.bookName} style={bookCoverStyle} />
            <div style={bookInfoStyle}>
              <p style={bookNameStyle}>{item.bookName}</p>
              <p style={bookAuthorStyle}>作者: {item.bookAuthor}</p>
              <p style={bookPriceStyle}>￥{item.bookPrice}</p>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={() => handleDecreaseQuantity(item.bookID)}>-</Button>
                <Button disabled>{item.bookNum}</Button>
                <Button onClick={() => handleIncreaseQuantity(item.bookID)}>+</Button>
              </ButtonGroup>
            </div>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteItem(item.bookID)}
              style={deleteButtonStyle}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
      <div>
        <input type="checkbox" checked={selectedItems.length === cartItems.length} onChange={handleSelectAll} />
        选择全部商品
      </div>
      <Button variant="contained" onClick={handlePlaceOrder} disabled={selectedItems.length === 0}>
        一键支付
      </Button>
    </div>
  );
}