package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.impl.CommunicationDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;

import java.util.Date;

public class CommunicationDAOProxy implements ICommunicationDAO {
    private DatabaseConnection dbc=null;
    private ICommunicationDAO dao=null;  //创建声明类型为ICommunicationDAO对象dao
    public CommunicationDAOProxy() throws Exception{
        this.dbc = new DatabaseConnection();  //创建DatabaseConnection对象dbc
        this.dao = new CommunicationDAOImpl(this.dbc.getConnection());  //创建CommunicationDAOImpl的实例dao，与数据库建立连接
    }

    @Override
    public String[][] searchCommunication(String merchantId, String customerId) throws Exception {
        String[][] communication = new String[300][2];
        try{
            communication = this.dao.searchCommunication(merchantId,customerId);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            this.dbc.close();
        }
        return communication;
    }

    @Override
    public String[][] addCommunication(String merchantId, String customerId, Date communicationTime, String content, String tag) throws Exception {
        String[][] communication = new String[300][2];
        try{
            communication = this.dao.addCommunication(merchantId,customerId,communicationTime,content,tag);
        }
        catch (Exception e){
            throw e;
        }
        finally{
            this.dbc.close();
        }
        return communication;
    }
}
