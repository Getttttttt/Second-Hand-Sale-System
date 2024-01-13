package com.SecondHandSystem.dao.impl;

import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.vo.Customer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CustomerDAOImpl implements ICustomerDAO {
    //实现数据库查询操作
    private Connection conn=null;  //创建与数据库连接的Connection对象
    private PreparedStatement prestmt=null;  //创建执行sql语句的PreparedStatement对象
    //有参构造方法
    public CustomerDAOImpl(Connection conn){
        super();
        this.conn = conn;
    }
    //getter
    public Connection getConn() {
        return conn;
    }
    public PreparedStatement getStat() {
        return prestmt;
    }

    //实现ICustomerDAO的方法
    @Override
    public List<Customer> searchCustomer(String customerId,String password)throws Exception{
        List<Customer> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "SELECT * FROM 用户 WHERE 用户id='"+customerId+"' and 登录密码='"+password+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();  //执行sql语句，将结果赋给ResultSet对象rs
        Customer customer = null;
        while(rs.next()){
            customer = new Customer();
            customer.setCustomerId(rs.getString(1));
            customer.setNickname(rs.getString(2));
            customer.setPassword(rs.getString(3));
            customer.setPhoneNumber(rs.getString(4));
            customer.setAddress(rs.getString(5));
            customer.setPicUrl(rs.getString(6));
            customer.setBookBucket(searchBookBucket(rs.getString(1)));
            all.add(customer);
        }
        return all;
    }

    @Override
    public List<Customer> insertCustomer(String customerId, String nickname, String password, String phoneNumber, String address, String picUrl) throws Exception {
        List<Customer> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "INSERT INTO 用户(用户id,昵称,登录密码,手机号,收货地址,头像) VALUES (?,?,?,?,?,?)";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,customerId);
        prestmt.setString(2,nickname);
        prestmt.setString(3,password);
        prestmt.setString(4,phoneNumber);
        prestmt.setString(5,address);
        prestmt.setString(6,picUrl);
        this.prestmt.executeUpdate();  //执行sql语句，将结果赋给ResultSet对象rs
        return all;
    }

    @Override
    public List<Customer> deleteCustomer(String customerId) throws Exception {
        List<Customer> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "DELETE FROM 用户 WHERE 用户id="+customerId;  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        this.prestmt.executeUpdate();  //执行sql语句，将结果赋给ResultSet对象rs
        return null;
    }

    @Override
    public List<Customer> updateCustomer(String customerId, String nickname, String password, String phoneNumber, String address, String picUrl) throws Exception {
        List<Customer> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "UPDATE 用户 SET 昵称=?,登录密码=?,手机号=?,收货地址=?,头像=? WHERE 用户id='"+customerId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,nickname);
        prestmt.setString(2,password);
        prestmt.setString(3,phoneNumber);
        prestmt.setString(4,address);
        prestmt.setString(5,picUrl);
        this.prestmt.execute();  //执行sql语句，将结果赋给ResultSet对象rs
        return null;
    }

    @Override
    public String[][] searchBookBucket(String customerId) throws Exception{
        String sql = "SELECT * FROM 购物车 WHERE 用户id='"+customerId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();
        String[][] buckets = new String[300][2];
        int i = 0;
        while(rs.next()){
            String[] bucket = new String[2];
            bucket[0] = rs.getString(2);
            bucket[1] = rs.getString(3);
            buckets[i] = bucket;
            i++;
        }
        return buckets;
    }

    @Override
    public String[][] insertBookBucket(String customerId,String bookId, int number)throws Exception{
        String sql = "INSERT INTO 购物车 VALUES(?,?,?) WHERE 用户id='"+customerId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,customerId);
        prestmt.setString(2,bookId);
        prestmt.setInt(3,number);
        ResultSet rs = this.prestmt.executeQuery();
        return searchBookBucket(customerId);
    }

    @Override
    public String[][] updateBookBucket(String customerId,String bookId, int number)throws Exception{
        String sql = "UPDATE 购物车 SET 加购数量="+number+" WHERE 用户id='"+customerId+"' and 商品id='"+bookId+"'";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();
        return searchBookBucket(customerId);
    }

    @Override
    public String[][] deleteBookBucket(String customerId,String bookId)throws Exception{
        String sql = "DELETE FROM 购物车 WHERE 用户id='"+customerId+"' and 商品id='"+bookId+"'";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();
        return searchBookBucket(customerId);
    }
}
