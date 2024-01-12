package com.SecondHandSystem.dbc;

import java.sql.*;

public class DatabaseConnection {
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
            }
        }
    }
}

