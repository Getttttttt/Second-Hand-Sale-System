package com.SecondHandSystem.vo;

public class Merchant {
    //数据域
    private String merchantId;
    private String nickname;
    private String password;
    private String trustLevel;
    private String[] booksOnsale;
    private int length;
    private String picUrl;
    //getter和setter
    public String getMerchantId(){return merchantId;}
    public void setMerchantId(String merchantId){this.merchantId = merchantId;}
    public String getNickname(){return nickname;}
    public void setNickname(String nickname){this.nickname = nickname;}
    public String getPassword(){return password;}
    public void setPassword(String password){this.password = password;}
    public String getTrustLevel(){return trustLevel;}
    public void setTrustLevel(String trustLevel){this.trustLevel = trustLevel;}
    public String[] getNumOfBooksOnsale(){return booksOnsale;}
    public void setBooksOnsale(String[] booksOnsale){this.booksOnsale = booksOnsale;}
    public int getLength(){return length;}
    public void setLength(int length){this.length = length;}
    public String getPicUrl(){return picUrl;}
    public void setPicUrl(String picUrl){this.picUrl = picUrl;}
}
