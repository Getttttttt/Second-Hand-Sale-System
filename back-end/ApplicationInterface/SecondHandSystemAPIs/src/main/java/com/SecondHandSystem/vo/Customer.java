package com.SecondHandSystem.vo;

public class Customer {
    //数据域
    private String customerId;
    private String nickname;
    private String password;
    private String phoneNumber;
    private String address;
    private String picUrl;
    private String[][] bookBucket;
    //定义getter和setter
    public String getCustomerId(){return customerId;}
    public void setCustomerId(String customerId){this.customerId = customerId;}
    public String getNickname(){return nickname;}
    public void setNickname(String nickname){this.nickname = nickname;}
    public String getPassword(){return password;}
    public void setPassword(String password){this.password = password;}
    public String getPhoneNumber(){return phoneNumber;}
    public void setPhoneNumber(String phoneNumber){this.phoneNumber = phoneNumber;}
    public String getAddress(){return address;}
    public void setAddress(String address){this.address = address;}
    public String getPicUrl(){return picUrl;}
    public void setPicUrl(String picUrl){this.picUrl = picUrl;}
    public String[][] getBookBucket(){return bookBucket;}
    public void setBookBucket(String[][] bookBucket){this.bookBucket = bookBucket;}
}
