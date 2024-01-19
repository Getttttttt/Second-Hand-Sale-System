package com.SecondHandSystem.test.test;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.factory.DAOFactory;

import java.util.Date;

public class TestCommunicationDAO {
    public static void main(String[] args) {
<<<<<<< HEAD
        ICommunicationDAO communicationDAOProxy;

        /*
        System.out.println("start test insert...");
        try {
            String[][] content = new String[300][5];
            communicationDAOProxy = DAOFactory.getICommunicationDAOInstance();
            content = communicationDAOProxy.addCommunication("21377223", "21377225",new Date(), "hello","customer");
            String rs = communicationDAOProxy.addCommunication("21377006", "21377225", new Date(), "Good morning.", "customer");
            content = communicationDAOProxy.searchCommunication("21377006","21377225");
            System.out.println(rs);
            for (String[] c : content) {
                if (c[1] != null) {
                    System.out.println("time:" + c[0]);
                    System.out.println("text:" + c[1]);
                    System.out.println("from:" + c[2]);
                    System.out.println("merchantID:" + c[3]);
                    System.out.println("customerID:" + c[4]);
                }
            }
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }

        try {
            String[][] content = new String[300][3];
            communicationDAOProxy = DAOFactory.getICommunicationDAOInstance();
            content = communicationDAOProxy.addCommunication("21377223", "21377225", new Date(), "how can i help you","merchant");
            String rs = communicationDAOProxy.addCommunication("21377006", "21377225", new Date(), "Good morning.", "customer");
            content = communicationDAOProxy.searchCommunication("21377006","21377225");
            System.out.println(rs);
            for (String[] c : content) {
                if (c[1] != null) {
                    System.out.println("time:" + c[0]);
                    System.out.println("text:" + c[1]);
                    System.out.println("from:" + c[2]);
                    System.out.println("merchantID:" + c[3]);
                    System.out.println("customerID:" + c[4]);
                }
            }
            System.out.println("insert success");
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("insert error");
        }
*/
        System.out.println("start test select all...");
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
=======
>>>>>>> af7468d52395a8aff8faf409a1fc01f8520315b8

    }}