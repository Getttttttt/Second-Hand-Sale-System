package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.dao.impl.MerchantDAOImpl;
import com.SecondHandSystem.factory.DAOFactory;

public class TestOnsaleDAO {
    public static void main(String[] args) {
        IMerchantDAO merchantDAOProxy;
        System.out.println("start test insert...");
        try{
            String[][] bookOnsale = new String[300][2];
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            bookOnsale = merchantDAOProxy.insertBookOnsale("21377223", "123", 20, , "95新");
            for(String[] book:bookOnsale){
                if(book[0]!=null){
                    System.out.println("book:"+book[0]);
                    System.out.println("num:"+book[1]);
                }
            }
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }
    }
}
