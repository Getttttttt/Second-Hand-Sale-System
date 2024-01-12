package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Customer;

import java.util.List;

public interface ICustomerDAO {
    //查询用户
    public List<Customer> searchCustomer()throws Exception;
    //插入用户
    public List<Customer> insertCustomer(String customerId,String nickname,String password,int phoneNumber,String address,String picUrl)throws Exception;
    //删除用户
    public List<Customer> deleteCustomer(String customerId)throws Exception;
    //更新用户信息
    public List<Customer> updateCustomer(String customerId,String nickname,String password,int phoneNumber,String address,String picUrl)throws Exception;
    //添加购物车
    public String[][] insertBookBucket(String bookId,int number);
    //更新购物车
    public String[][] updateBookBucket(String bookId,int number);
    //删除购物车
    public String[][] deleteBookBucket(String bookId);
}
