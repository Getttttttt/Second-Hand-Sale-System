package com.SecondHandSystem.vo;

import java.util.Date;

public class Order {
    private String orderID;
    private String customerID;
    private String bookID;
    private String merchantID;
    private String bookName;
    private Date tradingTime;
    private double tradingPrice;
    private int tradingNum;
    private String tradingStatus;
    private String bookSurfacePic;
    private String bookAuthor;
    private String bookISBN;
    private String bookPublisher;
    private String bookdegree;
    private Date bookPublishTime;
    private String[]  bookLabels;
    private String[] bookImages;
    private int estimationScale=-1;
    private String evaluation;

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getMerchantID() {
        return merchantID;
    }

    public void setMerchantID(String merchantID) {
        this.merchantID = merchantID;
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
    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookSurfacePic() {
        return bookSurfacePic;
    }

    public void setBookSurfacePic(String bookSurfacePic) {
        this.bookSurfacePic = bookSurfacePic;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public String getBookISBN() {
        return bookISBN;
    }

    public void setBookISBN(String bookISBN) {
        this.bookISBN = bookISBN;
    }

    public String getBookPublisher() {
        return bookPublisher;
    }

    public void setBookPublisher(String bookPublisher) {
        this.bookPublisher = bookPublisher;
    }

    public String getBookdegree() {
        return bookdegree;
    }

    public void setBookdegree(String bookdegree) {
        this.bookdegree = bookdegree;
    }

    public Date getBookPublishTime() {
        return bookPublishTime;
    }

    public void setBookPublishTime(Date bookPublishTime) {
        this.bookPublishTime = bookPublishTime;
    }

    public String[] getBookLabels() {
        return bookLabels;
    }

    public void setBookLabels(String[] bookLabels) {
        this.bookLabels = bookLabels;
    }

    public String[] getBookImages() {
        return bookImages;
    }

    public void setBookImages(String[] bookImages) {
        this.bookImages = bookImages;
    }
}
