package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;

public class TestMerchantDAO {
    public static void main(String[] args) {
        System.out.println("start test insert...");
        IMerchantDAO merchantDAOProxy;
        try {
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            merchantDAOProxy.insertMerchant("21377223", "GET", "get21377223", "xxx");
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }
    }
}
