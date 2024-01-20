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

        System.out.println("start test insert...");
        try{
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            customerDAOProxy.insertCustomer("18810392015","Rita","2003216","18510248567","buaa-13-645" ,"xxx");
            System.out.println("insert success");
        }
        catch (Exception ex){
            ex.printStackTrace();
            System.out.println("insert error");
        }


    }
}
