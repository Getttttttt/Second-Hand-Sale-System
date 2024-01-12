package com.SecondHandSystem.dao;
import com.SecondHandSystem.vo.Order;

import java.util.ArrayList;

public interface IOrderDAO {
    public boolean insert(Order order) throws Exception; //添加订单
    public Order selectByOrder(String orderID) throws Exception; // 根据订单号查询订单
    public ArrayList<Order> selectByCustomer(String customerID) throws Exception;//根据用户号查询订单
    public ArrayList<Order> selectByMerchant(String merchantID) throws Exception;//根据商家号查询订单
    public boolean update(Order order) throws Exception;//修改订单
    public boolean delete(String orderID) throws Exception;//删除订单
    public ArrayList<Order> selectAll(String[] orderIDs) throws Exception;//查询指定订单列表
}
