package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Order;

public interface IEvaluationDAO {
    //插入订单评论
    public boolean insert(Order order) throws Exception; //添加评论
    //返回订单评论
    public Order selectByOrder(String orderID) throws Exception; //返回评论
    //删除订单评论
    public boolean delete(String orderID) throws Exception;
}
