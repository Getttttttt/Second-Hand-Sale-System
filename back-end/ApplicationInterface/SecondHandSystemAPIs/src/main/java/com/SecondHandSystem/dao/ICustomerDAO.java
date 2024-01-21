package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Customer;

import java.util.List;

public interface ICustomerDAO {
    //查询用户--登录
    public List<Customer> searchCustomer(String customerId,String password)throws Exception;
    //按id查询用户
    public List<Customer> searchByIdCustomer(String customerId)throws Exception;
    //插入用户
    public List<Customer> insertCustomer(String customerId,String nickname,String password,String phoneNumber,String address,String picUrl)throws Exception;
    //删除用户
    public List<Customer> deleteCustomer(String customerId)throws Exception;
    //更新用户信息
    public String updateCustomer(String customerId,String nickname,String password,String phoneNumber,String address,String picUrl)throws Exception;
    //查询购物车
    public String[][] searchBookBucket(String customerId)throws Exception;
    //添加购物车
    public boolean insertBookBucket(String customerId,String bookId, int number)throws Exception;
    //更新购物车
    public boolean updateBookBucket(String customerId,String bookId, int number)throws Exception;
    //删除购物车
    public boolean deleteBookBucket(String customerId,String bookId)throws Exception;
}
