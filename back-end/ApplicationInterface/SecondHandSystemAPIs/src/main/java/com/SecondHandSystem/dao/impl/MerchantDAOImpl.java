package com.SecondHandSystem.dao.impl;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.vo.Book;
import com.SecondHandSystem.vo.Customer;
import com.SecondHandSystem.vo.Merchant;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MerchantDAOImpl implements IMerchantDAO {
    //实现数据库查询操作
    private Connection conn=null;  //创建与数据库连接的Connection对象
    private PreparedStatement prestmt=null;  //创建执行sql语句的PreparedStatement对象
    //有参构造方法
    public MerchantDAOImpl(Connection conn) {
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

    //实现IMerchantDAO的方法
    @Override
    public List<Merchant> searchMerchant(String merchantId,String password) throws Exception {
        List<Merchant> all = new ArrayList<>(); //创建Merchant对象列表用于保存从数据库中查询到的信息
        String sql = "SELECT * FROM 商家 WHERE 商家id='"+merchantId+"' and 登录密码='"+password+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();  //执行sql语句，将结果赋给ResultSet对象rs
        Merchant merchant = null;
        while(rs.next()){
            merchant = new Merchant();
            merchant.setMerchantId(rs.getString(1));
            merchant.setNickname(rs.getString(2));
            merchant.setPassword(rs.getString(3));
            merchant.setTrustLevel(rs.getString(4));
            merchant.setBooksOnsale(rs.getInt(5));
            merchant.setLength(rs.getInt(6));
            merchant.setPicUrl(rs.getString(7));
            all.add(merchant);
        }
        return all;
    }

    @Override
    public List<Merchant> searchByIdMerchant(String merchantId) throws Exception {
        List<Merchant> all = new ArrayList<>(); //创建Merchant对象列表用于保存从数据库中查询到的信息
        String sql = "SELECT * FROM 商家 WHERE 商家id='"+merchantId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();  //执行sql语句，将结果赋给ResultSet对象rs
        Merchant merchant = null;
        while(rs.next()){
            merchant = new Merchant();
            merchant.setMerchantId(rs.getString(1));
            merchant.setNickname(rs.getString(2));
            merchant.setPassword(rs.getString(3));
            merchant.setTrustLevel(rs.getString(4));
            merchant.setBooksOnsale(rs.getInt(5));
            merchant.setLength(rs.getInt(6));
            merchant.setPicUrl(rs.getString(7));
            all.add(merchant);
        }
        return all;
    }

    @Override
    public List<Merchant> insertMerchant(String merchantId, String nickname, String password, String picUrl) throws Exception {
        List<Merchant> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "INSERT INTO 商家(商家id,昵称,登录密码,头像) VALUES (?,?,?,?)";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,merchantId);
        prestmt.setString(2,nickname);
        prestmt.setString(3,password);
        prestmt.setString(4,picUrl);
        this.prestmt.execute();  //执行sql语句，将结果赋给ResultSet对象rs
        return searchMerchant(merchantId,password);
    }

    @Override
    public List<Merchant> deleteMerchant(String merchantId) throws Exception {
        List<Merchant> all = new ArrayList<>(); //创建Customer对象列表用于保存从数据库中查询到的信息
        String sql = "DELETE FROM 商家 WHERE 商家id='"+merchantId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        this.prestmt.execute();  //执行sql语句，将结果赋给ResultSet对象rs
        return null;
    }

    @Override
    public String updateMerchant(String merchantId,String nickname,String password,String truthLevel,int numbOfBookOnsale,int length,String picUrl) throws Exception {

        String sql = "UPDATE 商家 SET 昵称=?,登录密码=?,信用等级=?,在售书籍数量=?,开店时长=?,头像=? WHERE 商家id='"+merchantId+"'";  //定义要实现的SQL语句
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,nickname);
        prestmt.setString(2,password);
        prestmt.setString(3,truthLevel);
        prestmt.setInt(4,numbOfBookOnsale);
        prestmt.setInt(5,length);
        prestmt.setString(6,picUrl);
        boolean rs = this.prestmt.execute();  //执行sql语句，将结果赋给ResultSet对象rs
        if(!rs){
            return "Update Successful";
        }
        else {
            return "Update Fail";
        }
    }

    @Override
    public String[][] searchBookOnsale(String merchantId) throws Exception {
        String sql = "SELECT * FROM 售卖书籍 WHERE 商家id='"+merchantId+"'";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        ResultSet rs = this.prestmt.executeQuery();
        String[][] bookOnsale = new String[300][5];
        int i = 0;
        while(rs.next()){
            String[] books = new String[5];
            Book book = new Book();
            books[0] = rs.getString(1);
            books[1] = rs.getString(2);
            books[2] = String.valueOf(rs.getInt(3));
            books[3] = String.valueOf(rs.getDate(4));
            books[4] = rs.getString(5);
            bookOnsale[i] = books;
            i++;
        }
        return bookOnsale;
    }

    @Override
    public String insertBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String shelfTime = formatter.format(time);
        String sql = "INSERT INTO 售卖书籍(商品id,商家id,库存数量,上架时间,新旧程度) VALUES(?,?,?,?,?)";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        prestmt.setString(1,bookId);
        prestmt.setString(2,merchantId);
        prestmt.setInt(3,number);
        prestmt.setString(4, shelfTime);
        prestmt.setString(5,newold);
        boolean rs = this.prestmt.execute();
        if(!rs){
            return "Success!";
        }
        else{
            return "Fail!";
        }
    }

    @Override
    public String updateBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String shelfTime = formatter.format(time);
        String sql = "UPDATE 售卖书籍 SET 库存数量="+number+", 上架时间='"+shelfTime+"', 新旧程度='"+newold+"' WHERE 商品id='"+bookId+"' and 商家id='"+merchantId+"'";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        this.prestmt.execute();
        boolean rs = this.prestmt.execute();
        if(!rs){
            return "Success!";
        }
        else{
            return "Fail!";
        }
    }

    @Override
    public String deleteBookOnsale(String merchantId, String bookId) throws Exception {
        String sql = "DELETE FROM 售卖书籍 WHERE 商家id='"+merchantId+"' and 商品id='"+bookId+"'";
        this.prestmt = this.conn.prepareStatement(sql);  //prestmt用于执行sql语句
        boolean rs = this.prestmt.execute();
        if(!rs){
            return "Success!";
        }
        else{
            return "Fail!";
        }
    }


}
