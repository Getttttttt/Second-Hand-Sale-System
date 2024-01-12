package com.SecondHandSystem.factory;

import com.SecondHandSystem.dao.*;
import com.SecondHandSystem.dao.proxy.*;

public class DAOFactory {
    public static ICustomerDAO getICustomerDAOInstance()throws Exception{
        return new CustomerDAOProxy();
    }
    public static IMerchantDAO getIMerchantDAOInstance()throws Exception{
        return new MerchantDAOProxy();
    }
    public static ICommunicationDAO getICommunicationInstance()throws Exception{
        return new CommunicationDAOProxy();
    }
    public static IBookDAO getIBookDAOInstance()throws Exception{
        return new BookDAOProxy();
    }
    public static IOrderDAO getIOrderDAOInstance()throws Exception{
        return new OrderDAOProxy();
    }
}
