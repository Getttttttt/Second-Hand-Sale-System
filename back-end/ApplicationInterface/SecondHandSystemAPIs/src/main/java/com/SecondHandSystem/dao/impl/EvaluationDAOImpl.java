package com.SecondHandSystem.dao.impl;

import com.SecondHandSystem.dao.IEvaluationDAO;
import com.SecondHandSystem.vo.Order;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class EvaluationDAOImpl implements IEvaluationDAO {
    private Connection conn;
    private Statement stat;
    private ResultSet rs;

    public EvaluationDAOImpl(Connection connection) throws Exception {
        conn=connection;
        stat=conn.createStatement();
    }
    public Connection getConn(){
        return conn;
    }
    public Statement getStat(){
        return stat;
    }
    public ResultSet getRs(){
        return rs;
    }

    @Override
    public boolean insert(Order order) throws Exception {
        String sql = "UPDATE 订单 SET 评价等级 = " + order.getEstimationScale()
                + " WHERE 订单ID = '" + order.getOrderID() + "';";
        sql += "UPDATE 订单 SET 评价言论 = '" + order.getEvaluation()
                + "' WHERE 订单ID = '" + order.getOrderID() + "';";
        System.out.println(sql);
        int i = stat.executeUpdate(sql);
        //获取结果返回结果
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public Order selectByOrder(String orderID) throws Exception {
        String sql = "Select * From 订单 Where 订单ID = '"+orderID+"';";
        rs= stat.executeQuery(sql);
        Order order = new Order();
        while(rs.next()) {
            order.setOrderID(rs.getString("订单ID"));
            order.setBookID(rs.getString("商品ID"));
            order.setCustomerID(rs.getString("用户ID"));
            order.setTradingTime(rs.getDate("交易时间"));
            order.setTradingPrice(rs.getDouble("交易价格"));
            order.setTradingNum(rs.getInt("交易数量"));
            order.setTradingStatus(rs.getString("交易状态"));
            order.setEstimationScale(rs.getInt("评价等级"));
            order.setEvaluation(rs.getString("评价言论"));
            order.setMerchantID(rs.getString("商家ID"));
            return order;
        }
        return null;
    }

    @Override
    public boolean delete(String orderID) throws Exception {
        String sql="Update 订单 Set 评价等级 = "+"-1"
                +"Where 订单ID = '"+orderID+"';";
        sql+="Update 订单 Set 评价言论 = "+ null
                +" Where 订单ID = '"+orderID+"';";
        int i = stat.executeUpdate(sql);
        //获取结果返回结果
        if(i>0){
            return true;
        }
        return false;
    }
}
