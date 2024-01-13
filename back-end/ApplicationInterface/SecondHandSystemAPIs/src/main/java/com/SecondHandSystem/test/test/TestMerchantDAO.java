package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;

public class TestMerchantDAO {
    public static void main(String[] args) {
        IMerchantDAO merchantDAOProxy;
        /*System.out.println("start test insert...");
        try {
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            merchantDAOProxy.insertMerchant("21377223", "GET", "get21377223", "xxx");
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }*/
        /*System.out.println("start test delete...");
        try {
            IMerchantDAO merchantDAOProxy;
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            merchantDAOProxy.deleteMerchant("21377223");
            System.out.println("delete success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("delete error");
        }*/
        System.out.println("start test update...");
        try {
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            merchantDAOProxy.updateMerchant("21377223", "GET", "21377223get", "A",20,3,"xxx");
            System.out.println("update success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error");
        }
    }
}
