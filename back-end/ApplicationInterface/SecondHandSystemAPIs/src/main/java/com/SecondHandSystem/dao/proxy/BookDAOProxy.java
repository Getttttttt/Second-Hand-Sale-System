package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.impl.BookDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Book;

import java.util.ArrayList;

public class BookDAOProxy {
    private BookDAOImpl dao;

    public BookDAOProxy() throws Exception{
        this.dao=new BookDAOImpl(DatabaseConnection.getConnection());
    }

    public boolean insert(Product product) throws Exception{
        boolean flag=false;
        try{
            flag=dao.insert(product);
        }catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //2.查询单个商品
    public Product select(int pid) throws Exception{
        try {
            return dao.select(pid);//仅仅只有一个对象被查询
        } catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getRs(),dao.getStat(),dao.getConn());
        }
    }
    //3.修改商品
    public boolean update(Product product) throws Exception{
        boolean flag=false;
        try {
            flag=dao.update(product);
        } catch (Exception e) {
            throw(e);
        }
        finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //删除商品
    public boolean delete(int pid) throws Exception{
        boolean flag=false;
        try {
            flag=dao.delete(pid);
        } catch (Exception e) {
            throw(e);
        }
        finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //5.查询全部商品
    public ArrayList<Product> selectAll() throws Exception{
        ArrayList<Product> list=null;
        try {
            list=dao.selectAll();
        } catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return list;
    }
}
