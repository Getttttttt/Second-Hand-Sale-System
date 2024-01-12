package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.ICustomerDAO;
import com.SecondHandSystem.dao.impl.CommunicationDAOImpl;
import com.SecondHandSystem.dao.impl.CustomerDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Customer;

import java.util.List;

public class CustomerDAOProxy implements ICustomerDAO {
    private ICustomerDAO dao=null;  //创建声明类型为ICommunicationDAO对象dao
    public CustomerDAOProxy() throws Exception{
        this.dao = new CustomerDAOImpl(DatabaseConnection.getConnection());  //创建ProductDAOImpl的实例dao，与数据库建立连接
    }

    //实现ICustomerDAO接口的方法
    @Override
    public List<Customer> searchCustomer(String customerId, String password) throws Exception {
        List<Customer> all = null;
        try{
            all = this.dao.searchCustomer(customerId,password);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Customer> insertCustomer(String customerId, String nickname, String password, int phoneNumber, String address, String picUrl) throws Exception {
        List<Customer> all = null;
        try{
            all = this.dao.insertCustomer(customerId,nickname,password,phoneNumber,address,picUrl);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Customer> deleteCustomer(String customerId) throws Exception {
        List<Customer> all = null;
        try{
            all = this.dao.deleteCustomer(customerId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Customer> updateCustomer(String customerId, String nickname, String password, int phoneNumber, String address, String picUrl) throws Exception {
        List<Customer> all = null;
        try{
            all = this.dao.updateCustomer(customerId,nickname,password,phoneNumber,address,picUrl);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public String[][] searchBookBucket(String customerId) throws Exception {
        String[][] bookBuckets = new String[300][2];
        try{
            bookBuckets = this.dao.searchBookBucket(customerId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return bookBuckets;
    }

    @Override
    public String[][] insertBookBucket(String customerId, String bookId, int number) throws Exception {
        String[][] bookBuckets = new String[300][2];
        try{
            bookBuckets = this.dao.insertBookBucket(customerId,bookId,number);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return bookBuckets;
    }

    @Override
    public String[][] updateBookBucket(String customerId, String bookId, int number) throws Exception {
        String[][] bookBuckets = new String[300][2];
        try{
            bookBuckets = this.dao.updateBookBucket(customerId,bookId,number);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return bookBuckets;
    }

    @Override
    public String[][] deleteBookBucket(String customerId, String bookId) throws Exception {
        String[][] bookBuckets = new String[300][2];
        try{
            bookBuckets = this.dao.deleteBookBucket(customerId,bookId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((CustomerDAOImpl)dao).getStat(),((CustomerDAOImpl)dao).getConn());
        }
        return bookBuckets;
    }
}
