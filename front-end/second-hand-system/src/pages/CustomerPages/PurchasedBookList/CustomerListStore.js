export const MainData = [
  'Od123456','Od456789'
];

export let DetailData;

let customerID = '18810392015';

export const fetchData = async () => {
  try{
    let myHeaders = new Headers({
      'Content-Type': 'application/json'
    });
  
    const response = await fetch(`http://localhost:8080/SecondHandSystemAPIs_war_exploded/customer/orderList?customerID=${customerID}`, {
      method: 'GET',
      headers: myHeaders
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //处理返回的数据
    const Data = await response.json();
    DetailData = Data.map(item => ({
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
      merchantNumber: item.merchantNumber.trim(),
      bookSurfacePic: item.bookSurfacePic.trim(),
      orderTime: item.orderTime,
      bookLabels: item.bookLabels.map(label => label.trim()),
      estimationScale: item.estimationScale,
      orderPrice: item.orderPrice,
      bookdegree: item.bookdegree.trim()
    }));
    console.log("back to js")
    console.log(DetailData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
export const getDetailData = async () => {
  const data = await fetchData();
  return data;
};



