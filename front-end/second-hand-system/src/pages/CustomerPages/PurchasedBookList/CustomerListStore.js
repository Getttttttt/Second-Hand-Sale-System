import { Button } from "@mui/material";

export const MainData = [
    'Od123456','Od456789'
]
let DetailData;

let customerID = '123456';

const onHandleSubmmit = async () => {
  try{
    let myHeaders = new Headers({
      'Content-Type': 'application/json'
    });
  
    const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/orderList?customerID=${customerID}`, {
      method: 'GET',
      headers: myHeaders,
    }).then(response => response.json())
    .then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


export function CustomerListStore() {
  return(
  <Button onClick={onHandleSubmmit}><p>test</p></Button>
  )}

export { DetailData };
