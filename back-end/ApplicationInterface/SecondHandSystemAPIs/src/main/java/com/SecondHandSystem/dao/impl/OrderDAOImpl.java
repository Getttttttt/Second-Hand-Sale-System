package com.SecondHandSystem.dao.impl;
import com.SecondHandSystem.dao.IOrderDAO;
import com.SecondHandSystem.vo.Order;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class OrderDAOImpl implements IOrderDAO {
    private Connection conn;
    private Statement stat;
    private ResultSet rs;

    public OrderDAOImpl(Connection connection) throws Exception {
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
        int i=0;//i为此次更新影响行数
        //执行sql
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String tradingTime = formatter.format(order.getTradingTime());
        String sql="insert into 订单(订单ID,用户ID,商品ID,交易时间,交易价格,交易数量,交易状态,评价等级,评价言论) values('"+
                order.getOrderID()+"','"+order.getCustomerID()+"','"+order.getBookID()+"','"+tradingTime+"',"+order.getTradingPrice()+","+order.getTradingNum()+",'"+order.getTradingStatus()+"',"+order.getEstimationScale()+",'"+order.getEvaluation()+"');";
        i = stat.executeUpdate(sql);
        //获取结果返回结果
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public Order selectByOrder(String orderID) throws Exception {
        Order order=new Order();
        String sql="select * from 订单 where 订单ID = "+orderID;
        rs= stat.executeQuery(sql);
        while(rs.next()){
            order.setOrderID(rs.getString("订单ID"));
            order.setBookID(rs.getString("商品ID"));
            order.setCustomerID(rs.getString("用户ID"));
            order.setTradingTime(rs.getDate("交易时间"));
            order.setTradingPrice(rs.getDouble("交易价格"));
            order.setTradingNum(rs.getInt("交易数量"));
            order.setTradingStatus(rs.getString("交易状态"));
            order.setEstimationScale(rs.getInt("评价等级"));
            order.setEvaluation(rs.getString("评价言论"));
            return order;//仅仅只有一个对象被查询
        }
        return null;
    }

    @Override
    public ArrayList<Order> selectByCustomer(String customerID) throws Exception {
        ArrayList<Order> list=new ArrayList<>();
        String sql="select * from 订单 where 用户ID = "+customerID;
        rs= stat.executeQuery(sql);
        while(rs.next()) {
            list.add(selectByOrder(rs.getString("订单ID")));
        }
        return list;
    }

    @Override
    public ArrayList<Order> selectByMerchant(String merchantID) throws Exception {
        ArrayList<Order> list=new ArrayList<>();
        String sql="select * from 订单 where 商品ID in (select 商品id from 售卖书籍 where 商家id = '"+merchantID+"');";
        rs= stat.executeQuery(sql);
        while(rs.next()) {
            list.add(selectByOrder(rs.getString("订单ID")));
        }
        return list;
    }

    @Override
    public boolean update(Order order) throws Exception {
        int i=0;
        //执行sql
        String sql="update 订单 set "+
                "订单ID = '" +order.getOrderID() +"',用户ID='" +order.getCustomerID()+"',商品ID='" +order.getBookID()+"',交易时间='" +order.getBookID()
                +"',交易价格=" +order.getTradingPrice() +",交易数量=" +order.getTradingNum() +",交易状态='"+order.getTradingStatus() +"',评价等级=" +order.getEstimationScale()+",评价言论='"+order.getEvaluation()+"' "
                +"where 订单ID="+order.getOrderID();
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(String orderID) throws Exception {
        int i=0;
        //执行sql
        String sql="delete from 订单 where 订单ID='"+orderID+"';";
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public ArrayList<Order> selectAll(String[] orderIDs) throws Exception {
        ArrayList<Order> list=new ArrayList<>();
        for(String orderID:orderIDs){
            list.add(selectByOrder(orderID));
        }
        return list;
    }
}
