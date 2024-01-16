package com.SecondHandSystem.dao.impl;

import com.SecondHandSystem.dao.ICommunicationDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CommunicationDAOImpl implements ICommunicationDAO {
    //实现数据库查询操作
    private Connection conn = null;  //创建与数据库连接的Connection对象
    private PreparedStatement prestmt = null;  //创建执行sql语句的PreparedStatement对象

    //有参构造方法
    public CommunicationDAOImpl(Connection conn) {
        super();
        this.conn = conn;
    }

    //getter
    public Connection getConn() {
        return conn;
    }
    public PreparedStatement getStat() {
        return prestmt;
    }

    //实现ICustomerDAO的方法
    @Override
    public String[][] searchCommunication(String merchantId, String customerId) throws Exception {
        String sql = "SELECT * FROM 沟通记录 WHERE 用户id=? and 商家id=? ORDER BY 沟通时间";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1, customerId);
        prestmt.setString(2, merchantId);
        ResultSet rs = this.prestmt.executeQuery();  //执行sql语句，将结果赋给ResultSet对象rs
        String[][] communication = new String[300][5];
        int i = 0;
        while (rs.next()) {
            String[] c = new String[5];
            c[0] = rs.getString(3);  //时间
            c[1] = rs.getString(4);  //content
            c[2] = rs.getString(5);  //标识商家还是用户
            c[3] = rs.getString(1);  //商家id
            c[4] = rs.getString(2);  //用户id
            communication[i] = c;
            i++;
        }
        return communication;
    }

    @Override
    public String[][] addCommunication(String merchantId, String customerId, Date communicationTime, String content, String tag) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String comTime = formatter.format(communicationTime);
        System.out.println(comTime);
        String sql = "INSERT INTO 沟通记录(商家id,用户id,沟通时间,会话内容,标签) VALUES(?,?,?,?,?)";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1, merchantId);
        prestmt.setString(2, customerId);
        prestmt.setString(3, comTime);
        prestmt.setString(4, content);
        prestmt.setString(5, tag);
        this.prestmt.execute();
        return searchCommunication(merchantId,customerId);
    }

    @Override
    public String searchLastMessage(String merchantId,String customerId)throws Exception{
        String sql = "SELECT 会话内容 FROM 沟通记录 WHERE 用户id='"+customerId+"' and 商家id ='"+merchantId+"' and 沟通时间 in (SELECT Max(沟通时间) FROM 沟通记录 WHERE 用户id='"+customerId+"' and 商家id ='"+merchantId+"')";
        System.out.println(sql);
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        System.out.println(prestmt);
        ResultSet rs = this.prestmt.executeQuery();  //执行sql语句，将结果赋给ResultSet对象rs
        System.out.println(rs.getDate(1));
        return String.valueOf(rs.getDate(1));
    }

}
