package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Communication;
import com.SecondHandSystem.vo.Merchant;

import java.util.Date;
import java.util.List;

public interface ICommunication {
    //请求聊天记录
    public String[][] searchCommunication(String merchantId,String customerId)throws Exception;
    //新增聊天记录
    public String[][] addCommunication(String merchantId,String customerId,Date communicationTime,String content,String tag)throws Exception;
}
