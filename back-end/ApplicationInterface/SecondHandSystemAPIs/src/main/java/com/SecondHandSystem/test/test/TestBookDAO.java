package com.SecondHandSystem.test.test;
import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;

import java.util.Date;

public class TestBookDAO {
    public static void main(String[] args) {
        IBookDAO bookDAOProxy;
        Book book=new Book();
        System.out.println("start test insert...");
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            book.setBookID("123456");
            book.setBookName("gaoentong");
            book.setBookPrice(12);
            book.setBookNum(1);
            book.setDiscount(0);
            book.setAuthor("hd");
            book.setBookISBN("2323");
            book.setDegree("new");
            book.setBookSurfacePic("hdwidhwidh");
            book.setBookPublisher("hwudh");
            book.setBookRealPics(new String[]{"dwjd","gdggd"});
            book.setBookLabels(new String[]{"english","meth"});
            book.setShelfTime(new Date());
            book.setPublicationTime(new Date());
            boolean insert=bookDAOProxy.insert(book);
            System.out.println("insert success");
        }
        catch (Exception ex){
            System.out.println("insert error");
            System.out.println(ex.toString());
            ex.printStackTrace();
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
            book.setBookPrice(1);
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
