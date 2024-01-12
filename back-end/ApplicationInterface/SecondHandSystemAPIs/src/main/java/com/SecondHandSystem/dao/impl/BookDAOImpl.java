package com.SecondHandSystem.dao.impl;

import com.SecondHandSystem.vo.Book;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class BookDAOImpl {
    private Connection conn;
    private Statement stat;
    private ResultSet rs;

    public BookDAOImpl(Connection connection) throws Exception {
        conn=connection;
        stat=conn.createStatement();
    }

    public Connection getConn(){
        return conn;
    }
    public Statement getStat(){
        return stat;
    }
    public ResultSet getRs(){
        return rs;
    }

    //1.添加商品
    public boolean insert(Book book) throws Exception{
        int i=0;//i为此次更新影响行数
        //执行sql
        String sql="insert into (pid,name,note,price,amount,pic) values(null,'"+
                product.getName()+"','"+
                product.getNote()+"',"+
                product.getPrice()+","+
                product.getAmount()+",'"+
                product.getPicture() +"')";
        i = stat.executeUpdate(sql);
        //获取结果返回结果
        if(i>0){
            return true;
        }
        return false;
    }
    //2.查询单个商品
    public Product select(int pid) throws Exception{
        String sql="select * from product where pid = "+pid;
        rs= stat.executeQuery(sql);
        while(rs.next()){
            Product product=new Product();
            product.setPid(rs.getInt("pid"));
            product.setName(rs.getString("name"));
            product.setNote(rs.getString("note"));
            product.setPrice(rs.getDouble("price"));
            product.setAmount(rs.getInt("amount"));
            product.setPicture(rs.getString("pic"));
            return product;//仅仅只有一个对象被查询
        }
        return null;//无对象查询到
    }
    //3.修改商品
    public boolean update(Product product) throws Exception{
        int i=0;
        //执行sql
        String sql="update product set "+
                "name = '" +product.getName()
                +"',note='" +product.getNote()
                +"',price=" +product.getPrice()
                +",amount=" +product.getAmount()
                +",pic='" +product.getPicture()+"' "
                +"where pid="+product.getPid();
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }
    //删除商品
    public boolean delete(int pid) throws Exception{
        int i=0;
        //执行sql
        String sql="delete from product where pid="+pid;
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }
    //5.查询全部商品
    public ArrayList<Product> selectAll() throws Exception{
        ArrayList<Product> list=new ArrayList<>();
        String sql="select * from product ";
        rs= stat.executeQuery(sql);
        while(rs.next()){
            Product product=new Product();
            product.setPid(rs.getInt("pid"));
            product.setName(rs.getString("name"));
            product.setNote(rs.getString("note"));
            product.setPrice(rs.getDouble("price"));
            product.setAmount(rs.getInt("amount"));
            product.setPicture(rs.getString("pic"));
            list.add(product);
        }
        return list;
    }
}
