package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.factory.DAOFactory;

import java.util.Date;

public class TestCommunicationDAO {
    public static void main(String[] args) {
        ICommunicationDAO communicationDAOProxy;

        System.out.println("start test select...");
        try {
            String[][] content = new String[300][5];
            communicationDAOProxy = DAOFactory.getICommunicationDAOInstance();
            content = communicationDAOProxy.searchCommunication("21377223", "21377225");
            for(String[] c:content){
                if(c[1]!=null){
                    System.out.println("time:"+c[0]);
                    System.out.println("text:"+c[1]);
                    System.out.println("from:"+c[2]);
                    System.out.println("merchantID:"+c[3]);
                    System.out.println("customerID:"+c[4]);
                }
            }
            System.out.println("select success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("select error");
        }


/*
        System.out.println("start test select byID...");
        try {
            String[][] content;
            communicationDAOProxy = DAOFactory.getICommunicationDAOInstance();
            content = communicationDAOProxy.searchByCustomerId("21377225", "customer");
            for(String[] c:content){
                if(c[1]!=null){
                    System.out.println("time:"+c[0]);
                    System.out.println("text:"+c[1]);
                    System.out.println("from:"+c[2]);
                    System.out.println("merchantID:"+c[3]);
                    System.out.println("customerID:"+c[4]);
                }
            }
            System.out.println("select success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("select error");
        }
*/
        System.out.println("start test select lastMessage...");
        try {
            String[] lastMessage;
            communicationDAOProxy = DAOFactory.getICommunicationDAOInstance();
            lastMessage = communicationDAOProxy.searchLastMessage("21377223", "21377225");
            System.out.println(lastMessage[0]+lastMessage[1]);
            System.out.println("select lastMessage success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("select lastMessage error");
        }

    }
}

