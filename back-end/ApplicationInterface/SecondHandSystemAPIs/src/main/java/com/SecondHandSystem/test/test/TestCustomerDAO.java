package com.SecondHandSystem.test.test;
import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;
import com.SecondHandSystem.vo.Customer;

import java.util.ArrayList;
import java.util.List;

public class TestCustomerDAO {
    public static void main(String[] args) {
        ICustomerDAO customerDAOProxy;
        /*System.out.println("start test insert...");
        ICustomerDAO customerDAOProxy;
        try{
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            customerDAOProxy.insertCustomer("21377225","Rita","2003216","18510248567","buaa-13-645" ,"xxx");
            System.out.println("insert success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("insert error");
        }*/
        System.out.println("start test select...");
        try{
            List<Customer> customer = new ArrayList<>();
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            customer = customerDAOProxy.searchCustomer("21377225","rita123456");
            for(Customer c: customer) {
                System.out.println(c.getCustomerId());
                System.out.println(c.getNickname());
                System.out.println(c.getPassword());
                System.out.println(c.getAddress());
                System.out.println(c.getPicUrl());
            }
            System.out.println("select success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("select error");
        }
        /*System.out.println("start test delete...");
        ICustomerDAO customerDAOProxy;
        try{
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            customerDAOProxy.deleteCustomer("21377225");
            System.out.println("delete success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("delete error");
        }*/
        System.out.println("start test update...");
        try{
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            List<Customer> customer = new ArrayList<>();
            customer = customerDAOProxy.updateCustomer("21377225","Guo","rita123456","18510248567","buaa-13-645" ,"xxx");
            for(Customer c: customer) {
                System.out.println(c.getCustomerId());
                System.out.println(c.getNickname());
                System.out.println(c.getPassword());
                System.out.println(c.getAddress());
                System.out.println(c.getPicUrl());
            }
            System.out.println("select success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("update error");
        }
    }
}
