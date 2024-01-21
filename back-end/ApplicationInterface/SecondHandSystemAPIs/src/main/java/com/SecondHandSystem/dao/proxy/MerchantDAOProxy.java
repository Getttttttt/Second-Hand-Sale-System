package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.dao.impl.CustomerDAOImpl;
import com.SecondHandSystem.dao.impl.MerchantDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Customer;
import com.SecondHandSystem.vo.Merchant;

import java.util.Date;
import java.util.List;

public class MerchantDAOProxy implements IMerchantDAO{
    private IMerchantDAO dao=null;  //创建声明类型为IMerchantDAO对象dao
    public MerchantDAOProxy() throws Exception{
        this.dao = new MerchantDAOImpl(DatabaseConnection.getConnection());  //创建MerchantDAOImpl的实例dao，与数据库建立连接
    }

    @Override
    public List<Merchant> searchMerchant(String merchantId, String password) throws Exception {
        List<Merchant> all = null;
        try{
            all = this.dao.searchMerchant(merchantId,password);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Merchant> searchByIdMerchant(String merchantId) throws Exception {
        List<Merchant> all = null;
        try{
            all = this.dao.searchByIdMerchant(merchantId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Merchant> insertMerchant(String merchantId, String nickname, String password, String picUrl) throws Exception {
        List<Merchant> all = null;
        try{
            all = this.dao.insertMerchant(merchantId,nickname,password,picUrl);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public List<Merchant> deleteMerchant(String merchantId) throws Exception {
        List<Merchant> all = null;
        try{
            all = this.dao.deleteMerchant(merchantId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return all;
    }

    @Override
    public String updateMerchant(String merchantId, String nickname, String password, String truthLevel, int numbOfBookOnsale, int length, String picUrl) throws Exception {
        String rs = null;
        try{
            rs = this.dao.updateMerchant(merchantId,nickname,password,truthLevel,numbOfBookOnsale,length,picUrl);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return rs;
    }

    @Override
    public String[][] searchBookOnsale(String merchantId) throws Exception {
        String[][] bookOnsale = new String[300][2];
        try{
            bookOnsale = this.dao.searchBookOnsale(merchantId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return bookOnsale;
    }

    @Override
    public String insertBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        String bookOnsale = null;
        try{
            bookOnsale = this.dao.insertBookOnsale(merchantId,bookId,number,time,newold);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return bookOnsale;
    }

    @Override
    public String updateBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        String bookOnsale = null;
        try{
            bookOnsale = this.dao.updateBookOnsale(merchantId,bookId,number,time,newold);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return bookOnsale;
    }

    @Override
    public String deleteBookOnsale(String merchantId, String bookId) throws Exception {
        String bookOnsale = null;
        try{
            bookOnsale = this.dao.deleteBookOnsale(merchantId,bookId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return bookOnsale;
    }

    @Override
    public String searchMerchantID(String bookID) throws Exception {
        String merchantID=null;
        try{
            merchantID = this.dao.searchMerchantID(bookID);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            DatabaseConnection.release(((MerchantDAOImpl)dao).getStat(),((MerchantDAOImpl)dao).getConn());
        }
        return merchantID;
    }
}
