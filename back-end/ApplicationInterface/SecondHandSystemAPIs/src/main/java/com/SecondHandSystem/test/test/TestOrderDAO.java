package com.SecondHandSystem.test.test;
import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.factory.DAOFactory;
import com.SecondHandSystem.vo.Order;
import java.util.ArrayList;
import java.util.Date;

public class TestOrderDAO {
    public static void main(String[] args) {
        IOrderDAO orderDAOProxy;
        Order order=new Order();
        /*
        System.out.println("start test insert...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            order.setOrderID("Od123456");
            order.setBookID("Bo123456");
            order.setCustomerID("123456");
            order.setMerchantID("123456");
            order.setTradingPrice(50);
            order.setTradingNum(1);
            order.setTradingStatus("正在进行");
            order.setTradingTime(new Date());
            order.setEvaluation(null);
            boolean insert=orderDAOProxy.insert(order);
            System.out.println("insert success");
        }
        catch (Exception ex){
            System.out.println("insert error");
        }
        System.out.println("start test insert...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            order.setOrderID("Od456789");
            order.setBookID("Bo456789");
            order.setCustomerID("123456");
            order.setMerchantID("123456");
            order.setTradingPrice(30);
            order.setTradingNum(1);
            order.setTradingStatus("已完成");
            order.setTradingTime(new Date());
            order.setEstimationScale(4);
            order.setEvaluation("物流棒，发货快，包装好，品相佳，宝贝良，服务优，信誉高！");
            boolean insert=orderDAOProxy.insert(order);
            System.out.println("insert success");
        }
        catch (Exception ex){
            System.out.println("insert error");
        }

         */
        System.out.println("start test select1...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            Order select=orderDAOProxy.selectByOrder("123456");
            System.out.println(select);
        }
        catch (Exception ex){
            System.out.println("select1 error");
        }
        System.out.println("start test select2...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            ArrayList<Order> orders = orderDAOProxy.selectByCustomer("123456");
            System.out.println(orders);
        }
        catch (Exception ex){
            System.out.println("select2 error");
        }
        System.out.println("start test select3...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            ArrayList<Order> orders = orderDAOProxy.selectByMerchant("123456");
            System.out.println(orders);
        }
        catch (Exception ex){
            System.out.println("select3 error");
        }
        System.out.println("start test update...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            order.setTradingNum(2);
            boolean update=orderDAOProxy.update(order);
            System.out.println("update success");
        }
        catch (Exception ex){
            System.out.println("update error");
        }
        System.out.println("start test delete...");
        try{
            orderDAOProxy= DAOFactory.getIOrderDAOInstance();
            boolean delete=orderDAOProxy.delete("123456fef");
            System.out.println("delete success");
        }
        catch (Exception ex){
            System.out.println("delete error");
        }
    }
}
