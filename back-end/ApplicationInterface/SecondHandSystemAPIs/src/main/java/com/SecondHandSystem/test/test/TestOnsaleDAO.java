package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.dao.impl.MerchantDAOImpl;
import com.SecondHandSystem.factory.DAOFactory;

import java.util.Date;

public class TestOnsaleDAO {
    public static void main(String[] args) {
        IMerchantDAO merchantDAOProxy;

        System.out.println("start test insert...");
        try{
            String rs = null;
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            rs = merchantDAOProxy.insertBookOnsale("21377223", "123", 20, new Date(), "95新");
            String[][] bookOnsale = new String[300][5];
            for(String[] book:bookOnsale){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                    System.out.println("book:"+book[2]);
                    System.out.println("num:"+book[3]);
                    System.out.println("book:"+book[4]);
                }
            }
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }

        System.out.println("start test select...");
        try{
            String[][] bookOnsale = new String[300][5];
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            bookOnsale = merchantDAOProxy.searchBookOnsale("21377223");
            bookOnsale = merchantDAOProxy.searchBookOnsale("21377223");
            for(String[] book:bookOnsale){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                    System.out.println("book:"+book[2]);
                    System.out.println("num:"+book[3]);
                    System.out.println("book:"+book[4]);
                }
            }
            System.out.println("select success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("select error");
        }

        System.out.println("start test update...");
        try{
            String[][] bookOnsale = new String[300][5];
            String update = null;
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            update = merchantDAOProxy.updateBookOnsale("21377223","123",100,new Date(),"全新");
            bookOnsale = merchantDAOProxy.searchBookOnsale("21377223");
            for(String[] book:bookOnsale){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                    System.out.println("book:"+book[2]);
                    System.out.println("num:"+book[3]);
                    System.out.println("book:"+book[4]);
                }
            }
            System.out.println("update success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error");
        }



        System.out.println("start test delete...");
        try{
            String bookOnsale = null;
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            bookOnsale = merchantDAOProxy.deleteBookOnsale("21377223","123");
            System.out.println(bookOnsale);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("Fail!");
        }
    }
}
