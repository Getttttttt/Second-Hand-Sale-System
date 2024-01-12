package com.SecondHandSystem.dao;

import com.SecondHandSystem.vo.Communication;
import com.SecondHandSystem.vo.Merchant;

import java.util.List;

public interface ICommunication {
    //请求聊天记录
    public List<Communication> searchCommunication()throws Exception;
    //新增聊天记录
    public List<Communication> addCommunication()throws Exception;
}
