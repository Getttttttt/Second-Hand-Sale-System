package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Customer;

import java.util.ArrayList;
import java.util.List;

public class TestBucketDAO {
    public static void main(String[] args) {
        ICustomerDAO customerDAOProxy;

        System.out.println("start test insert...");
        try{
            String[][] bucket = new String[300][2];
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            bucket = customerDAOProxy.insertBookBucket("21377225","123",2);
            for(String[] book:bucket){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                }
            }
            System.out.println("insert success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("insert error");
        }

        System.out.println("start test select...");
        try{
            String[][] bucket = new String[300][2];
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            bucket = customerDAOProxy.searchBookBucket("21377225");
            for(String[] book:bucket){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                }
            }
            System.out.println("insert success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("select error");
        }

        System.out.println("start test delete...");
        try{
            String[][] bucket = new String[300][2];
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            bucket = customerDAOProxy.deleteBookBucket("21377225","123");
            for(String[] book:bucket){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                }
            }
            System.out.println("insert success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("delete error");
        }

        System.out.println("start test update...");
        try{
            String[][] bucket = new String[300][2];
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            bucket = customerDAOProxy.updateBookBucket("21377225","123",5);
            for(String[] book:bucket){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                }
            }
            System.out.println("update success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("update error");
        }
    }
}
