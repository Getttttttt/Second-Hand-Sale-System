package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Merchant;

import java.util.Date;
import java.util.List;

public interface IMerchantDAO {
    //查询商家
    public List<Merchant> searchMerchant(String merchantId,String password)throws Exception;
    //根据id查询商家
    public List<Merchant> searchByIdMerchant(String merchantId) throws Exception;
    //插入商家
    public List<Merchant> insertMerchant(String merchantId,String nickname,String password,String picUrl)throws Exception;
    //删除商家
    public List<Merchant> deleteMerchant(String merchantId)throws Exception;
    //更新商家信息
    public List<Merchant> updateMerchant(String merchantId,String nickname,String password,String truthLevel,int numbOfBookOnsale,int length,String picUrl)throws Exception;
    //查询在售书籍
    public String[][] searchBookOnsale(String merchantId)throws Exception;
    //添加在售书籍
    public String[][] insertBookOnsale(String merchantId,String bookId,int number,Date time,String newold)throws Exception;
    //更新在售书籍
    public String[][] updateBookOnsale(String merchantId,String bookId,int number,Date time,String newold)throws Exception;
    //删除在售书籍
    public String[][] deleteBookOnsale(String merchantId,String bookId)throws Exception;
    //查找书籍的商家
    public String searchMerchantID(String bookID) throws Exception;
}
