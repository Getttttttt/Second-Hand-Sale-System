package com.SecondHandSystem.controller;

import com.SecondHandSystem.SecondHandSystemApplication;
import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.utils.ThreadLocalUtil;
import com.SecondHandSystem.vo.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.Map;

//Rest模式
@RestController
@RequestMapping("/customerOrders")
public class CustomerOrderController {
    private IOrderDAO orderDAOProxy;
    {
        try {
            orderDAOProxy = DAOFactory.getIOrderDAOInstance();
        } catch (Exception e) {
            System.out.println("error");
            e.printStackTrace();
        }
    }

    @PostMapping
    public ArrayList<Order> getOrdersByCustomer(){
        Map<String,Object> map= ThreadLocalUtil.get();
        String customerID = (String)map.get("customerId");
        ArrayList<Order> orders = new ArrayList<>();
        try {
            orders = orderDAOProxy.selectByCustomer(customerID);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return orders;
    }

    @GetMapping("/detail")
    public Order getOrderDetail(String orderID){
        Order order=null;
        try {
            order = orderDAOProxy.selectByOrder(orderID);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return order;
    }
}
