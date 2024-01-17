export const MainData = [
    'Od123456','Od456789'
]
let DetailData; // 定义一个变量来存储订单数据
//let customerID = getCurrentCustomerID();
customerID='123456'

fetch('/customer/orderList?customerID=${customerID}')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // 在这里处理后端返回的响应数据
        console.log(data);
        DetailData = data; 
    })
    .catch(function(error) {
        console.log(error);
    });

export { DetailData }; // 将导出声明放置在模块的顶层