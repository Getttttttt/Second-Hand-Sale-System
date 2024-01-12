package com.SecondHandSystem.test.test;
import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Book;
import com.SecondHandSystem.vo.Customer;

import java.util.List;

public class TestCustomerDAO {
    public static void main(String[] args) {
        System.out.println("start test insert...");
        ICustomerDAO customerDAOProxy;
        Book book=new Book();
        try{
            customerDAOProxy=DAOFactory.getICustomerDAOInstance();
            book.setBookID("123456");
            List<Customer> insert=customerDAOProxy.insertCustomer("21377225","Rita","2003216","18510248567","buaa-13-645" ,"xxx");
            System.out.println("insert success");
        }
        catch (Exception ex){
            System.out.println("insert error");
        }
        System.out.println("start test select...");
    }
}
