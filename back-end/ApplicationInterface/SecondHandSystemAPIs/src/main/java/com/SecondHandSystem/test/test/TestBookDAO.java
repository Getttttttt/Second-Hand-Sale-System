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
            book.setBookID("Bo123456");
            book.setBookName("茶业战争：中国与印度的一段资本主义史");
            book.setBookPrice(50);
            book.setBookNum(15);
            book.setDiscount(0);
            book.setAuthor("刘仁威");
            book.setBookISBN("9787547322062");
            book.setDegree("九成");
            book.setBookSurfacePic("../../../images/image_example1.jpg");
            book.setBookPublisher("东方出版中心");
            book.setBookRealPics(new String[]{"../../../images/image_example1.jpg\",\"../../../images/image_example1.jpg"});
            book.setBookLabels(new String[]{"历史","政治"});
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
        System.out.println("start test insert...");
        try{
            bookDAOProxy=DAOFactory.getIBookDAOInstance();
            book.setBookID("Bo456789");
            book.setBookName("法律的悖论:走出独断思维，接受多元包容");
            book.setBookPrice(30);
            book.setBookNum(10);
            book.setDiscount(0);
            book.setAuthor("罗翔");
            book.setBookISBN("9787222221833");
            book.setDegree("全新");
            book.setBookSurfacePic("../../../images/image_example1.jpg");
            book.setBookPublisher("云南人民出版社");
            book.setBookRealPics(new String[]{"../../../images/image_example1.jpg"});
            book.setBookLabels(new String[]{"法律","道德"});
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
        /*
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

         */
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
