package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Merchant;

import java.util.ArrayList;
import java.util.List;

public class TestMerchantDAO {
    public static void main(String[] args) {
        IMerchantDAO merchantDAOProxy;
/*
        System.out.println("start test insert...");
        try {
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            merchantDAOProxy.insertMerchant("21377223", "GET", "get21377223", "xxx");
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }*/

/*        System.out.println("start test delete...");
        try {
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
            List<Merchant> merchant = new ArrayList<>();
            merchant = merchantDAOProxy.updateMerchant("21377223", "GETTTT", "get21377223", "A",20,3,"xxx");
            for(Merchant m:merchant) {
                System.out.println(m.getMerchantId());
                System.out.println(m.getNickname());
                System.out.println(m.getPassword());
                System.out.println(m.getTrustLevel());
                System.out.println(m.getNumOfBooksOnsale());
                System.out.println(m.getLength());
                System.out.println(m.getPicUrl());
            }
            System.out.println("update success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("update error");
        }
        /*
        System.out.println("start test select...");
        try {
            merchantDAOProxy = DAOFactory.getIMerchantDAOInstance();
            List<Merchant> merchant = merchantDAOProxy.searchMerchant("21377223", "get21377223");
            for(Merchant m:merchant){
                System.out.println(m.getMerchantId());
                System.out.println(m.getNickname());
                System.out.println(m.getPassword());
                System.out.println(m.getTrustLevel());
                System.out.println(m.getNumOfBooksOnsale());
                System.out.println(m.getLength());
                System.out.println(m.getPicUrl());
            }
            System.out.println("select success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("select error");
        }*/
    }
}
