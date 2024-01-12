package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.IMerchantDAO;
import com.SecondHandSystem.dao.impl.MerchantDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;
import com.SecondHandSystem.vo.Customer;
import com.SecondHandSystem.vo.Merchant;

import java.util.Date;
import java.util.List;

public class MerchantDAOProxy implements IMerchantDAO{
    private DatabaseConnection dbc=null;
    private IMerchantDAO dao=null;  //创建声明类型为IMerchantDAO对象dao
    public MerchantDAOProxy() throws Exception{
        this.dbc = new DatabaseConnection();  //创建DatabaseConnection对象dbc
        this.dao = new MerchantDAOImpl(this.dbc.getConnection());  //创建MerchantDAOImpl的实例dao，与数据库建立连接
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
            this.dbc.close();
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
            this.dbc.close();
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
            this.dbc.close();
        }
        return all;
    }

    @Override
    public List<Merchant> updateMerchant(String merchantId, String nickname, String password, String truthLevel, int numbOfBookOnsale, int length, String picUrl) throws Exception {
        return null;
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
            this.dbc.close();
        }
        return bookOnsale;
    }

    @Override
    public String[][] insertBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        String[][] bookOnsale = new String[300][2];
        try{
            bookOnsale = this.dao.insertBookOnsale(merchantId,bookId,number,time,newold);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            this.dbc.close();
        }
        return bookOnsale;
    }

    @Override
    public String[][] updateBookOnsale(String merchantId, String bookId, int number, Date time, String newold) throws Exception {
        String[][] bookOnsale = new String[300][2];
        try{
            bookOnsale = this.dao.updateBookOnsale(merchantId,bookId,number,time,newold);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            this.dbc.close();
        }
        return bookOnsale;
    }

    @Override
    public String[][] deleteBookOnsale(String merchantId, String bookId) throws Exception {
        String[][] bookOnsale = new String[300][2];
        try{
            bookOnsale = this.dao.deleteBookOnsale(merchantId,bookId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            this.dbc.close();
        }
        return bookOnsale;
    }
}
