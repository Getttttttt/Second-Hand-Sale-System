package com.SecondHandSystem.test.test;
import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;

public class TestBookDAO {
    public static void main(String[] args) {
        System.out.println("start test insert...");
        IBookDAO bookDAOProxy;
        Book book=new Book();
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            book.setBookID("123456");
            boolean insert=bookDAOProxy.insert(book);
            System.out.println("insert success");
        }
        catch (Exception ex){
            System.out.println("insert error");
        }
        System.out.println("start test select...");
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            Book select=bookDAOProxy.select("123456");
            System.out.println(select);
        }
        catch (Exception ex){
            System.out.println("select error");
        }
        System.out.println("start test update...");
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            book.setBookName("java");
            boolean update=bookDAOProxy.update(book);
            System.out.println("update success");
        }
        catch (Exception ex){
            System.out.println("update error");
        }
        System.out.println("start test delete...");
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            boolean delete=bookDAOProxy.delete("123456");
            System.out.println("delete success");
        }
        catch (Exception ex){
            System.out.println("delete error");
        }
    }
}
