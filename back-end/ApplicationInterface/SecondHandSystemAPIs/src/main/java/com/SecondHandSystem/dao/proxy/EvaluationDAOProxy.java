package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.IEvaluationDAO;
import com.SecondHandSystem.dao.impl.EvaluationDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Order;

public class EvaluationDAOProxy implements IEvaluationDAO {
    private IEvaluationDAO dao;

    public EvaluationDAOProxy() throws Exception{
        this.dao=new EvaluationDAOImpl(DatabaseConnection.getConnection());
    }

    @Override
    public boolean insert(Order order) throws Exception {
        boolean flag=false;
        try {
            flag=dao.insert(order);
        } catch (Exception e) {
            e.printStackTrace();
            throw(e);
        }
        finally{
            DatabaseConnection.release(((EvaluationDAOImpl)dao).getStat(),((EvaluationDAOImpl)dao).getConn());
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
            DatabaseConnection.release(((EvaluationDAOImpl)dao).getRs(),((EvaluationDAOImpl)dao).getStat(),((EvaluationDAOImpl)dao).getConn());
        }
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
            DatabaseConnection.release(((EvaluationDAOImpl)dao).getStat(),((EvaluationDAOImpl)dao).getConn());
        }
        return flag;
    }
}
