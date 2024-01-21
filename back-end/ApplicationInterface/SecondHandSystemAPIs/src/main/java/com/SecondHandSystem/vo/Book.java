package com.SecondHandSystem.vo;

import java.util.Date;

public class Book {
    private String bookID;
    private String bookName;
    private double bookPrice;
    private double discount;
    private int bookNum;
    private String author;
    private String bookISBN;
    private String bookPublisher;
    private String bookSurfacePic;
    private String[] bookRealPics;
    private String[] bookLabels;
    private Date publicationTime;
    private String degree;//degree of new/old
    private Date shelfTime;


    public String getBookID() {
        return bookID;
    }

    public void setBookID(String bookID) {
        this.bookID = bookID;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public double getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(double bookPrice) {
        this.bookPrice = bookPrice;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getBookNum() {
        return bookNum;
    }

    public void setBookNum(int bookNum) {
        this.bookNum = bookNum;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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

    public String getBookSurfacePic() {
        return bookSurfacePic;
    }

    public void setBookSurfacePic(String bookSurfacePic) {
        this.bookSurfacePic = bookSurfacePic;
    }

    public String[] getBookRealPics() {
        return bookRealPics;
    }

    public void setBookRealPics(String[] bookRealPics) {
        this.bookRealPics = bookRealPics;
    }

    public String[] getBookLabels() {
        return bookLabels;
    }

    public void setBookLabels(String[] bookLabels) {
        this.bookLabels = bookLabels;
    }

    public Date getPublicationTime() {
        return publicationTime;
    }

    public void setPublicationTime(Date publicationTime) {
        this.publicationTime = publicationTime;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public Date getShelfTime() {
        return shelfTime;
    }

    public void setShelfTime(Date shelfTime) {
        this.shelfTime = shelfTime;
    }


}
