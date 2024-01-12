package com.SecondHandSystem.dao;

import java.util.Date;

public interface ICommunicationDAO {
    //请求聊天记录
    public String[][] searchCommunication(String merchantId,String customerId)throws Exception;
    //新增聊天记录
    public String[][] addCommunication(String merchantId,String customerId,Date communicationTime,String content,String tag)throws Exception;
}
