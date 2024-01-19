package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.dao.impl.OrderDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Order;

import java.util.ArrayList;

public class OrderDAOProxy implements IOrderDAO {
    private IOrderDAO dao;

    public OrderDAOProxy() throws Exception{
        this.dao=new OrderDAOImpl(DatabaseConnection.getConnection());
    }

    public boolean insert(Order order) throws Exception{
        boolean flag=false;
        try{
            flag=dao.insert(order);
        }catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
        return flag;
    }

    @Override
    public Order selectByOrder(String orderID) throws Exception {
        try {
            return dao.selectByOrder(orderID);//仅仅只有一个对象被查询
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getRs(),((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
    }

    @Override
    public ArrayList<Order> selectByCustomer(String customerID) throws Exception {
        try {
            return dao.selectByCustomer(customerID);//仅仅只有一个对象被查询
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getRs(),((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
    }

    @Override
    public ArrayList<Order> selectByMerchant(String merchantID) throws Exception {
        try {
            return dao.selectByMerchant(merchantID);//仅仅只有一个对象被查询
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getRs(),((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
    }

    @Override
    public boolean update(Order order) throws Exception {
        boolean flag=false;
        try {
            flag=dao.update(order);
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }
        finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
        return flag;
    }

    @Override
    public boolean delete(String orderID) throws Exception {
        boolean flag=false;
        try {
            flag=dao.delete(orderID);
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }
        finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
        return flag;
    }

    @Override
    public ArrayList<Order> selectAll(String[] orderIDs) throws Exception {
        ArrayList<Order> list=null;
        try {
            list=dao.selectAll(orderIDs);
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }finally{
            DatabaseConnection.release(((OrderDAOImpl)dao).getStat(),((OrderDAOImpl)dao).getConn());
        }
        return list;
    }

    public static interface IEvaluationDAO {
    }
}
