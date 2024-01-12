package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Customer;
import com.SecondHandSystem.vo.Merchant;

import java.util.List;

public interface IMerchantDAO {
    //查询商家
    public List<Merchant> searchMerchant()throws Exception;
    //插入商家
    public List<Merchant> insertMerchant(String merchantId,String nickname,String password,String picUrl)throws Exception;
    //删除商家
    public List<Merchant> deleteMerchant(String merchantId)throws Exception;
    //更新商家信息
    public List<Merchant> updateMerchant(String merchantId,String nickname,String password,int phoneNumber,String address,String picUrl)throws Exception;
    //添加在售书籍
    public String[][] insertBookOnsale(String bookId,int number);
    //更新在售书籍
    public String[][] updateBookOnsale(String bookId,int number);
    //删除在售书籍
    public String[][] deleteBookOnsale(String bookId);
}
