package com.SecondHandSystem.vo;

import java.util.Date;

public class Communication {
    //数据域
    private String customerId;
    private String merchantId;
    private Date communicationTime;
    private String content;
    //getter和setter
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public Date getCommunicationTime() {
        return communicationTime;
    }

    public void setCommunicationTime(Date communicationTime) {
        this.communicationTime = communicationTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



}
