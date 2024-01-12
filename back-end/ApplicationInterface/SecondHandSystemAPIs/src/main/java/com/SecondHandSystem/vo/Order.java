package com.SecondHandSystem.vo;

import java.util.Date;

public class Order {
    private String orderID;
    private String customerID;
    private String bookID;
    private Date tradingTime;
    private double tradingPrice;
    private int tradingNum;
    private String tradingStatus;
    private int estimationScale;
    private String evaluation;

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        orderID = orderID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getBookID() {
        return bookID;
    }

    public void setBookID(String bookID) {
        this.bookID = bookID;
    }

    public Date getTradingTime() {
        return tradingTime;
    }

    public void setTradingTime(Date tradingTime) {
        this.tradingTime = tradingTime;
    }

    public double getTradingPrice() {
        return tradingPrice;
    }

    public void setTradingPrice(double tradingPrice) {
        this.tradingPrice = tradingPrice;
    }

    public int getTradingNum() {
        return tradingNum;
    }

    public void setTradingNum(int tradingNum) {
        this.tradingNum = tradingNum;
    }

    public String getTradingStatus() {
        return tradingStatus;
    }

    public void setTradingStatus(String tradingStatus) {
        this.tradingStatus = tradingStatus;
    }

    public int getEstimationScale() {
        return estimationScale;
    }

    public void setEstimationScale(int estimationScale) {
        this.estimationScale = estimationScale;
    }

    public String getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(String evaluation) {
        this.evaluation = evaluation;
    }
}
