package com.SecondHandSystem.dbc;

import java.sql.*;

public class DatabaseConnection {
    //获取连接
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        //1.注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //2.获取连接
        String url="jdbc:mysql://localhost:3306/jdbc?serverTimezone=GMT%2B8";
        String user="root";
        String pass="123456";
        Connection connection = DriverManager.getConnection(url, user, pass);
        //3.返回连接
        return connection;
    }
    //关闭资源
    //有查询时资源的关闭
    public static void release(ResultSet rs, Statement stat, Connection conn){
        if(rs!=null){
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(stat!=null){
            try {
                stat.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(conn!=null){
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    //无查询时资源的关闭
    public static void release(Statement stat,Connection conn){
        if(stat!=null){
            try {
                stat.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(conn!=null){
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}

