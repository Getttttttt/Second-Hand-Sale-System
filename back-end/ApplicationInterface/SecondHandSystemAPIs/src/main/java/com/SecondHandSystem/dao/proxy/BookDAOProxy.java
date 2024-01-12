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

    public boolean insert(Book book) throws Exception{
        boolean flag=false;
        try{
            flag=dao.insert(book);
        }catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //2.查询单个商品
    public Book select(String bookID) throws Exception{
        try {
            return dao.select(bookID);//仅仅只有一个对象被查询
        } catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getRs(),dao.getStat(),dao.getConn());
        }
    }
    //3.修改商品
    public boolean update(Book book) throws Exception{
        boolean flag=false;
        try {
            flag=dao.update(book);
        } catch (Exception e) {
            throw(e);
        }
        finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //删除商品
    public boolean delete(String bookID) throws Exception{
        boolean flag=false;
        try {
            flag=dao.delete(bookID);
        } catch (Exception e) {
            throw(e);
        }
        finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return flag;
    }
    //5.查询指定商品
    public ArrayList<Book> selectAll(String[] bookIDs) throws Exception{
        ArrayList<Book> list=null;
        try {
            list=dao.selectAll(bookIDs);
        } catch (Exception e) {
            throw(e);
        }finally{
            DatabaseConnection.release(dao.getStat(),dao.getConn());
        }
        return list;
    }
}
