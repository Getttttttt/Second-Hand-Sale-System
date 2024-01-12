package com.SecondHandSystem.dao.proxy;

import com.SecondHandSystem.dao.ICommunicationDAO;
import com.SecondHandSystem.dao.impl.CommunicationDAOImpl;
import com.SecondHandSystem.dbc.DatabaseConnection;

import java.util.Date;

public class CommunicationDAOProxy implements ICommunicationDAO {
    private ICommunicationDAO dao=null;  //创建声明类型为ICommunicationDAO对象dao
    public CommunicationDAOProxy() throws Exception{
        this.dao = new CommunicationDAOImpl(DatabaseConnection.getConnection());  //创建CommunicationDAOImpl的实例dao，与数据库建立连接
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
            DatabaseConnection.release(((CommunicationDAOImpl)dao).getStat(),((CommunicationDAOImpl)dao).getConn());
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
            DatabaseConnection.release(((CommunicationDAOImpl)dao).getStat(),((CommunicationDAOImpl)dao).getConn());
        }
        return communication;
    }
}
