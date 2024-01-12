package com.SecondHandSystem.dbc;

import java.sql.*;

public class DatabaseConnection {
<<<<<<< HEAD
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
=======
    //数据域：数据库连接相关的信息
    private static final String DBDRIVER="com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String DBURL="jdbc:sqlserver://localhost:1433;DatabaseName=secondhandsalesystem;encrypt=true;trustServerCertificate=true";
    private static final String DBUSER="sa";
    private static final String DBPASSWORD="2003216-Rita";
    private Connection conn=null;  //创建与数据库连接的Connection对象
    //构造方法
    public DatabaseConnection() throws ClassNotFoundException, SQLException, Exception{
        try{
            Class.forName(DBDRIVER);  //加载JDBC驱动
            this.conn=DriverManager.getConnection(DBURL,DBUSER,DBPASSWORD);  //赋值与数据库连接的Connection对象
        }
        catch (ClassNotFoundException e){
            e.printStackTrace();
            System.out.println("JDBC驱动加载失败");
        }
        catch (SQLException e){
            e.printStackTrace();
            System.out.println("数据库连接失败");
        }
        catch (Exception e){
            throw e;
        }
    }
    //数据域conn的getter方法
    public Connection getConnection(){
        return this.conn;
    }
    //定义数据库关闭方法
    public void close() throws Exception{
        if(this.conn!=null){
            try{
                this.conn.close();  //关闭数据库
            }
            catch (Exception e){
                throw e;
>>>>>>> 029b112e8e4cf4a6a4fc6bb5aa0c5ae7a51dd8fb
            }
        }
    }
}
<<<<<<< HEAD

=======
>>>>>>> 029b112e8e4cf4a6a4fc6bb5aa0c5ae7a51dd8fb
