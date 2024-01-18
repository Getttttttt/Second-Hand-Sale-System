package com.SecondHandSystem.dao;

import java.util.Date;

public interface ICommunicationDAO {
    //请求聊天记录
    public String[][] searchCommunication(String merchantId,String customerId)throws Exception;
    //按用户id或商家id查找
    public String[][] searchByCustomerId(String Id, String tag) throws Exception;
    //查找最后一条聊天记录
    public String[] searchLastMessage(String merchantId,String customerId)throws Exception;
    //新增聊天记录
    public String addCommunication(String merchantId,String customerId,Date communicationTime,String content,String tag)throws Exception;
}
