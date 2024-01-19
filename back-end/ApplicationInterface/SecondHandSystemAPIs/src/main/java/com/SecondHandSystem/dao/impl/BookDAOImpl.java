package com.SecondHandSystem.dao.impl;
import com.SecondHandSystem.dao.IBookDAO;
import com.SecondHandSystem.vo.Book;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class BookDAOImpl implements IBookDAO {
    private Connection conn;
    private Statement stat;
    private ResultSet rs;

    public BookDAOImpl(Connection connection) throws Exception {
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

    //1.添加商品
    public boolean insert(Book book) throws Exception{
        int i=0;//i为此次更新影响行数
        //执行sql
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String publicationTime = formatter.format(book.getPublicationTime());
        String shelfTime = formatter.format(book.getShelfTime());
        String sql="insert into 图书(商品ID,商品名称,商品价格,商品折扣,库存数量,作者名称,ISBN,出版社,出版时间,商品封面,新旧程度,上架时间) values('"+
                book.getBookID()+"','"+ book.getBookName()+"',"+ book.getBookPrice()+","+ book.getDiscount()+","+ book.getBookNum() +",'"+book.getAuthor()+"','"+book.getBookISBN()+"','"+book.getBookPublisher()+"','"+publicationTime+"','"+book.getBookSurfacePic()+"','"+book.getDegree()+"','"+shelfTime+"');";
        for(String pic:book.getBookRealPics()){
            sql+="insert into 图书示例图片(商品ID,商品图片展示URL) values ('"+book.getBookID()+"','"+pic+"');";
        }
        for(String label:book.getBookLabels() ){
            sql+="insert into 图书分类(商品ID,分类类型) values ('"+book.getBookID()+"','"+label+"');";
        }
        i = stat.executeUpdate(sql);
        //获取结果返回结果
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public ArrayList<Book> searchSpecificBooks(String searchContent) throws Exception {
        String sqlLabel="select * from 图书 where 商品名称 like '%"+searchContent+"%';";
        rs= stat.executeQuery(sqlLabel);
        ArrayList<Book> books = new ArrayList<>();
        while(rs.next()){
            String bookID = rs.getString("商品ID");
            books.add(this.select(bookID));
        }
        return books;
    }

    @Override
    public Book select(String bookID) throws Exception {
        String sqlLabel="select * from 图书分类 where 商品ID = '"+bookID+"';";
        rs= stat.executeQuery(sqlLabel);
        ArrayList<String> labels=new ArrayList<>();
        while(rs.next()){
            labels.add(rs.getString("分类类型"));
        }
        String[] strLabels= labels.toArray(new String[labels.size()]);
        String sqlPictures="select * from 图书示例图片 where 商品ID = '"+bookID+"';";
        rs= stat.executeQuery(sqlPictures);
        ArrayList<String> pictures=new ArrayList<>();
        while(rs.next()){
            pictures.add(rs.getString("分类类型"));
        }
        String[] strPictures= pictures.toArray(new String[pictures.size()]);
        String sql="select * from 图书 where 商品ID = '"+bookID+"';";
        rs= stat.executeQuery(sql);
        Book book=new Book();
        while(rs.next()){
            book.setBookID(rs.getString("商品ID"));
            book.setBookName(rs.getString("商品名称"));
            book.setBookPrice(rs.getDouble("商品价格"));
            book.setDiscount(rs.getDouble("商品折扣"));
            book.setBookNum(rs.getInt("库存数量"));
            book.setAuthor(rs.getString("作者名称"));
            book.setBookISBN(rs.getString("ISBN"));
            book.setPublicationTime(rs.getDate("出版时间"));
            book.setBookSurfacePic(rs.getString("商品封面"));
            book.setDegree(rs.getString("新旧程度"));
            book.setShelfTime(rs.getDate("上架时间"));
            book.setBookLabels(strLabels);
            book.setBookRealPics(strPictures);
            return book;//仅仅只有一个对象被查询
        }
        return null;
    }

    @Override
    public boolean update(Book book) throws Exception {
        String sql="delete from 图书分类 where 商品ID = '"+book.getBookID()+"';";
        sql+="delete from 图书示例图片 where 商品ID = '"+book.getBookID()+"';";
        for(String pic:book.getBookRealPics()){
            sql+="insert into 图书示例图片(商品ID,商品图片展示URL) values ('"+book.getBookID()+"','"+pic+"');";
        }
        for(String label:book.getBookLabels() ){
            sql+="insert into 图书分类(商品ID,分类类型) values ('"+book.getBookID()+"','"+label+"');";
        }
        stat.executeUpdate(sql);
        int i=0;
        //执行sql
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String publicationTime = formatter.format(book.getPublicationTime());
        String shelfTime = formatter.format(book.getShelfTime());
        sql="update 图书 set "+
                "商品名称 = '" +book.getBookID()
                +"',商品价格=" +book.getBookPrice()
                +",商品折扣=" +book.getDiscount()
                +",库存数量=" +book.getBookNum()
                +",作者名称='" +book.getAuthor()
                +"',ISBN='" +book.getBookISBN()
                +"',出版社='" +book.getBookPublisher()
                +"',出版时间='" +publicationTime
                +"',商品封面='" +book.getBookSurfacePic()
                +"',新旧程度='" +book.getDegree()
                +"',上架时间='" +shelfTime+"' "
                +"where 商品ID="+book.getBookID();
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(String bookID) throws Exception {
        int i=0;
        //执行sql
        String sql="delete from 图书 where 商品ID = '"+bookID+"';";
        sql+="delete from 图书分类 where 商品ID = '"+bookID+"';";
        sql+="delete from 图书示例图片 where 商品ID = '"+bookID+"';";
        i = stat.executeUpdate(sql);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public ArrayList<Book> selectAll(String[] bookIDs) throws Exception {
        ArrayList<Book> list=new ArrayList<>();
        for(String bookID:bookIDs){
            list.add(select(bookID));
        }
        return list;
    }
}
